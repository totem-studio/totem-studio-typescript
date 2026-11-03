/** Narrow durable-operation identity guard; additive fields and future string enums remain compatible. */
const writes = new Set(['tasks.create', 'tasks.complete', 'notifications.create'])
const selectors = new Set(['operations.get', 'operations.cancel'])
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const token = (value: unknown): value is string => typeof value === 'string' && value.length > 0 && value.length <= 120
  && value.trim() === value && !/[\u0000-\u001f\u007f-\u009f\u2028\u2029]/u.test(value)
const opaque = (value: unknown, prefix: string) => typeof value === 'string' && value.length <= 256 && new RegExp(`^${prefix}_[A-Za-z0-9]+$`, 'u').test(value)
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
    } else if (value.endpoint === 'tasks.create' || value.endpoint === 'tasks.complete') {
      if (value.result.object !== 'task_receipt' || !opaque(value.result.id, 'task') || !token(value.result.status)
        || operationId === 'tasks.complete' && value.result.id !== path?.id) return false
    }
  }
  if (value.error !== null && (!record(value.error) || !token(value.error.code))) return false
  if (value.result !== null && value.error !== null) return false
  if (['queued', 'running', 'cancelled'].includes(value.status)) return value.result === null && value.error === null
  if (['failed', 'outcome_unknown'].includes(value.status)) return value.result === null && value.error !== null
  // A succeeded operation can retain no receipt after a current privacy withdrawal.
  return value.status !== 'succeeded' || value.error === null
}
