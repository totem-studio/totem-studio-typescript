/**
 * Contract: the live runner covers every operation of its explicit profile and every tenant check
 * against an edge-like fixture (Content-Type, query and Totem-Team hygiene),
 * fails closed on undeclared fields, skipped checks, repeated feed pages and
 * configuration errors, and records only closed diagnostics. Its
 * invalid-credentials check presents a well-formed key with the real lookup id
 * and another secret, so an edge that skips the secret check fails it. No key,
 * including that one, and no record value ever reaches its output or receipt.
 * Read/CRM profiles never execute task or dynamically authorized operation routes;
 * widening the metadata classifier makes the literal coverage oracles red.
 * The explicit tasks profile observes durable receipts without retrying effects;
 * wrong replay IDs, ambiguous/stuck states and private fields are HTTP faults.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checksumBase62, formatSecretKey, parseSecretKey, wrongSecretKey } from '../scripts/key-format.mjs';
import { KEY, serve } from './helpers.mjs';

const document = JSON.parse(await readFile(new URL('../openapi.json', import.meta.url), 'utf8'));
const REQUEST_ID = 'req_12345678-1234-4234-8234-123456789abc';
const RELEASE = 'ce4b4e122';
const example = (path, method = 'get') => structuredClone(document.paths[path][method].responses['200'].content['application/json'].example);
const TEAM = example('/teams').data[0].id;
const FOREIGN = { foreignLeadId: 'lead_FOREIGN', foreignTeamId: 'team_FOREIGN' };
/** A well-formed fictitious key; its checksum `2q7ucx` is pinned by the API's own key-format test. */
const LIVE_KEY = 'tsk_live_0123456789ABCDEFGHIJKL_abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG2q7ucx';
const LIVE = { lookupId: '0123456789ABCDEFGHIJKL', secret: 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG' };
const bearer = authorization => /^Bearer (\S+)$/.exec(authorization ?? '')?.[1];

async function runSmoke(context, handler, { fixtures, env = {}, key = LIVE_KEY, keyMode = 0o600, receipt = true } = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'totem-sdk-live-test-'));
  context.after(() => rm(directory, { recursive: true, force: true }));
  const keyFile = join(directory, 'smoke.key');
  const receiptFile = join(directory, 'receipt.json');
  const fixturesFile = join(directory, 'fixtures.json');
  await writeFile(keyFile, key, { mode: keyMode });
  if (fixtures !== undefined) await writeFile(fixturesFile, typeof fixtures === 'string' ? fixtures : JSON.stringify(fixtures));
  const presented = new Set();
  const requests = [];
  const baseUrl = await serve(context, request => {
    requests.push({ method: request.method, url: request.url });
    const token = bearer(request.headers.authorization);
    if (token) presented.add(token);
    return handler(request);
  });
  const child = spawn(process.execPath, ['scripts/live-smoke.mjs'], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, TOTEM_API_KEY: '', TOTEM_API_KEY_FILE: keyFile, TOTEM_TEAM_ID: '', TOTEM_SMOKE_ALLOW_PARTIAL: '', TOTEM_SMOKE_PROFILE: '', TOTEM_LIVE_FIXTURES_FILE: fixtures === undefined ? '' : fixturesFile, TOTEM_API_BASE_URL: baseUrl, TOTEM_SMOKE_RECEIPT: receipt ? receiptFile : '', ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  const exitCode = await new Promise((resolve, reject) => { child.on('error', reject); child.on('close', resolve); });
  const receiptText = await readFile(receiptFile, 'utf8');
  for (const token of [key, ...presented]) {
    assert.equal(output.includes(token), false);
    assert.equal(receiptText.includes(token), false);
  }
  return { exitCode, output, receipt: JSON.parse(receiptText), receiptText, presented, requests };
}
const problem = (status, code) => ({ status, headers: { 'Totem-Request-Id': REQUEST_ID }, body: { type: `https://totemstudio.ai/developers/errors#${code}`, title: 'Request refused', status, code, request_id: REQUEST_ID, doc_url: `https://totemstudio.ai/developers/errors#${code}` } });
/**
 * Mirrors the edge's request hygiene closely enough that a dropped header or
 * a stray query key fails: one application/json Content-Type on POST, none
 * on GET, only declared query keys once each, Totem-Team on team routes. Its
 * credential stages run in the API's order: format and checksum, lookup id,
 * secret. `checkSecret: false` is an edge that skips the secret check.
 */
