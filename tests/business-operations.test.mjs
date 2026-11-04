/**
 * Real SDK methods/receipt guards over HTTP. Fixed domain routes preserve
 * source CAS, per-request authority and logical idempotency. Altered receipt
 * identity and ambiguous provider outcomes must fail without another effect.
 * Response examples are public contract data, not inspected implementation.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { TotemClient, TotemApiError, TotemProtocolError, TotemUnknownOutcomeError } from '../dist/index.js';
import { serve, KEY, problem } from './helpers.mjs';
const document = JSON.parse(await readFile(new URL('../openapi.json', import.meta.url), 'utf8'));
const BINDING = 'tcall1.' + 'd'.repeat(64);
const CONTENT = 'tcnt1.' + 'b'.repeat(64), CALENDAR = 'tcal1.' + 'c'.repeat(64);
const SOURCE = '"lrs1_' + 'a'.repeat(64) + '"', NOTE = '"lns1_' + 'b'.repeat(64) + '"', BOOKING = '"bka_' + 'c'.repeat(64) + '"';
const CONTEXT = `taw2.${Buffer.from('{"version":2,"executionId":"server-original-action"}').toString('base64url')}.${'a'.repeat(43)}`;
const example = (path, method = 'post', status = 200) => {
  const value = document.paths[path]?.[method]?.responses[String(status)]?.content?.['application/json']?.example;
  assert.ok(value, `public contract example required for ${method} ${path} ${status}`);
  return structuredClone(value);
};
const operation = (endpoint, patch = {}) => ({ object: 'operation', id: 'op_Current', status: 'queued', endpoint,
  created_at: '2026-11-03T12:00:00Z', updated_at: '2026-11-03T12:00:00Z', result: null, error: null, ...patch });
const cases = [
  ['current services', 'booking_services.options', c => c.bookingServices.options({ query: 'Consultation', limit: 5 }), '/booking_services/options', 'POST', { query: 'Consultation', limit: 5 }],
  ['calling bindings', 'calls.options', c => c.calls.options({ lead_id: 'lead_Current' }), '/calls/options', 'POST', { lead_id: 'lead_Current' }],
  ['retained transcript', 'calls.transcript', c => c.calls.transcript('call_Current'), '/calls/call_Current/transcript', 'GET', undefined, '/calls/{id}/transcript'],
  ['retained recording', 'calls.recording', c => c.calls.recording('call_Current'), '/calls/call_Current/recording', 'GET', undefined, '/calls/{id}/recording'],
  ['crm context', 'crm.context', c => c.crm.context({ lead_id: 'lead_Current', representation: 'model' }), '/crm/context', 'POST', { lead_id: 'lead_Current', representation: 'model' }],
  ['message senders', 'messages.channels', c => c.messages.channels(), '/messages/channels', 'POST', {}],
  ['message body', 'conversations.messages', c => c.conversations.messages({ conversation_id: 'conv_Current', limit: 2 }), '/conversations/messages', 'POST', { conversation_id: 'conv_Current', limit: 2 }],
  ['availability', 'bookings.availability', c => c.bookings.availability({ lead_id: 'lead_Current', service_id: 'svc_Current' }), '/bookings/availability', 'POST', { lead_id: 'lead_Current', service_id: 'svc_Current' }],
  ['booking management', 'bookings.inspect', c => c.bookings.inspect('bkg_Current'), '/bookings/bkg_Current/management', 'GET', undefined, '/bookings/{id}/management'],
  ['current lead bookings', 'bookings.forLead', c => c.bookings.forLead({ lead_id: 'lead_Current' }), '/bookings/for-lead', 'POST', { lead_id: 'lead_Current' }],
  ['current payments', 'bookingPayments.get', c => c.bookingPayments.get({ lead_id: 'lead_Current' }), '/booking-payments/get', 'POST', { lead_id: 'lead_Current' }],
  ['library discovery', 'library.list', c => c.library.list({ query: 'Fictional entry', limit: 2 }), '/library/list', 'POST', { query: 'Fictional entry', limit: 2 }],
  ['library detail', 'library.get', c => c.library.get(CONTENT), '/library/get', 'POST', { reference: CONTENT }],
  ['prepared visitor descriptor', 'library.prepared', c => c.library.prepared(CONTENT), '/library/prepared', 'POST', { reference: CONTENT }],
  ['authorized attachment', 'attachments.resolve', c => c.attachments.resolve(CONTENT), '/attachments/resolve', 'POST', { reference: CONTENT }],
  ['published catalog', 'catalog.search', c => c.catalog.search({ query: 'Fictional item' }), '/catalog/search', 'POST', { query: 'Fictional item' }],
  ['lifecycle events', 'events.list', c => c.events.list({ limit: 2 }), '/events?limit=2', 'GET', undefined, '/events'],
];
for (const [label, endpoint, call, path, method, body, documentedPath] of cases) test(`${label} preserves its fixed read route and body without mutation headers`, async context => {
  const expected = example(documentedPath ?? path, method.toLowerCase());
  if (endpoint === 'bookings.inspect') expected.id = 'bkg_Current';
  if (endpoint === 'calls.transcript' || endpoint === 'calls.recording') expected.call_id = 'call_Current';
  const requests = [];
  const baseUrl = await serve(context, request => { requests.push(request); return { body: expected }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  assert.deepEqual(await call(client), expected);
  assert.equal(requests.length, 1); assert.equal(requests[0].method, method); assert.equal(requests[0].url, '/v1' + path);
  assert.deepEqual(requests[0].body ? JSON.parse(requests[0].body) : undefined, body);
  assert.equal(requests[0].headers.authorization, `Bearer ${KEY}`);
  assert.equal(requests[0].headers['idempotency-key'], undefined);
  assert.equal(requests[0].headers['if-match'], undefined);
  assert.equal(requests[0].headers['totem-team'], ['bookings.inspect', 'calls.transcript', 'calls.recording'].includes(endpoint) ? undefined : 'team_Selected');
});

const starts = [
  ['messages.prepareReply', c => c.messages.prepareReply({ conversation_id: 'conv_Current' }, { idempotencyKey: 'original-first-reply' }), '/messages/prepare-reply'],
  ['calls.start', c => c.calls.start({ lead_id: 'lead_Current', binding_reference: BINDING, consent_confirmed: true }, { idempotencyKey: 'original-call' }), '/calls'],
  ['messages.requestInfo', c => c.messages.requestInfo({ lead_id: 'lead_Current', info: 'The link they requested' }, { idempotencyKey: 'original-request-info' }), '/messages/requested-info'],
  ['messages.send', c => c.messages.send({ target: { kind: 'conversation', conversation_id: 'conv_Current' }, content: { kind: 'text', text: 'Fictional message' } }, { writeContext: CONTEXT, idempotencyKey: 'original-message' }), '/messages/send'],
  ['bookings.create', c => c.bookings.create({ lead_id: 'lead_Current', offer: CALENDAR, customer_name: 'Fictional Client' }, { idempotencyKey: 'original-booking' }), '/bookings'],
  ['bookings.cancel', c => c.bookings.cancel('bkg_Current', { ifMatch: BOOKING, idempotencyKey: 'original-cancel' }), '/bookings/bkg_Current/cancel'],
  ['bookings.reschedule', c => c.bookings.reschedule('bkg_Current', { starts_at: '2026-11-04T10:00:00Z' }, { ifMatch: BOOKING, idempotencyKey: 'original-move' }), '/bookings/bkg_Current/reschedule'],
  ['bookingPayments.sendLink', c => c.bookingPayments.sendLink({ lead_id: 'lead_Current', reference: CALENDAR, consent_confirmed: true }, { idempotencyKey: 'original-link' }), '/booking-payments/send-link'],
  ['library.send', c => c.library.send({ reference: CONTENT, expected_revision: 3, conversation_id: 'conv_Current' }, { idempotencyKey: 'original-library' }), '/library/send'],
  ['catalog.send', c => c.catalog.send({ catalog: CONTENT, variants: [CONTENT], expected_revision: 3, conversation_id: 'conv_Current' }, { idempotencyKey: 'original-catalog' }), '/catalog/send'],
];
for (const [endpoint, call, path] of starts) test(`${endpoint} accepts an asynchronous start with stable request intent`, async context => {
  const requests = [];
  const accepted = operation(endpoint);
  const baseUrl = await serve(context, request => { requests.push(request); return { status: 202, body: accepted }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  assert.deepEqual(await call(client), accepted);
  assert.equal(requests.length, 1); assert.equal(requests[0].url, '/v1' + path);
  assert.match(requests[0].headers['idempotency-key'], /^original-/u);
  if (endpoint === 'messages.send') assert.equal(requests[0].headers['x-totem-write-context'], CONTEXT);
  if (['bookings.cancel', 'bookings.reschedule'].includes(endpoint)) assert.equal(requests[0].headers['if-match'], BOOKING);
});

test('source writes and note deletion preserve their reviewed CAS and content-free receipts', async context => {
  const requests = [];
  const metadata = { object: 'lead_source_mutation', created: false, changed: true,
    lead: { object: 'lead_source_receipt', id: 'lead_Current', etag: SOURCE, updated_at: '2026-11-03T12:00:00Z' } };
  const deletion = { object: 'lead_note_source_mutation', created: false, deleted: true,
    note: { object: 'lead_note_source_deletion', id: 'note_Current', lead: 'lead_Current' } };
  const baseUrl = await serve(context, request => { requests.push(request); return { body: request.method === 'DELETE' ? deletion : metadata }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  assert.deepEqual(await client.leads.update('lead_Current', { name: 'Reviewed' }, { ifMatch: SOURCE, idempotencyKey: 'source-edit' }), metadata);
  assert.deepEqual(await client.leads.deleteNote('lead_Current', 'note_Current', { ifMatch: NOTE, idempotencyKey: 'source-note-delete' }), deletion);
  assert.equal(requests[0].headers['if-match'], SOURCE); assert.equal(requests[1].headers['if-match'], NOTE);
  assert.deepEqual(requests.map(row => row.headers['idempotency-key']), ['source-edit', 'source-note-delete']);
  assert.doesNotMatch(JSON.stringify(deletion), /body|private|version/u);
});

test('source deletion cannot silently accept legacy no-content or unrelated resource acknowledgment', async context => {
  let requests = 0;
  const baseUrl = await serve(context, () => { requests++; return { status: 204, body: undefined }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 3 });
  await assert.rejects(client.leads.deleteNote('lead_Current', 'note_Current', { ifMatch: NOTE, idempotencyKey: 'source-delete-original' }), error => {
    assert.ok(error instanceof TotemUnknownOutcomeError); assert.equal(error.idempotencyKey, 'source-delete-original'); return true;
  });
  assert.equal(requests, 1);
});

test('actual payment-required and prepared receipts remain distinct from completed delivery', async context => {
  const responses = [
    operation('bookings.create', { status: 'succeeded', result: { object: 'booking_payment_receipt', reference: CALENDAR, outcome: 'payment_required', booking_confirmed: false } }),
    operation('library.send', { status: 'succeeded', result: { object: 'library_delivery_receipt', status: 'prepared', sent_parts: 0, total_parts: 3, prepared: true, prepared_reference: CONTENT, reason: 'none' } }),
  ];
  const baseUrl = await serve(context, () => ({ body: responses.shift() }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  assert.equal((await client.operations.get('op_Current')).result.booking_confirmed, false);
  const prepared = (await client.operations.get('op_Current')).result;
  assert.equal(prepared.prepared, true); assert.equal(prepared.sent_parts, 0); assert.equal(prepared.prepared_reference, CONTENT);
});

test('wrong business operation acknowledgment and recorded uncertainty do not trigger blind retries', async context => {
  let requests = 0;
  const baseUrl = await serve(context, () => { requests++; return { status: 202, body: operation('tasks.create') }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 3 });
  await assert.rejects(client.library.send({ reference: CONTENT, expected_revision: 3, conversation_id: 'conv_Current' }, { idempotencyKey: 'original-library' }), TotemUnknownOutcomeError);
  assert.equal(requests, 1);
  const unknownUrl = await serve(context, () => { requests++; return { status: 409, body: problem(409, 'outcome_unknown') }; });
  await assert.rejects(new TotemClient({ apiKey: KEY, baseUrl: unknownUrl, maxRetries: 3 }).messages.send({ target: { kind: 'conversation', conversation_id: 'conv_Current' }, content: { kind: 'text', text: 'Fictional' } }, { idempotencyKey: 'original-message' }), error => error instanceof TotemApiError && error.code === 'outcome_unknown');
  assert.equal(requests, 2);
});

test('content-permission refusal exposes no invented prepared delivery or attachment URL', async context => {
  let requests = 0;
  const baseUrl = await serve(context, () => { requests++; return { status: 403, body: problem(403, 'insufficient_scope') }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  await assert.rejects(client.library.prepared(CONTENT), error => error instanceof TotemApiError && error.code === 'insufficient_scope');
  await assert.rejects(client.attachments.resolve(CONTENT), error => error instanceof TotemApiError && error.code === 'insufficient_scope');
  assert.equal(requests, 2);
});

test('malformed current-source content is a protocol error and additive fields stay compatible', async context => {
  let response = { object: 'conversation_messages', messages: [], truncated: false, future_metadata: 'compatible' };
  const baseUrl = await serve(context, () => ({ body: response }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  assert.equal((await client.conversations.messages({ conversation_id: 'conv_Current' })).future_metadata, 'compatible');
  response = { object: 'conversation_messages', messages: [{ reference: 'raw-private-message', text: 'private' }], truncated: false };
  await assert.rejects(client.conversations.messages({ conversation_id: 'conv_Current' }), TotemProtocolError);
});

test('configured-information operation receipts explicitly report queue admission rather than delivery', async context => {
  let deliveryConfirmed = false;
  const baseUrl = await serve(context, () => ({ body: operation('messages.requestInfo', { status: 'succeeded', result: {
    object: 'requested_info_receipt', status: 'queued', channel: 'email', delivery_confirmed: deliveryConfirmed, includes_requested_detail: true, eta_minutes: 5,
  } }) }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  const receipt = (await client.operations.get('op_Current')).result;
  assert.equal(receipt.delivery_confirmed, false); assert.equal(receipt.status, 'queued'); assert.equal(receipt.channel, 'email');
  deliveryConfirmed = true;
  await assert.rejects(client.operations.get('op_Current'), TotemProtocolError);
});

const committed = [
  ['leads.scheduleContact', c => c.leads.scheduleContact({ lead_id: 'lead_Current', contact_at: '2026-11-04T10:00:00Z', channel: 'call', customer_confirmed: true }, { idempotencyKey: 'same-callback', ifMatch: SOURCE }), '/crm/scheduled-contact'],
  ['leads.handoff', c => c.leads.handoff({ lead_id: 'lead_Current', office: 'north', summary: 'Factual qualified need' }, { idempotencyKey: 'same-handoff' }), '/crm/handoff'],
  ['referrals.create', c => c.referrals.create({ name: 'Fictional person', phone: '+34600111222', note: 'Asked about automation', consent: true }, { idempotencyKey: 'same-referral' }), '/referrals/totem'],
];
for (const [endpoint, invoke, path] of committed) test(`${endpoint} preserves its one logical write and content-free current receipt`, async context => {
  const requests = [], expected = example(path);
  if (endpoint === 'leads.scheduleContact') expected.lead.id = 'lead_Current';
  const baseUrl = await serve(context, request => { requests.push(request); return { body: expected }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  assert.deepEqual(await invoke(client), expected); assert.equal(requests.length, 1);
  assert.equal(requests[0].method, 'POST'); assert.equal(requests[0].url, '/v1' + path);
  assert.match(requests[0].headers['idempotency-key'], /^same-/u);
  assert.equal(requests[0].headers['if-match'], endpoint === 'leads.scheduleContact' ? SOURCE : undefined);
});
test('an altered scheduled-contact receipt cannot silently adopt a different source lead', async context => {
  let requests = 0;
  const expected = example('/crm/scheduled-contact'); expected.lead.id = 'lead_Different';
  const baseUrl = await serve(context, () => { requests++; return { body: expected }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  await assert.rejects(client.leads.scheduleContact({ lead_id: 'lead_Current', contact_at: '2026-11-04T10:00:00Z', channel: 'call', customer_confirmed: true }, { idempotencyKey: 'same-reviewed-callback' }), TotemUnknownOutcomeError);
  assert.equal(requests, 1);
});
test('call start acceptance never means that the customer answered or that the call completed', async context => {
  let confirmed = false;
  const baseUrl = await serve(context, () => ({ body: operation('calls.start', { status: 'succeeded', result: confirmed
    ? { object: 'call_recording', call_id: 'call_Current' } : { object: 'call_start_receipt', status: 'accepted', call_id: null } }) }));
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  assert.deepEqual((await client.operations.get('op_Current')).result, { object: 'call_start_receipt', status: 'accepted', call_id: null });
  confirmed = true; await assert.rejects(client.operations.get('op_Current'), TotemProtocolError);
});


for (const [kind, resource, endpoint, invoke] of [
  ['call', 'call_Current', '/calls/call_Current/analysis', (client, body, options) => client.calls.updateAnalysis('call_Current', body, options)],
  ['meeting', 'bkg_Current', '/bookings/bkg_Current/analysis', (client, body, options) => client.bookings.updateAnalysis('bkg_Current', body, options)],
]) test(`${kind} analyzer method sends only the source-bound callback and preserves its original callback key`, async t => {
  const requests = [], receipt = { object: 'analysis_receipt', resource_kind: kind, summary_updated: true,
    custom_values_updated: false, finite_status: kind === 'call' ? 'deferred' : 'not_requested' };
  const baseUrl = await serve(t, request => {
    requests.push({ ...request, body: JSON.parse(request.body) }); return { body: receipt };
  });
  const client = new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 0 });
  const input = { summary: 'Fictional source summary' }, proof = `tsa2.${Buffer.from('{"version":2,"kind":"system_analysis"}').toString('base64url')}.${'a'.repeat(43)}`;
  assert.deepEqual(await invoke(client, input, { idempotencyKey: `analysis-${resource}`, writeContext: proof }), receipt);
  assert.equal(requests.length, 1); assert.equal(requests[0].method, 'PATCH'); assert.equal(requests[0].url, '/v1' + endpoint);
  assert.deepEqual(requests[0].body, input); assert.equal(requests[0].headers['x-totem-write-context'], proof);
  assert.equal(requests[0].headers['idempotency-key'], `analysis-${resource}`);
});


test('an uncertain analysis callback is surfaced without another paid request', async t => {
  let attempts = 0;
  const baseUrl = await serve(t, () => { attempts++; return { status: 503, body: problem(503, 'outcome_unknown') }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, maxRetries: 2 });
  await assert.rejects(client.calls.updateAnalysis('call_Current', { summary: 'Fictional summary' }, { idempotencyKey: 'original-analysis' }), error => error instanceof TotemApiError && error.code === 'outcome_unknown');
  assert.equal(attempts, 1);
});

for (const content of [{ kind: 'whatsapp_call', action: 'send_call_button', body_text: 'Call our fictional team', display_text: 'Call', ttl_minutes: 60 },
  { kind: 'whatsapp_call', action: 'request_permission' }]) test(`WhatsApp ${content.action} uses the same message route, credential and logical intent`, async context => {
  const requests = [];
  const baseUrl = await serve(context, request => { requests.push(request); return { status: 202, body: operation('messages.send') }; });
  const client = new TotemClient({ apiKey: KEY, baseUrl, team: 'team_Selected' });
  const body = { target: { kind: 'conversation', conversation_id: 'conv_Current' }, content };
  const result = await client.messages.send(body, { idempotencyKey: 'original-call-invitation' });
  assert.equal(result.status, 'queued'); assert.equal(result.result, null); assert.equal(requests.length, 1);
  assert.equal(requests[0].url, '/v1/messages/send'); assert.deepEqual(JSON.parse(requests[0].body), body);
  assert.equal(requests[0].headers.authorization, `Bearer ${KEY}`); assert.equal(requests[0].headers['idempotency-key'], 'original-call-invitation');
});

test('first-reply operation reads preserve suppression and prepared content without accepting malformed source context', async t => {
  const receipt = { object: 'first_reply_receipt', skip_ai_reply: true, prepared_reference: CONTENT,
    first_reply: { capability: 'first_reply_v1', status: 'prepared', sent_content: [], prepared_content: ['Fictitious configured greeting'] } };
  let response = operation('messages.prepareReply', { status: 'succeeded', result: receipt });
  const baseUrl = await serve(t, () => ({ body: response }));
  const client = new TotemClient({ apiKey: KEY, baseUrl });
  assert.deepEqual((await client.operations.get('op_Current')).result, receipt);
  response = { ...response, result: { ...receipt, first_reply: { ...receipt.first_reply, sent_content: ['x'.repeat(4_001)] } } };
  await assert.rejects(client.operations.get('op_Current'), TotemProtocolError);
  response = { ...response, result: { object: 'first_reply_receipt', skip_ai_reply: true, first_reply: null, prepared_reference: null } };
  assert.equal((await client.operations.get('op_Current')).result.first_reply, null);
});

test('current contact context preserves an explicit privacy null and rejects a missing source projection', async t => {
 let response = example('/crm/context');
 const baseUrl = await serve(t, () => ({ body: response }));
 const client = new TotemClient({ apiKey: KEY, baseUrl });
 assert.deepEqual((await client.crm.context()).source_contact, { phone: null });
 delete response.source_contact;
 await assert.rejects(client.crm.context(), TotemProtocolError);
});
