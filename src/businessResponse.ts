/** Current-source receipt/read identity guards. Unknown additive properties and future string enums remain compatible. */
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const string = (value: unknown, max: number, min = 0): value is string => typeof value === 'string' && value.length >= min && value.length <= max
const integer = (value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value >= min && value <= max
const opaque = (value: unknown, prefix: string) => string(value, 256, 1) && new RegExp(`^${prefix}_[A-Za-z0-9]+$`, 'u').test(value)
const reference = (value: unknown, prefix: 'tcal1' | 'tcnt1' | 'tcall1' | 'tast1') => string(value, 16_384, 40) && new RegExp(`^${prefix}\\.[A-Za-z0-9_-]+$`, 'u').test(value)
const etag = (value: unknown, prefix: 'lrs1' | 'lns1' | 'bka') => typeof value === 'string' && new RegExp(`^"${prefix}_[a-f0-9]{64}"$`, 'u').test(value)
const instant = (value: unknown) => string(value, 40, 20) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/u.test(value) && Number.isFinite(Date.parse(value))
const list = (value: unknown, maximum: number, check: (value: unknown) => boolean) => Array.isArray(value) && value.length <= maximum && value.every(check)
export interface BusinessRequestIdentity { path?: Record<string, string> | undefined; body?: unknown; query?: Record<string, unknown> | undefined; ifMatch?: string | undefined }
const sourceWrites = new Set(['leads.upsert', 'leads.update', 'leads.archive', 'leads.addNote', 'leads.updateNote', 'leads.deleteNote'])
const sourceBusinessWrites = new Set(['leads.scheduleContact', 'leads.handoff', 'referrals.create', 'call.analysis.update', 'meeting.analysis.update'])
export function requiresSourceReceipt(operation: string, input: BusinessRequestIdentity): boolean {
  return sourceBusinessWrites.has(operation) || sourceWrites.has(operation) && (record(input.body) && input.body.response_view === 'source'
    || input.query?.view === 'source' || etag(input.ifMatch, 'lrs1') || etag(input.ifMatch, 'lns1'))
}
function sourceMutation(value: Record<string, unknown>, input: BusinessRequestIdentity): boolean {
  if (value.object === 'lead_source_mutation') return typeof value.created === 'boolean' && typeof value.changed === 'boolean'
    && (value.registered_lead_linked === undefined || typeof value.registered_lead_linked === 'boolean')
    && (value.lead === null || record(value.lead) && value.lead.object === 'lead_source_receipt' && opaque(value.lead.id, 'lead')
      && (!input.path?.id || value.lead.id === input.path.id) && etag(value.lead.etag, 'lrs1') && instant(value.lead.updated_at))
  if (value.object !== 'lead_note_source_mutation' || typeof value.created !== 'boolean' || typeof value.deleted !== 'boolean' || !record(value.note)
    || !opaque(value.note.id, 'note') || value.note.lead !== input.path?.id || input.path?.note && value.note.id !== input.path.note) return false
  return value.deleted ? value.note.object === 'lead_note_source_deletion'
    : value.note.object === 'lead_note_source_receipt' && etag(value.note.etag, 'lns1') && instant(value.note.updated_at)
}
function entry(value: unknown): boolean {
  return record(value) && value.object === 'library_entry' && reference(value.reference, 'tcnt1') && string(value.name, 2_000)
    && string(value.description, 20_000) && string(value.type, 100, 1) && integer(value.revision) && integer(value.part_count)
    && integer(value.file_count) && string(value.preview, 1_200) && (value.language === null || string(value.language, 100))
    && (value.parts === undefined || list(value.parts, 25, record))
}
/** Read responses need their public identity, retained references and stated bounds, never a closed additional-properties ban. */
export function matchesBusinessResponse(value: unknown, operation: string, input: BusinessRequestIdentity): boolean {
  if (sourceWrites.has(operation) && (requiresSourceReceipt(operation, input) || record(value) && ['lead_source_mutation', 'lead_note_source_mutation'].includes(String(value.object)))) {
    if (record(value) && value.object === 'lead_validation' && value.valid === true) return true
    return record(value) && sourceMutation(value, input)
  }
  if (operation === 'leads.notes' && input.query?.view === 'source') return record(value) && value.object === 'list'
    && typeof value.has_more === 'boolean' && (value.next_cursor === null || typeof value.next_cursor === 'string')
    && list(value.data, 100, row => record(row) && row.object === 'lead_note_source' && opaque(row.id, 'note')
      && row.lead === input.path?.id && etag(row.etag, 'lns1') && instant(row.updated_at))
  switch (operation) {
    case 'call.analysis.update': case 'meeting.analysis.update': return record(value) && value.object === 'analysis_receipt'
      && value.resource_kind === (operation === 'call.analysis.update' ? 'call' : 'meeting') && typeof value.summary_updated === 'boolean'
      && typeof value.custom_values_updated === 'boolean' && string(value.finite_status, 100, 1)
      && (operation !== 'meeting.analysis.update' || value.custom_values_updated === false)
    case 'booking_services.options': return record(value) && value.object === 'booking_service_options'
      && string(value.timezone, 128, 1) && typeof value.complete === 'boolean' && (value.next_cursor === null || reference(value.next_cursor, 'tcnt1'))
      && list(value.data, 50, service => record(service) && opaque(service.service_id, 'svc') && string(service.name, 500)
        && string(service.when_to_use, 8_000) && string(service.meeting_type, 100, 1) && integer(service.duration_minutes, 1)
        && integer(service.min_notice_minutes) && integer(service.horizon_days, 1)
        && list(service.options, 50, option => record(option) && string(option.label, 500) && integer(option.duration_minutes, 1)
          && string(option.when_to_use, 8_000) && record(option.payment) && string(option.payment.mode, 100, 1)
          && (option.payment.amount_minor === null || integer(option.payment.amount_minor, 1))
          && (option.payment.currency === null || string(option.payment.currency, 3))
          && (option.payment.basis === null || string(option.payment.basis, 100, 1)))
        && list(service.booking_pages, 50, page => record(page) && string(page.title, 500) && (page.url === null || string(page.url, 2_048, 1))))

    case 'assistants.options': return record(value) && value.object === 'assistant_options' && typeof value.complete === 'boolean'
      && list(value.data, 50, row => record(row) && reference(row.reference, 'tast1') && string(row.name, 200, 1) && integer(row.version, 1))
    case 'leads.scheduleContact': return record(value) && value.object === 'scheduled_contact_receipt' && record(value.lead)
      && value.lead.object === 'lead_source_receipt' && opaque(value.lead.id, 'lead') && etag(value.lead.etag, 'lrs1') && instant(value.lead.updated_at)
      && (!record(input.body) || input.body.lead_id === undefined || value.lead.id === input.body.lead_id)
      && instant(value.contact_at) && string(value.channel, 100, 1) && typeof value.created === 'boolean'
    case 'leads.handoff': return record(value) && value.object === 'family_handoff_receipt' && string(value.status, 100, 1)
      && string(value.office, 128, 1) && typeof value.moved_source === 'boolean' && typeof value.notification_queued === 'boolean'
    case 'referrals.create': return record(value) && value.object === 'referral_receipt' && string(value.status, 100, 1)
    case 'calls.options': return record(value) && value.object === 'call_binding_options' && typeof value.complete === 'boolean'
      && list(value.data, 100, row => record(row) && row.object === 'call_binding' && reference(row.reference, 'tcall1')
        && string(row.assistant_name, 300, 1) && string(row.line_label, 300, 1) && string(row.line_number, 64, 1) && string(row.channel, 100, 1))
    case 'calls.transcript': return record(value) && value.object === 'call_transcript' && value.call_id === input.path?.id
      && opaque(value.call_id, 'call') && string(value.text, 200_000) && typeof value.complete === 'boolean'
    case 'calls.recording': return record(value) && value.object === 'call_recording' && value.call_id === input.path?.id
      && opaque(value.call_id, 'call') && string(value.url, 8_192, 1) && instant(value.expires_at)
      && (value.content_type === null || string(value.content_type, 255, 1)) && (value.size === null || integer(value.size))
    case 'crm.context': return record(value) && value.object === 'crm_context' && record(value.team) && opaque(value.team.id, 'team')
      && (value.lead === null || record(value.lead) && value.lead.object === 'lead_source' && opaque(value.lead.id, 'lead') && etag(value.lead.etag, 'lrs1'))
      && record(value.source_contact) && (value.source_contact.phone === null || string(value.source_contact.phone, 80, 1))
      && record(value.coverage)
    case 'messages.channels': return record(value) && value.object === 'message_channels' && list(value.channels, 100, row => record(row)
      && typeof row.reference === 'string' && /^mch1_[a-f0-9]{64}$/u.test(row.reference) && string(row.channel_type, 100, 1) && string(row.name, 300, 1))
    case 'conversations.messages': return record(value) && value.object === 'conversation_messages' && typeof value.truncated === 'boolean'
      && list(value.messages, 50, row => record(row) && typeof row.reference === 'string' && /^mmb1_[a-f0-9]{64}$/u.test(row.reference)
        && string(row.direction, 100, 1) && instant(row.at) && string(row.content_type, 100, 1) && string(row.text, 8_000)
        && typeof row.text_truncated === 'boolean' && typeof row.has_attachment === 'boolean' && typeof row.imported === 'boolean'
        && (row.delivery_status === null || string(row.delivery_status, 100, 1)))
    case 'bookings.availability': return record(value) && value.object === 'booking_availability' && opaque(value.service_id, 'svc')
      && string(value.timezone, 100, 1) && instant(value.expires_at) && list(value.options, 50, row => record(row) && reference(row.id, 'tcal1') && integer(row.duration_minutes, 1, 1_440))
      && list(value.slots, 20, row => record(row) && reference(row.offer, 'tcal1') && instant(row.starts_at) && instant(row.ends_at))
    case 'bookings.inspect': return record(value) && value.object === 'booking_management' && value.id === input.path?.id && etag(value.etag, 'bka')
    case 'bookings.forLead': return record(value) && value.object === 'booking_management_list' && typeof value.complete === 'boolean'
      && list(value.data, 20, row => record(row) && row.object === 'booking_management' && opaque(row.id, 'bkg') && etag(row.etag, 'bka'))
    case 'bookingPayments.get': return record(value) && value.object === 'booking_payment_list' && typeof value.complete === 'boolean'
      && list(value.payments, 5, row => record(row) && row.object === 'booking_payment' && reference(row.reference, 'tcal1') && integer(row.amount_minor)
        && typeof row.currency === 'string' && /^[A-Z]{3}$/u.test(row.currency) && string(row.status, 100, 1))
    case 'library.list': return record(value) && value.object === 'library_entry_list' && list(value.data, 50, entry)
      && (value.next_cursor === null || reference(value.next_cursor, 'tcnt1')) && string(value.coverage, 100, 1)
      && (value.total === null || integer(value.total)) && integer(value.matched_in_page)
    case 'library.get': return entry(value)
    case 'library.prepared': return record(value) && value.object === 'library_prepared_response' && value.version === 1
      && list(value.messages, 25, row => record(row) && string(row.id, 300, 1) && row.role === 'assistant' && string(row.kind, 100, 1) && instant(row.timestamp)
        && (row.content === undefined || string(row.content, 100_000)) && (row.media === undefined || record(row.media)
          && reference(row.media.attachment_reference, 'tcnt1') && string(row.media.mime_type, 200, 1)
          && (row.media.file_name === null || string(row.media.file_name, 2_000)) && (row.media.file_size === null || integer(row.media.file_size))))
    case 'attachments.resolve': return record(value) && value.object === 'attachment' && string(value.url, 8_192, 1)
      && string(value.mime_type, 200, 1) && (value.file_name === null || string(value.file_name, 2_000)) && (value.file_size === null || integer(value.file_size))
    case 'catalog.search': return record(value) && value.object === 'catalog_result_list' && typeof value.complete === 'boolean' && list(value.data, 100,
      row => record(row) && reference(row.catalog, 'tcnt1') && reference(row.variant, 'tcnt1') && reference(row.product, 'tcnt1') && integer(row.revision)
        && string(row.title, 2_000) && record(row.price) && record(row.booking))
    default: return true
  }
}
