/**
 * Contract: problem errors keep support metadata and the catalogue's action,
 * and their message names status, code and parameter only. Retries are
 * bounded by maxRetries, honour only well-formed Retry-After values (capped
 * by maxRetryDelayMs), jitter the SDK's own backoff, and never retry
 * authorization, validation or feed-state failures.
 * Durable writes reject ambiguous successful receipts without another effect
 * request. Removing their identity guard makes the HTTP fault oracles red.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { TotemApiError, TotemClient, TotemConnectionError, TotemError, TotemProtocolError, TotemUnknownOutcomeError } from '../dist/index.js';
import { KEY, problem, serve, serveRaw } from './helpers.mjs';

const contract = JSON.parse(await readFile(new URL('../openapi.json', import.meta.url), 'utf8'));
const list = { object: 'list', data: [], has_more: false, next_cursor: null };

const queuedTaskOperation = { object: 'operation', id: 'op_ABC', status: 'queued', endpoint: 'tasks.create', created_at: '2026-11-02T10:00:00Z', updated_at: '2026-11-02T10:00:00Z', result: null, error: null };
const durableWrites = [
  { endpoint: 'tasks.create', call: (client, options) => client.tasks.create({ title: 'Call Ada' }, options), receipt: { object: 'task_receipt', id: 'task_ABC', status: 'open' } },
  { endpoint: 'tasks.complete', call: (client, options) => client.tasks.complete('task_ABC', options), receipt: { object: 'task_receipt', id: 'task_ABC', status: 'done' } },
  { endpoint: 'notifications.create', call: (client, options) => client.notifications.create({ note: 'Review request' }, options), receipt: { object: 'notification_receipt', id: 'ntf_ABC', status: 'new' } },
];
for (const { endpoint, call, receipt } of durableWrites) {
  for (const [label, mutate] of [
    ['null', () => null], ['array', () => []], ['JSON primitive', () => 'PRIVATE_RESPONSE'],
    ['invalid opaque operation id', value => ({ ...value, id: 'raw/id' })],
    ['unrelated endpoint', value => ({ ...value, endpoint: 'foreign.effect' })],
    ['object state', value => ({ ...value, status: { toString: null } })],
    ['impossible timestamp', value => ({ ...value, created_at: '2026-02-30T10:00:00Z' })],
    ['missing result', ({ result: _result, ...value }) => value],
    ['missing error', ({ error: _error, ...value }) => value],
    ['result on pending operation', value => ({ ...value, result: receipt })],
    ['wrong resource receipt', value => ({ ...value, status: 'succeeded', result: { object: 'lead', id: 'lead_Private', status: 'open' } })],
    ['malformed receipt state', value => ({ ...value, status: 'succeeded', result: { ...receipt, status: { toString: null } } })],
    ['result on failed operation', value => ({ ...value, status: 'failed', result: receipt, error: { code: 'execution_failed' } })],
    ['error on succeeded operation', value => ({ ...value, status: 'succeeded', result: receipt, error: { code: 'execution_failed' } })],
  ]) {
    test(`${endpoint} fences ${label} as a lean unknown outcome without retry`, async context => {
      let requests = 0;
      const body = mutate({ ...queuedTaskOperation, endpoint });
      const baseUrl = await serveRaw(context, (_request, response) => {
        requests++;
        response.writeHead(202, { 'Content-Type': 'application/json', 'Totem-Request-Id': 'req_receipt_fault' });
        response.end(JSON.stringify(body));
      });
      const client = new TotemClient({ apiKey: KEY, team: 'team_SELECTED', baseUrl, maxRetries: 5 });
      await assert.rejects(call(client, { idempotencyKey: 'intent-once' }), error => {
        assert.ok(error instanceof TotemUnknownOutcomeError && error instanceof TotemProtocolError);
        assert.equal(error.code, 'outcome_unknown');
        assert.equal(error.idempotencyKey, 'intent-once');
        assert.equal(error.requestId, 'req_receipt_fault');
        assert.deepEqual(Object.keys(error).sort(), ['code', 'idempotencyKey', 'name', 'requestId']);
        assert.equal('cause' in error, false);
        assert.doesNotMatch(`${error.message}${JSON.stringify(error)}`, /PRIVATE_RESPONSE|raw\/id|lead_Private/);
        return true;
      });
      assert.equal(requests, 1);
    });
  }
  for (const [label, result] of [['redacted succeeded receipt', null], ['additive receipt with future status', { ...receipt, status: 'future-status', future_field: true }]]) {
    test(`${endpoint} preserves ${label} and additive response fields`, async context => {
      const operation = { ...queuedTaskOperation, endpoint, status: 'succeeded', result, future_field: true };
      const baseUrl = await serve(context, () => ({ status: 202, body: operation }));
      assert.deepEqual(await call(new TotemClient({ apiKey: KEY, baseUrl }), { idempotencyKey: 'forward-compatible' }), operation);
    });
  }
}
test('task completion refuses a receipt for another task, with a boundary-fault negative control', async context => {
  let replace = false;
  const baseUrl = await serve(context, () => ({ status: 202, body: { ...queuedTaskOperation, endpoint: 'tasks.complete', status: 'succeeded',
    result: { object: 'task_receipt', id: replace ? 'task_ABC' : 'task_Foreign', status: 'done' } } }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  const guardOracle = () => assert.rejects(client.tasks.complete('task_ABC', { idempotencyKey: 'complete-once' }), TotemUnknownOutcomeError);
  await guardOracle();
  // Hiding the foreign receipt at the HTTP boundary must make the same guard
  // oracle red, proving it is not satisfied by any successful response.
  replace = true;
  await assert.rejects(guardOracle(), error => error.code === 'ERR_ASSERTION' && /Missing expected rejection/u.test(error.message));
});
test('invalid durable-write JSON reports its original generated key without retaining body or cause', async context => {
  const keys = [];
  const baseUrl = await serveRaw(context, (request, response) => {
    keys.push(request.headers['idempotency-key']);
    response.writeHead(202, { 'Totem-Request-Id': 'req_invalid_operation' });
    response.end('PRIVATE_INVALID_JSON');
  });
  await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 5 }).notifications.create({ note: 'Review' }), error => {
    assert.ok(error instanceof TotemUnknownOutcomeError);
    assert.equal(error.idempotencyKey, keys[0]);
    assert.match(error.idempotencyKey, /^[0-9a-f-]{36}$/u);
    assert.equal(error.requestId, 'req_invalid_operation');
    assert.equal('cause' in error, false);
    assert.doesNotMatch(JSON.stringify(error), /PRIVATE_INVALID_JSON/);
    return true;
  });
  assert.equal(keys.length, 1);
});
for (const action of ['get', 'cancel']) {
  test(`operation ${action} binds the requested id without becoming another business effect`, async context => {
    let requests = 0;
    const baseUrl = await serve(context, () => { requests++; return { body: { ...queuedTaskOperation, id: 'op_Foreign' } }; });
    await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 5 }).operations[action]('op_ABC'),
      error => error instanceof TotemProtocolError && !(error instanceof TotemUnknownOutcomeError));
    assert.equal(requests, 1);
  });
}
test('future operation states remain forward compatible and ordinary CRM reads keep their types-only behavior', async context => {
  const operation = { ...queuedTaskOperation, status: 'future-state', future_field: true };
  const baseUrl = await serve(context, request => ({ status: request.url === '/v1/tasks' ? 202 : 200,
    body: request.url === '/v1/tasks' ? operation : { future_field: true } }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  assert.deepEqual(await client.tasks.create({ title: 'Future state' }), operation);
  assert.deepEqual(await client.leads.get('lead_ABC'), { future_field: true });
});
for (const [route, call, acceptedStatus, responseBody, expectedBody] of [
  ['CRM upsert', (client, options) => client.leads.upsert({ origin: 'import', email: 'ada@example.com' }, options), 201, { object: 'lead_mutation', created: true, lead: { id: 'lead_ABC' } }, '{"origin":"import","email":"ada@example.com"}'],
  ['task create', (client, options) => client.tasks.create({ title: 'Call Ada' }, options), 202, queuedTaskOperation, '{"title":"Call Ada"}'],
  ['task complete', (client, options) => client.tasks.complete('task_ABC', options), 202, { ...queuedTaskOperation, endpoint: 'tasks.complete' }, '{}'],
]) for (const [label, supplied] of [['automatic UUID', undefined], ['caller checkpoint key', 'crm-contact-123']]) {
  test(`${route} replays one committed effect using ${label}, including a dropped-key negative control`, async context => {
    const states = new Map();
    const keys = [];
    const bodies = [];
    let writes = 0;
    const baseUrl = await serve(context, request => {
      const key = request.headers['idempotency-key'];
      keys.push(key);
      bodies.push(request.body);
      if (states.has(key)) return { status: acceptedStatus, body: responseBody };
      states.set(key, true); writes++;
      return { status: 503, headers: { 'Retry-After': '0' }, body: problem(503, 'service_unavailable') };
    });
    const verify = async client => {
      const result = await call(client, supplied ? { idempotencyKey: supplied } : {});
      assert.deepEqual(result, responseBody);
      assert.equal(writes, 1);
    };
    await verify(new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 1 }));
    assert.equal(keys.length, 2);
    assert.equal(keys[0], keys[1]);
    assert.deepEqual(bodies, [expectedBody, expectedBody]);
    if (supplied) assert.equal(keys[0], 'crm-contact-123');
    else assert.match(keys[0], /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    states.clear(); keys.length = 0; writes = 0;
    const corruptedKey = async (url, init) => {
      const headers = new Headers(init.headers); headers.set('Idempotency-Key', `fault-${keys.length}`);
      return fetch(url, { ...init, headers });
    };
    await assert.rejects(verify(new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 1, fetch: corruptedKey })), TotemApiError);
    assert.equal(writes, 2);
  });
}
for (const [label, response, ErrorType] of [
  ['transient HTTP response', () => Response.json(problem(503, 'service_unavailable'), { status: 503, headers: { 'Retry-After': '0' } }), TotemApiError],
  ['unknown network outcome', () => { throw new TypeError('network response lost'); }, TotemConnectionError],
]) {
  test(`cancellation sends one request on ${label} without an undeclared retry key`, async () => {
    const requests = [];
    const client = new TotemClient({ apiKey: KEY, team: 'team_SELECTED', maxRetries: 5, fetch: async (url, init) => { requests.push({ url: String(url), init }); return response(); } });
    await assert.rejects(client.operations.cancel('op_ABC'), ErrorType);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, 'https://api.totemstudio.ai/v1/operations/op_ABC/cancel');
    assert.equal(requests[0].init.body, '{}');
    assert.equal(requests[0].init.headers.get('Totem-Team'), 'team_SELECTED');
    assert.equal(requests[0].init.headers.get('Content-Type'), 'application/json');
    assert.equal(requests[0].init.headers.get('Idempotency-Key'), null);
  });
}
test('reading an operation preserves its unknown outcome and never repeats the original effect', async context => {
  const requests = [];
  const operation = { ...queuedTaskOperation, status: 'outcome_unknown', error: { code: 'outcome_unknown' } };
  const baseUrl = await serve(context, request => { requests.push(request); return { body: operation }; });
  assert.deepEqual(await new TotemClient({ apiKey: KEY, team: 'team_SELECTED', baseUrl }).operations.get('op_ABC'), operation);
  assert.deepEqual(requests.map(({ method, url }) => [method, url]), [['GET', '/v1/operations/op_ABC']]);
});
for (const status of [409, 500, 503]) {
  test(`never blindly retries outcome_unknown even with status ${status}`, async context => {
    let count = 0;
    const baseUrl = await serve(context, () => { count++; return { status, headers: { 'Retry-After': '0' }, body: problem(status, 'outcome_unknown') }; });
    await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl }).leads.addNote('lead_ABC', { body: 'Asked for a proposal.' }), error => error instanceof TotemApiError && error.code === 'outcome_unknown');
    assert.equal(count, 1);
  });
}
test('read-only POST search keeps transient retry behavior', async context => {
  let count = 0;
  const baseUrl = await serve(context, () => ++count === 1 ? { status: 503, headers: { 'Retry-After': '0' }, body: problem(503, 'service_unavailable') } : { body: list });
  assert.deepEqual(await new TotemClient({ apiKey: KEY, baseUrl }).leads.search({ email: 'ada@example.com' }), list);
  assert.equal(count, 2);
});
test('an idempotent write honors an in-progress replay response without replacing its key', async context => {
  const keys = [];
  const baseUrl = await serve(context, request => {
    keys.push(request.headers['idempotency-key']);
    return keys.length === 1 ? { status: 409, headers: { 'Retry-After': '0' }, body: problem(409, 'idempotency_in_progress') }
      : { status: 201, body: { object: 'lead_note_receipt', note: { id: 'note_DEF' } } };
  });
  assert.equal((await new TotemClient({ apiKey: KEY, baseUrl }).leads.addNote('lead_ABC', { body: 'Asked for a proposal.' })).note.id, 'note_DEF');
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
});
test('success bodies must match a declared status and 204 resolves without JSON parsing', async () => {
  const accepted = new TotemClient({ apiKey: KEY, fetch: async () => new Response(null, { status: 204 }) });
  assert.equal(await accepted.leads.deleteNote('lead_ABC', 'note_DEF', { ifMatch: '"note_DEF:3"' }), undefined);
  const undeclared = new TotemClient({ apiKey: KEY, fetch: async () => Response.json({}, { status: 202 }) });
  await assert.rejects(undeclared.leads.upsert({ origin: 'import', email: 'ada@example.com' }), TotemProtocolError);
  const unacceptedTask = new TotemClient({ apiKey: KEY, fetch: async () => Response.json(queuedTaskOperation, { status: 200 }) });
  await assert.rejects(unacceptedTask.tasks.create({ title: 'Call Ada' }), TotemProtocolError);
});

for (const [status, code, action] of [
  [400, 'invalid_request', 'fix_request'],
  [401, 'invalid_credentials', 'check_credentials'],
  [403, 'ip_not_allowed', 'check_credentials'],
  [403, 'team_state_restricted', 'keep_and_retry'],
  [404, 'resource_missing', 'fix_request'],
  [404, 'team_not_accessible', 'drop_team'],
  [409, 'resync_required', 'resync'],
  [409, 'capture_not_ready', 'wait_capture'],
  [410, 'sync_cursor_expired', 'resync'],
]) {
  test(`never retries permanent ${status} ${code}, whose action is ${action}`, async context => {
    assert.ok(Object.hasOwn(contract['x-totem-errors'], code), 'fixture codes come from the published catalogue');
    let count = 0;
    const baseUrl = await serve(context, () => { count++; return { status, body: problem(status, code) }; });
    await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl }).me.get(), error => {
      assert.ok(error instanceof TotemApiError);
      assert.ok(error instanceof TotemError);
      assert.equal(error.status, status);
      assert.equal(error.code, code);
      assert.equal(error.action, action);
      assert.equal(error.title, 'Request refused');
      assert.equal(error.requestId, 'req_fixture_01');
      assert.equal(error.problem.title, 'Request refused');
      return true;
    });
    assert.equal(count, 1);
  });
}
for (const [label, response] of [
  ['an unknown code', Response.json(problem(422, 'brand_new_code'), { status: 422 })],
  ['no problem document', new Response('<html>blocked</html>', { status: 403 })],
]) {
  test(`${label} has no action`, async () => {
    const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => response });
    await assert.rejects(client.me.get(), error => error instanceof TotemApiError && error.action === null);
  });
}
test('the message names status, code and param, never values or problem text', async () => {
  const body = problem(400, 'invalid_request', { title: 'PRIVATE_TITLE', param: 'limit', detail: 'PRIVATE_DETAIL' });
  const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => Response.json(body, { status: 400 }) });
  await assert.rejects(client.leads.list({ limit: 1000 }), error => {
    assert.equal(error.message, 'Totem API request failed (400, invalid_request, param=limit)');
    assert.equal(error.param, 'limit');
    assert.equal(error.title, 'PRIVATE_TITLE');
    return true;
  });
});
test('a param that is not a plain name stays out of the message', async () => {
  const body = problem(400, 'invalid_request', { param: 'limit=1000; tsk_live_secret' });
  const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => Response.json(body, { status: 400 }) });
  await assert.rejects(client.me.get(), error => error.message === 'Totem API request failed (400, invalid_request)' && error.param === 'limit=1000; tsk_live_secret');
});
for (const [label, headers, expected] of [
  ['the Totem-Request-Id header wins over the body', { 'Totem-Request-Id': 'req_header' }, 'req_header'],
  ['the body request_id is used when a proxy strips the header', {}, 'req_body'],
]) {
  test(`request id: ${label}`, async () => {
    const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => Response.json(problem(404, 'resource_missing', { request_id: 'req_body' }), { status: 404, headers }) });
    await assert.rejects(client.me.get(), error => error.requestId === expected);
  });
}
for (const status of [408, 429, 500, 502, 503, 504]) {
  test(`retries transient ${status} within attempt bound`, async context => {
    let count = 0;
    const baseUrl = await serve(context, () => { count++; return count === 1 ? { status, headers: { 'Retry-After': '0' }, body: problem(status, 'service_unavailable') } : { body: { recovered: true } }; });
    assert.deepEqual(await new TotemClient({ apiKey: KEY, baseUrl }).me.get(), { recovered: true });
    assert.equal(count, 2);
  });
}
test('exhausted retry budget surfaces the final problem', async context => {
  let count = 0;
  const baseUrl = await serve(context, () => { count++; return { status: 503, headers: { 'Retry-After': '0' }, body: problem(503, 'service_unavailable') }; });
  await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 2 }).me.get(), error => error instanceof TotemApiError && error.code === 'service_unavailable');
  assert.equal(count, 3);
});
test('long Retry-After is returned to caller without retrying too soon', async context => {
  let count = 0;
  const baseUrl = await serve(context, () => { count++; return { status: 429, headers: { 'Retry-After': '86400' }, body: problem(429, 'quota_exceeded') }; });
  await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl }).me.get(), error => error instanceof TotemApiError && error.retryAfterMs === 86_400_000 && error.action === 'retry_after');
  assert.equal(count, 1);
});
for (const [label, values, check] of [
  ['delta-seconds', ['7'], ms => ms === 7000],
  ['an IMF-fixdate two minutes ahead, as a delay', [() => new Date(Date.now() + 120_000).toUTCString()], ms => ms >= 110_000 && ms <= 120_000],
  ['a past IMF-fixdate, as zero', ['Thu, 01 Jan 2015 00:00:00 GMT'], ms => ms === 0],
  ['a fraction, ignored', ['1.5'], ms => ms === null],
  ['a negative number, ignored', ['-1'], ms => ms === null],
  ['two merged headers, ignored', ['5', '6'], ms => ms === null],
  ['free text, ignored', ['foo 3'], ms => ms === null],
]) {
  test(`Retry-After: ${label}`, async () => {
    const headers = values.map(value => ['Retry-After', typeof value === 'function' ? value() : value]);
    const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => Response.json(problem(429, 'rate_limited'), { status: 429, headers }) });
    await assert.rejects(client.me.get(), error => error instanceof TotemApiError && check(error.retryAfterMs));
  });
}
test('maxRetryDelayMs caps only the server Retry-After, not the SDK backoff', async () => {
  let count = 0;
  const responses = [() => { throw new TypeError('network unavailable'); }, () => new Response(null, { status: 502 }), () => Response.json({ recovered: true })];
  const client = new TotemClient({ apiKey: KEY, maxRetryDelayMs: 0, fetch: async () => responses[count++]() });
  assert.deepEqual(await client.me.get(), { recovered: true });
  assert.equal(count, 3);
  let limited = 0;
  const strict = new TotemClient({ apiKey: KEY, maxRetryDelayMs: 0, fetch: async () => { limited++; return Response.json(problem(429, 'rate_limited'), { status: 429, headers: { 'Retry-After': '1' } }); } });
  await assert.rejects(strict.me.get(), error => error instanceof TotemApiError && error.retryAfterMs === 1000);
  assert.equal(limited, 1);
});
test('the SDK backoff has equal jitter; a server Retry-After is waited out exactly', async context => {
  context.mock.method(Math, 'random', () => 0);
  const times = [];
  const answers = [new Response(null, { status: 503 }), Response.json(problem(429, 'rate_limited'), { status: 429, headers: { 'Retry-After': '1' } }), Response.json({ recovered: true })];
  const client = new TotemClient({ apiKey: KEY, fetch: async () => { times.push(performance.now()); return answers[times.length - 1]; } });
  assert.deepEqual(await client.me.get(), { recovered: true });
  const [backoff, serverDelay] = [times[1] - times[0], times[2] - times[1]];
  // First step 250 ms: half fixed (125) plus random(0) times the other half.
  assert.ok(backoff >= 120 && backoff < 240, `backoff ${backoff}`);
  assert.ok(serverDelay >= 990, `server delay ${serverDelay}`);
});
test('non-JSON firewall errors retain HTTP status and request id', async () => {
  const client = new TotemClient({ apiKey: KEY, maxRetries: 0, fetch: async () => new Response('<html>blocked</html>', { status: 429, headers: { 'Totem-Request-Id': 'edge_01' } }) });
  await assert.rejects(client.me.get(), error => error instanceof TotemApiError && error.code === 'http_error' && error.status === 429 && error.requestId === 'edge_01');
});
test('success metadata can be read without changing the body shape', async context => {
  const baseUrl = await serve(context, () => ({ body: { name: 'SDK integration' } }));
  const result = await new TotemClient({ apiKey: KEY, baseUrl }).requestWithResponse('me.get');
  assert.deepEqual(result.data, { name: 'SDK integration' });
  assert.equal(result.status, 200);
  assert.equal(result.requestId, 'req_fixture_01');
});
test('invalid successful JSON is a protocol error with its cause and no retry', async () => {
  let count = 0;
  const client = new TotemClient({ apiKey: KEY, fetch: async () => { count++; return new Response('not JSON', { status: 200, headers: { 'Totem-Request-Id': 'req_invalid_json' } }); } });
  await assert.rejects(client.me.get(), error => error instanceof TotemProtocolError && error instanceof TotemError && error.requestId === 'req_invalid_json' && error.cause instanceof SyntaxError);
  assert.equal(count, 1);
});
test('network transport failures retry within the same bound', async () => {
  let count = 0;
  const client = new TotemClient({ apiKey: KEY, maxRetries: 1, fetch: async () => { count++; if (count === 1) throw new TypeError('network unavailable'); return Response.json(list); } });
  assert.deepEqual(await client.calls.list(), list);
  assert.equal(count, 2);
});
test('exhausted network retries raise TotemConnectionError carrying the last failure', async context => {
  context.mock.method(Math, 'random', () => 0);
  const failures = [];
  const client = new TotemClient({ apiKey: KEY, maxRetries: 2, fetch: async () => { const failure = new TypeError('fetch failed'); failures.push(failure); throw failure; } });
  await assert.rejects(client.me.get(), error => error instanceof TotemConnectionError && error instanceof TotemError && error.cause === failures.at(-1));
  assert.equal(failures.length, 3);
});
test('an error a custom fetch throws that is not a network failure is rethrown unchanged', async () => {
  let count = 0;
  const bug = new RangeError('instrumentation bug');
  const client = new TotemClient({ apiKey: KEY, fetch: async () => { count++; throw bug; } });
  await assert.rejects(client.me.get(), error => error === bug);
  assert.equal(count, 1);
});