function edge({ teams = [TEAM], checkSecret = true, override = () => undefined } = {}) {
  return request => {
    const headers = { 'Totem-Request-Id': REQUEST_ID };
    const url = new URL(request.url, 'http://localhost');
    const credential = parseSecretKey(bearer(request.headers.authorization));
    const authorized = credential?.lookupId === LIVE.lookupId && (!checkSecret || credential.secret === LIVE.secret);
    if (url.pathname !== '/v1/health' && !authorized) return problem(401, 'invalid_credentials');
    for (const [path, methods] of Object.entries(document.paths)) {
      const match = new RegExp(`^/v1${path.replace(/\{[^}]+\}/g, '([^/]+)')}$`).exec(url.pathname);
      const operation = match && methods[request.method.toLowerCase()];
      if (!operation) continue;
      const declared = (operation.parameters ?? []).filter(param => param.in === 'query').map(param => param.name);
      const keys = [...url.searchParams.keys()];
      if (keys.some(key => !declared.includes(key)) || new Set(keys).size !== keys.length) return problem(400, 'invalid_request');
      if (operation.requestBody ? request.headers['content-type'] !== 'application/json' : request.headers['content-type'] !== undefined || request.body) return problem(400, 'invalid_request');
      if (url.searchParams.get('limit') === '0') return problem(400, 'invalid_request');
      if (operation['x-totem-tenant-binding'] === 'team_header') {
        const team = request.headers['totem-team'];
        if (team === undefined && teams.length > 1) return problem(400, 'team_required');
        if (team !== undefined && !teams.includes(team)) return override({ operation, url, request }) ?? problem(404, 'team_not_accessible');
      }
      if (match[1]?.endsWith('FOREIGN')) return problem(404, 'resource_missing');
      if (operation.operationId === 'leads.search' && request.body === '{}') return problem(400, 'invalid_request');
      const overridden = override({ operation, url, request });
      if (overridden !== undefined) return overridden;
      const status = Number(Object.keys(operation.responses).find(value => /^2/.test(value)));
      const body = operation.operationId === 'teams.list' ? { ...example('/teams'), data: teams.map(id => ({ ...example('/teams').data[0], id })) }
        : operation.operationId === 'sync.changes' && url.searchParams.has('cursor') ? { object: 'list', data: [], has_more: false, next_cursor: url.searchParams.get('cursor') }
          : operation.responses[String(status)].content?.['application/json'].example;
      return { status, headers: { ...headers, ...(operation.operationId === 'health' ? { 'Totem-Release': RELEASE } : {}) }, body };
    }
    return problem(404, 'resource_missing');
  };
}

