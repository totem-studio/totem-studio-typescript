/** Narrow durable-operation identity guard; additive fields and future string enums remain compatible. */
import { operationDefinitions } from './generated/operations.js'
const writes = new Set(Object.entries(operationDefinitions).filter(([, definition]) => definition.effect === 'write'
  && definition.successResponses.some(response => response.status === 202)).map(([id]) => id))
const selectors = new Set(['operations.get', 'operations.cancel'])
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const token = (value: unknown): value is string => typeof value === 'string' && value.length > 0 && value.length <= 120
  && value.trim() === value && !/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/u.test(value)
const opaque = (value: unknown, prefix: string) => typeof value === 'string' && value.length <= 256 && new RegExp(`^${prefix}_[A-Za-z0-9]+$`, 'u').test(value)
const reference = (value: unknown, prefix: 'tcal1' | 'tcnt1') => typeof value === 'string' && value.length >= 40 && value.length <= 16_384
  && new RegExp(`^${prefix}\\.[A-Za-z0-9_-]+$`, 'u').test(value)
const count = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
const timestamp = (value: unknown): boolean => {
  if (typeof value !== 'string' || value.length > 40 || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/u.test(value)) return false
  const ms = Date.parse(value)
  return Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 19) === value.slice(0, 19)
}

export function isDurableOperationWrite(operationId: string): boolean { return writes.has(operationId) }

/** Reads/cancel bind the selector too, without treating their failure as another business effect. */
export function matchesOperationReceipt(value: unknown, operationId: string, path: Record<string, string> | undefined): boolean {
  if (!writes.has(operationId) && !selectors.has(operationId)) return true
  if (!record(value) || value.object !== 'operation' || !opaque(value.id, 'op') || !token(value.status)
    || !token(value.endpoint) || !timestamp(value.created_at) || !timestamp(value.updated_at)
    || !Object.hasOwn(value, 'result') || !Object.hasOwn(value, 'error')
    || writes.has(operationId) && value.endpoint !== operationId
    || selectors.has(operationId) && value.id !== path?.id) return false
  if (value.result !== null) {
    if (!record(value.result)) return false
    if (value.endpoint === 'notifications.create') {
      if (value.result.object !== 'notification_receipt' || !opaque(value.result.id, 'ntf') || !token(value.result.status)) return false
      if (value.result.handoff !== undefined && (!record(value.result.handoff) || value.result.handoff.reason !== 'missed_team_appointment'
        || !token(value.result.handoff.incident))) return false
    } else if (value.endpoint === 'tasks.create' || value.endpoint === 'tasks.complete') {
      if (value.result.object !== 'task_receipt' || !opaque(value.result.id, 'task') || !token(value.result.status)
        || operationId === 'tasks.complete' && value.result.id !== path?.id) return false
    } else if (['bookings.create', 'bookings.cancel', 'bookings.reschedule', 'bookingPayments.sendLink'].includes(String(value.endpoint))) {
      if (value.result.object === 'booking_payment_receipt') {
        if (!['bookings.create', 'bookingPayments.sendLink'].includes(String(value.endpoint)) || !reference(value.result.reference, 'tcal1')
          || !token(value.result.outcome) || value.result.booking_confirmed !== false) return false
      } else if (value.endpoint === 'bookingPayments.sendLink' || value.result.object !== 'booking_receipt' || !opaque(value.result.id, 'bkg') || !token(value.result.status)
        || !(value.result.previous_id === null || opaque(value.result.previous_id, 'bkg'))
        || operationId === 'bookings.cancel' && value.result.id !== path?.id
        || operationId === 'bookings.reschedule' && (value.result.previous_id ?? value.result.id) !== path?.id) return false
    } else if (value.endpoint === 'quotes.recordOutcome') {
      if (value.result.object !== 'quote_outcome_receipt' || !token(value.result.status) || value.result.delivery_evidence !== 'caller_attested') return false
    } else if (value.endpoint === 'assistants.run') {
      if (value.result.object !== 'assistant_run_receipt' || !token(value.result.status) || !opaque(value.result.conversation_id, 'conv')) return false
    } else if (value.endpoint === 'calls.start') {
      if (value.result.object !== 'call_start_receipt' || !token(value.result.status)
        || !(value.result.call_id === null || opaque(value.result.call_id, 'call'))) return false
    } else if (value.endpoint === 'messages.prepareReply') {
      const result = value.result, first = result.first_reply
      const texts = (input: unknown) => Array.isArray(input) && input.length <= 20 && input.every(text => typeof text === 'string' && text.length <= 4_000)
      if (result.object !== 'first_reply_receipt' || typeof result.skip_ai_reply !== 'boolean'
        || !(result.prepared_reference === null || reference(result.prepared_reference, 'tcnt1'))
        || !(first === null || record(first) && first.capability === 'first_reply_v1' && token(first.status) && first.status.length <= 40
          && texts(first.sent_content) && (first.prepared_content === undefined || texts(first.prepared_content))
          && (first.reason === undefined || typeof first.reason === 'string' && first.reason.length <= 100)
          && (first.language === undefined || typeof first.language === 'string' && first.language.length <= 10)
          && (first.last_delivered_question === undefined || typeof first.last_delivered_question === 'string' && first.last_delivered_question.length <= 1_000))) return false
    } else if (value.endpoint === 'messages.requestInfo') {
      if (value.result.object !== 'requested_info_receipt' || !token(value.result.status) || !token(value.result.channel)
        || value.result.delivery_confirmed !== false || typeof value.result.includes_requested_detail !== 'boolean' || value.result.eta_minutes !== 5) return false
    } else if (value.endpoint === 'messages.send' && value.result.object === 'message_receipt') {
      if (!token(value.result.status) || !opaque(value.result.conversation_id, 'conv')) return false
    } else if (value.endpoint === 'library.send' || value.endpoint === 'messages.send' && value.result.object === 'library_delivery_receipt') {
      if (value.result.object !== 'library_delivery_receipt' || !token(value.result.status) || !token(value.result.reason)
        || !count(value.result.sent_parts) || !count(value.result.total_parts) || value.result.sent_parts > value.result.total_parts
        || typeof value.result.prepared !== 'boolean'
        || !(value.result.prepared_reference === null || reference(value.result.prepared_reference, 'tcnt1'))
        || value.result.prepared && value.result.prepared_reference === null) return false
    } else if (value.endpoint === 'messages.send') {
      return false
    } else if (value.endpoint === 'catalog.send') {
      if (value.result.object !== 'catalog_send_receipt' || !token(value.result.sent_as) || !count(value.result.variant_count)
        || value.result.variant_count < 1 || value.result.variant_count > 30) return false
    } else if (!token(value.result.object)) return false
  }
  if (value.error !== null && (!record(value.error) || !token(value.error.code))) return false
  if (value.result !== null && value.error !== null) return false
  if (['queued', 'running', 'cancelled'].includes(value.status)) return value.result === null && value.error === null
  if (['failed', 'outcome_unknown'].includes(value.status)) return value.result === null && value.error !== null
  // A succeeded operation can retain no receipt after a current privacy withdrawal.
  return value.status !== 'succeeded' || value.error === null
}