/** Stateful HTTP boundary: real runner/client/validators, closed mutation state and exact version guards. */
function crmEdge({ acceptStale = false, leakReceipt = false } = {}) {
  let lead = structuredClone(document.components.schemas.Lead.examples[0]);
  let note = null;
  const leadEtag = () => `"${lead.id}:${lead.version}"`;
  const noteEtag = () => `"${note.id}:${note.version}"`;
  const response = (body, etag, status = 200) => ({ status, headers: { 'Totem-Request-Id': REQUEST_ID, ...(etag ? { ETag: etag } : {}) }, body });
  const mutation = created => ({ object: 'lead_mutation', created, lead, outreach: { status: 'not_armed', reason: null } });
  const receipt = () => {
    const { body, ...metadata } = note;
    return { object: 'lead_note_receipt', note: leakReceipt ? { ...metadata, body } : metadata };
  };
  return edge({ override: ({ operation, request }) => {
    const id = operation.operationId;
    if (id === 'me.get') return response({ ...example('/me'), scopes: [...example('/me').scopes, 'crm:write', 'crm:notes:read'] });
    if (operation['x-totem-effect'] !== 'write' && id !== 'leads.notes') return undefined;
    if (operation['x-totem-effect'] === 'write' && !request.headers['idempotency-key']) return problem(400, 'idempotency_key_required');
    const body = request.body ? JSON.parse(request.body) : undefined;
    if (id === 'leads.upsert') {
      if (body.validate_only) return response({ object: 'lead_validation', valid: true });
      return response(mutation(true), leadEtag(), 201);
    }
    if (id === 'leads.notes') return response({ object: 'list', data: note ? [note] : [], has_more: false, next_cursor: null });
    if (id === 'leads.addNote') {
      note = { ...document.components.schemas.LeadNote.examples[0], lead: lead.id, body: body.body, external_id: body.external_id ?? null };
      return response(receipt(), noteEtag(), 201);
    }
    const noteOperation = id === 'leads.updateNote' || id === 'leads.deleteNote';
    if (!acceptStale && request.headers['if-match'] !== (noteOperation ? noteEtag() : leadEtag())) return problem(412, 'version_conflict');
    if (id === 'leads.updateNote') { note = { ...note, body: body.body, version: note.version + 1 }; return response(receipt(), noteEtag()); }
    if (id === 'leads.deleteNote') { note = null; return response(undefined, undefined, 204); }
    lead = { ...lead, ...(id === 'leads.archive' ? { status: 'archived' } : body), version: lead.version + 1 };
    return response(mutation(false), leadEtag());
  } });
}

/** Stateful task provider boundary; the real runner, client and schema validator are unchanged. */
function tasksEdge({ wrongReplay = false, state = 'succeeded', stateFor = 'create', leakReceipt = false,
  undoOnCancel = false, wrongCompletedTask = false } = {}) {
  const stats = { creates: [], completes: [], createEffects: 0, completeEffects: 0, polls: 0, cancellations: 0 };
  const operations = new Map(), pollCounts = new Map();
  const response = (body, status = 200) => ({ status, headers: { 'Totem-Request-Id': REQUEST_ID }, body });
  const wire = (id, endpoint, status = 'queued') => ({ object: 'operation', id, status, endpoint,
    created_at: '2026-11-02T10:00:00.000Z', updated_at: '2026-11-02T10:00:00.000Z',
    result: status === 'succeeded' ? { object: 'task_receipt', id: 'task_Acceptance', status: endpoint === 'tasks.create' ? 'open' : 'done' } : null,
    error: ['failed', 'outcome_unknown'].includes(status) ? { code: status === 'failed' ? 'execution_failed' : 'outcome_unknown' } : null });
  const handler = edge({ override: ({ operation, request, url }) => {
    const id = operation.operationId;
    if (id === 'me.get') return response({ ...example('/me'), scopes: [...example('/me').scopes, 'tasks:write'] });
    if (!operation.tags.some(tag => tag === 'tasks' || tag === 'operations')) return undefined;
    if (request.headers['x-totem-write-context'] !== undefined) return problem(400, 'invalid_request');
    if (id === 'tasks.create' || id === 'tasks.complete') {
      const key = request.headers['idempotency-key'];
      if (!key) return problem(400, 'idempotency_key_required');
      const body = JSON.parse(request.body);
      const create = id === 'tasks.create', calls = create ? stats.creates : stats.completes;
      calls.push({ key, body });
      if (create ? Object.keys(body).length !== 1 || body.title !== 'SDK tasks smoke'
        : request.url !== '/v1/tasks/task_Acceptance/complete' || Object.keys(body).length !== 0) return problem(400, 'invalid_request');
      const operationId = create ? 'op_Create' : 'op_Complete';
      if (calls.length === 1) {
        if (create) stats.createEffects++;
        else stats.completeEffects++;
        operations.set(operationId, wire(operationId, id));
      } else if (key !== calls[0].key || JSON.stringify(body) !== JSON.stringify(calls[0].body)) return problem(409, 'idempotency_key_reused');
      const value = wire(create && wrongReplay && calls.length > 1 ? 'op_WrongReplay' : operationId, id);
      return response(leakReceipt ? { ...value, private_context: 'taw2.PRIVATE_CONTEXT.proof', private_body: body.title } : value, 202);
    }
    const operationId = url.pathname.split('/')[3], previous = operations.get(operationId);
    if (!previous) return problem(404, 'resource_missing');
    if (id === 'operations.cancel') {
      stats.cancellations++;
      return response(undoOnCancel ? { ...previous, status: 'cancelled', result: null } : previous);
    }
    stats.polls++;
    const count = (pollCounts.get(operationId) ?? 0) + 1;
    pollCounts.set(operationId, count);
    const selectedState = previous.endpoint === `tasks.${stateFor}` ? state : 'succeeded';
    const status = selectedState === 'succeeded' && count === 1 ? 'running' : selectedState;
    const value = wire(operationId, previous.endpoint, status);
    if (wrongCompletedTask && previous.endpoint === 'tasks.complete' && value.result) value.result.id = 'task_Foreign';
    operations.set(operationId, value);
    return response(value);
  } });
  return { handler, stats };
}

const TASK_FIXTURES = { ...FOREIGN, teamId: TEAM, taskCreateKey: 'sdk-acceptance-stable-create' };

test('explicit tasks profile verifies replay, bounded completion and finished cancellation without new-effect retries or content logs', async context => {
  const boundary = tasksEdge();
  const result = await runSmoke(context, boundary.handler, { fixtures: TASK_FIXTURES, env: { TOTEM_SMOKE_PROFILE: 'tasks' } });
  assert.equal(result.exitCode, 0, result.output);
  assert.equal(result.receipt.profile, 'tasks');
  assert.equal(result.receipt.coveredOperations.length, 24);
  assert.deepEqual(result.receipt.excludedOperations.toSorted(), ['leads.addNote', 'leads.archive', 'leads.customValues', 'leads.deleteNote', 'leads.notes', 'leads.update', 'leads.updateCustomValues', 'leads.updateNote', 'leads.upsert', 'notifications.create']);
  assert.deepEqual(boundary.stats.creates.map(item => item.key), ['sdk-acceptance-stable-create', 'sdk-acceptance-stable-create']);
  assert.deepEqual(boundary.stats.completes.map(item => item.key), ['sdk-acceptance-stable-create.complete']);
  assert.deepEqual([boundary.stats.createEffects, boundary.stats.completeEffects, boundary.stats.polls, boundary.stats.cancellations], [1, 1, 4, 1]);
  for (const value of ['SDK tasks smoke', TASK_FIXTURES.taskCreateKey, 'task_Acceptance', 'op_Create', 'op_Complete', 'taw2.PRIVATE_CONTEXT.proof']) {
    assert.equal((result.output + result.receiptText).includes(value), false);
  }
});

for (const [label, fault, failure, expectedCheck] of [
  ['wrong replay identity', { wrongReplay: true }, 'expectation_failed', 'task create replay'],
  ['unknown effect', { state: 'outcome_unknown' }, 'expectation_failed', 'task operation progress'],
  ['failed effect', { state: 'failed' }, 'expectation_failed', 'task operation progress'],
  ['stuck running effect', { state: 'running' }, 'expectation_failed', 'task operation progress'],
  ['unknown completion', { state: 'outcome_unknown', stateFor: 'complete' }, 'expectation_failed', 'task operation progress'],
  ['wrong completed task', { wrongCompletedTask: true }, 'expectation_failed', 'task completion'],
  ['private receipt fields', { leakReceipt: true }, 'response_schema_mismatch', null],
  ['cancellation claims undo', { undoOnCancel: true }, 'expectation_failed', 'completed task cancellation'],
]) {
  test(`tasks runner detects HTTP boundary fault: ${label}`, async context => {
    const boundary = tasksEdge(fault);
    const result = await runSmoke(context, boundary.handler, { fixtures: TASK_FIXTURES, env: { TOTEM_SMOKE_PROFILE: 'tasks' } });
    assert.equal(result.exitCode, 1);
    assert.equal(result.receipt.failure.code, failure);
    assert.equal(result.receipt.failure.check, expectedCheck);
    assert.equal(boundary.stats.createEffects, 1);
    assert.ok(boundary.stats.creates.length <= 2);
    assert.ok(new Set(boundary.stats.creates.map(item => item.key)).size <= 1);
    assert.equal(boundary.stats.completeEffects, fault.undoOnCancel || fault.wrongCompletedTask || fault.stateFor === 'complete' ? 1 : 0);
    if (fault.state === 'running') assert.equal(boundary.stats.polls, 20);
    for (const value of ['SDK tasks smoke', TASK_FIXTURES.taskCreateKey, 'taw2.PRIVATE_CONTEXT.proof']) {
      assert.equal((result.output + result.receiptText).includes(value), false);
    }
  });
}

test('tasks profile refuses missing explicit disposable-team or stable-key fixtures before HTTP', async context => {
  for (const fixtures of [{ ...FOREIGN, taskCreateKey: 'stable' }, { ...FOREIGN, teamId: TEAM }]) {
    const result = await runSmoke(context, edge(), { fixtures, env: { TOTEM_SMOKE_PROFILE: 'tasks' } });
    assert.equal(result.exitCode, 1);
    assert.equal(result.receipt.failure.reason, 'tasks_fixtures_required');
    assert.equal(result.requests.length, 0);
  }
});

test('explicit CRM profile validates writes, content, conditional updates and deletion without leaking content', async context => {
  const result = await runSmoke(context, crmEdge(), { fixtures: { ...FOREIGN, crmEmail: 'sdk-smoke-123@example.invalid', crmExternalId: 'sdk-smoke-123' }, env: { TOTEM_SMOKE_PROFILE: 'crm' } });
  assert.equal(result.exitCode, 0, result.output);
  assert.equal(result.receipt.profile, 'crm');
  assert.deepEqual(result.receipt.excludedOperations.toSorted(), ['leads.customValues', 'leads.updateCustomValues', 'notifications.create', 'operations.cancel', 'operations.get', 'tasks.complete', 'tasks.create']);
  assert.equal(result.receipt.coveredOperations.length, 27);
  assert.equal(result.requests.some(({ url }) => /^\/v1\/(?:tasks|operations)(?:\/|\?|$)/.test(url)), false);
  assert.equal(result.receipt.checks.some(check => check.operation === 'leads.deleteNote' && check.status === 204), true);
  assert.equal(result.receiptText.includes('SDK CRM smoke updated note.'), false);
});
for (const [label, fault, expected] of [
  ['server ignores If-Match', { acceptStale: true }, 'expectation_failed'],
  ['server leaks note body into write receipt', { leakReceipt: true }, 'response_schema_mismatch'],
]) {
  test(`CRM runner detects boundary fault: ${label}`, async context => {
    const result = await runSmoke(context, crmEdge(fault), { fixtures: { ...FOREIGN, crmEmail: 'sdk-smoke-123@example.invalid', crmExternalId: 'sdk-smoke-123' }, env: { TOTEM_SMOKE_PROFILE: 'crm' } });
    assert.equal(result.exitCode, 1);
    assert.equal(result.receipt.failure.code, expected);
  });
}

test('default live runner covers the read profile and tenant checks without mutating CRM', async context => {
  const result = await runSmoke(context, edge({ teams: [TEAM, 'team_SECOND'] }), { fixtures: FOREIGN });
  assert.equal(result.exitCode, 0, result.output);
  assert.equal(result.receipt.passed, true);
  assert.equal(result.receipt.failure, null);
  assert.deepEqual(result.receipt.coveredOperations.toSorted(), [
    'boards.list', 'booking_services.list', 'bookings.get', 'bookings.list', 'calls.get', 'calls.list',
    'conversations.get', 'conversations.list', 'health', 'leads.activities', 'leads.get', 'leads.list',
    'leads.search', 'me.get', 'members.list', 'notifications.get', 'notifications.list', 'sync.changes', 'teams.get', 'teams.list',
  ]);
  assert.equal(result.receipt.profile, 'read');
  assert.equal(result.receipt.coveredOperations.length, 20);
  assert.deepEqual(result.receipt.excludedOperations.toSorted(), [
    'leads.addNote', 'leads.archive', 'leads.customValues', 'leads.deleteNote', 'leads.notes', 'leads.update', 'leads.updateCustomValues', 'leads.updateNote', 'leads.upsert',
    'notifications.create', 'operations.cancel', 'operations.get', 'tasks.complete', 'tasks.create',
  ]);
  assert.equal(result.receipt.excludedOperations.length, 14);
  assert.equal(result.requests.some(({ url }) => /^\/v1\/(?:tasks|operations)(?:\/|\?|$)/.test(url)), false);
  assert.equal(result.requests.some(({ method, url }) => method !== 'GET' && url !== '/v1/leads/search'), false);
  const labels = result.receipt.checks.filter(check => check.check).map(check => check.check);
  assert.deepEqual(labels, ['invalid credentials', 'invalid limit', 'search requires one identifier', 'team required on a multi-team key', 'foreign lead isolation', 'foreign team isolation']);
  assert.deepEqual(result.receipt.skippedChecks, []);
  assert.equal(result.receipt.serverRelease, RELEASE);
  assert.equal(result.receipt.syncPages, 2);
  assert.deepEqual(result.receipt.feedVariants, ['call:removed', 'lead', 'lead_response', 'notification', 'notification:removed']);
  // The invalid-credentials check presented exactly one other key: well-formed, same lookup id, another secret.
  const others = [...result.presented].filter(token => token !== LIVE_KEY);
  assert.equal(others.length, 1);
  assert.equal(parseSecretKey(others[0])?.lookupId, LIVE.lookupId);
  assert.notEqual(parseSecretKey(others[0])?.secret, LIVE.secret);
});
test('an edge that skips the secret check fails the invalid credentials check', async context => {
  const result = await runSmoke(context, edge({ checkSecret: false }), { fixtures: FOREIGN });
  assert.equal(result.exitCode, 1);
  assert.equal(result.receipt.failure.code, 'expectation_failed');
  assert.equal(result.receipt.failure.check, 'invalid credentials');
});
test('the key format matches the API: CRC-32 checksum in base62, lookup id kept by the wrong-secret key', () => {
  assert.equal(checksumBase62('123456789'), '3jZRME');
  assert.equal(formatSecretKey(LIVE.lookupId, LIVE.secret), LIVE_KEY);
  assert.deepEqual(parseSecretKey(LIVE_KEY), LIVE);
  for (const malformed of [KEY, `${LIVE_KEY.slice(0, -1)}y`, LIVE_KEY.replace('tsk_live_', 'tsk_test_'), LIVE_KEY.replace('_abc', '_ab'), undefined]) {
    assert.equal(parseSecretKey(malformed), null, String(malformed));
  }
  const wrong = parseSecretKey(wrongSecretKey(LIVE_KEY));
  assert.equal(wrong?.lookupId, LIVE.lookupId);
  assert.notEqual(wrong?.secret, LIVE.secret);
  assert.equal(wrongSecretKey(KEY), null);
});
test('a run without the foreign fixtures fails unless a partial run is accepted', async context => {
  const partial = await runSmoke(context, edge());
  assert.equal(partial.exitCode, 1);
  assert.equal(partial.receipt.passed, false);
  assert.deepEqual(partial.receipt.skippedChecks, ['foreign_lead_isolation', 'foreign_team_isolation']);
  assert.equal(partial.receipt.failure.code, 'checks_skipped');
  const accepted = await runSmoke(context, edge(), { env: { TOTEM_SMOKE_ALLOW_PARTIAL: '1' } });
  assert.equal(accepted.exitCode, 0, accepted.output);
  assert.equal(accepted.receipt.passed, true);
  assert.equal(accepted.receipt.allowPartial, true);
  assert.deepEqual(accepted.receipt.skippedChecks, ['foreign_lead_isolation', 'foreign_team_isolation']);
});
test('a server that serves a foreign Totem-Team fails the team isolation check', async context => {
  const result = await runSmoke(context, edge({ override: ({ request }) => request.headers['totem-team'] === 'team_FOREIGN' ? { headers: { 'Totem-Request-Id': REQUEST_ID }, body: example('/leads') } : undefined }), { fixtures: FOREIGN });
  assert.equal(result.exitCode, 1);
  assert.equal(result.receipt.failure.code, 'expectation_failed');
  assert.equal(result.receipt.failure.check, 'foreign team isolation');
});
test('an undeclared response field fails closed-world validation without echoing its key', async context => {
  const result = await runSmoke(context, edge({ override: ({ operation }) => operation.operationId === 'calls.get' ? { headers: { 'Totem-Request-Id': REQUEST_ID }, body: { ...example('/calls/{id}'), PRIVATE_EXTRA: 'PRIVATE_TRANSCRIPT_VALUE' } } : undefined }), { fixtures: FOREIGN });
  assert.equal(result.exitCode, 1);
  assert.deepEqual(result.receipt.failure, { code: 'response_schema_mismatch', status: null, apiCode: null, requestId: REQUEST_ID, operation: 'calls.get', check: null, schemaCode: 'undeclared_field', schemaPath: '$', missingFixture: null });
  for (const text of [result.output, result.receiptText]) assert.equal(/PRIVATE_EXTRA|PRIVATE_TRANSCRIPT_VALUE/.test(text), false);
});
for (const [label, page] of [
  ['the same page under a new cursor', count => ({ ...example('/sync/changes'), has_more: true, next_cursor: `cursor_${count}` })],
  ['a new page under the same cursor', count => ({ object: 'list', data: [{ ...example('/sync/changes').data[0], version: count + 3 }], has_more: true, next_cursor: 'cursor_same' })],
]) {
  test(`a feed that ignores its cursor fails the sync walk: ${label}`, async context => {
    let count = 0;
    const result = await runSmoke(context, edge({ override: ({ operation }) => operation.operationId === 'sync.changes' ? { headers: { 'Totem-Request-Id': REQUEST_ID }, body: page(count++) } : undefined }), { fixtures: FOREIGN });
    assert.equal(result.exitCode, 1);
    assert.equal(result.receipt.failure.code, 'expectation_failed');
    assert.equal(result.receipt.failure.check, 'sync walk progress');
    assert.equal(result.receipt.syncPages, 2);
  });
}
test('malformed response values never appear in live logs or receipt', async context => {
  const result = await runSmoke(context, () => ({ headers: { 'Totem-Request-Id': REQUEST_ID, 'Totem-Release': RELEASE }, body: { object: 'PRIVATE_CUSTOMER_RECORD_VALUE', status: 'ok' } }));
  assert.equal(result.exitCode, 1);
  assert.equal(result.output.includes('PRIVATE_CUSTOMER_RECORD_VALUE'), false);
  assert.equal(result.receiptText.includes('PRIVATE_CUSTOMER_RECORD_VALUE'), false);
  assert.deepEqual(result.receipt.failure, { code: 'response_schema_mismatch', status: null, apiCode: null, requestId: REQUEST_ID, operation: 'health', check: null, schemaCode: 'const', schemaPath: '$.object', missingFixture: null });
  assert.equal(result.receipt.serverRelease, RELEASE);
});
test('a server release that is not a commit hash is not recorded', async context => {
  const result = await runSmoke(context, request => request.url === '/v1/health'
    ? { headers: { 'Totem-Request-Id': REQUEST_ID, 'Totem-Release': 'PRIVATE<release>' }, body: example('/health') }
    : { headers: { 'Totem-Request-Id': REQUEST_ID }, body: { object: 'PRIVATE_CUSTOMER_RECORD_VALUE' } });
  assert.equal(result.receipt.serverRelease, null);
  assert.equal(result.receipt.failure.operation, 'me.get');
  assert.equal(/PRIVATE/.test(result.output + result.receiptText), false);
});
test('provider problem messages, malicious request ids and releases never reach diagnostics', async context => {
  const result = await runSmoke(context, () => ({ status: 503, headers: { 'Totem-Request-Id': LIVE_KEY, 'Totem-Release': 'PRIVATE<release>' }, body: { type: 'private-provider-error', title: 'PRIVATE_PROVIDER_MESSAGE', status: 503, code: 'private_provider_message', request_id: LIVE_KEY, doc_url: 'private-value' } }));
  assert.equal(result.exitCode, 1);
  assert.equal(/PRIVATE/.test(result.output + result.receiptText), false);
  assert.deepEqual(result.receipt.failure, { code: 'api_error', status: 503, apiCode: null, requestId: null, operation: 'health', check: null, schemaCode: null, schemaPath: null, missingFixture: null });
});
for (const [resource, fixture] of [['leads', 'leadId'], ['notifications', 'notificationId']]) {
  test(`an empty ${resource} collection names the fixture it needs`, async context => {
    const result = await runSmoke(context, edge({ override: ({ operation }) => operation.operationId === `${resource}.list` ? { headers: { 'Totem-Request-Id': REQUEST_ID }, body: { object: 'list', data: [], has_more: false, next_cursor: null } } : undefined }));
    assert.equal(result.exitCode, 1);
    assert.equal(result.receipt.failure.code, 'fixture_missing');
    assert.equal(result.receipt.failure.missingFixture, fixture);
    assert.match(result.output, new RegExp(`needs ${fixture}`));
  });
}
test('an explicit notification fixture covers its detail route when its list is empty', async context => {
  const requests = [];
  const result = await runSmoke(context, edge({ override: ({ operation, url }) => {
    requests.push(url.pathname);
    if (operation.operationId === 'notifications.list') return { headers: { 'Totem-Request-Id': REQUEST_ID }, body: { object: 'list', data: [], has_more: false, next_cursor: null } };
  } }), { fixtures: { ...FOREIGN, notificationId: 'ntf_FIXTURE' } });
  assert.equal(result.exitCode, 0, result.output);
  assert.ok(result.receipt.coveredOperations.includes('notifications.get'));
  assert.ok(requests.includes('/v1/notifications/ntf_FIXTURE'));
});
for (const [label, reason, options] of [
  ['key file readable by others', 'key_file_mode', { keyMode: 0o644 }],
  ['no key', 'key_missing', { env: { TOTEM_API_KEY_FILE: '' } }],
  ['malformed key', 'key_invalid', { key: KEY }],
  ['key with a checksum typo', 'key_invalid', { key: `${LIVE_KEY.slice(0, -1)}y` }],
  ['plain HTTP base URL', 'base_url_invalid', { env: { TOTEM_API_BASE_URL: 'http://example.invalid/v1' } }],
  ['fixtures that are not JSON', 'fixtures_invalid_json', { fixtures: `{"leadId": "${LIVE_KEY}"` }],
  ['an unknown fixture', 'fixtures_invalid', { fixtures: { leadId: 'lead_1', unknownField: 'x' } }],
]) {
  test(`a configuration failure names its reason and still writes a receipt: ${label}`, async context => {
    const result = await runSmoke(context, () => assert.fail('no request may be sent'), options);
    assert.equal(result.presented.size, 0);
    assert.equal(result.exitCode, 1);
    assert.match(result.output, new RegExp(`FAIL smoke_configuration_failed ${reason}`));
    assert.deepEqual(result.receipt.failure, { code: 'smoke_configuration_failed', reason });
    assert.equal(result.receipt.passed, false);
  });
}
