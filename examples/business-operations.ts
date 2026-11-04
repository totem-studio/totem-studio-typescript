import { TotemClient, type PublicOperationId } from '../src/index.js'

/** Review the actual source and preserve its validator and logical intent across retries. */
export async function updateSourceContact(client: TotemClient, lead: string, name: string, intent: string) {
  const context = await client.crm.context({ lead_id: lead })
  if (!context.lead) throw new Error('The authorized source has no linked lead')
  return client.leads.update(context.lead.id, { name }, {
    ifMatch: context.lead.etag,
    idempotencyKey: intent,
  })
}

/** Call only after reviewing this exact current Library revision for the recipient. */
export function startReviewedDelivery(client: TotemClient, reference: string, revision: number, conversation: string, intent: string) {
  return client.library.send({ reference, expected_revision: revision, conversation_id: conversation }, { idempotencyKey: intent })
}

/** Inspect once. Queueing and preparing visitor output do not imply provider delivery. */
export async function inspectVisitorOutput(client: TotemClient, operationId: PublicOperationId) {
  const operation = await client.operations.get(operationId)
  const receipt = operation.result
  if (receipt?.object !== 'library_delivery_receipt' || !receipt.prepared || !receipt.prepared_reference) return { operation }
  const prepared = await client.library.prepared(receipt.prepared_reference)
  const attachments = new Map<string, Awaited<ReturnType<typeof client.attachments.resolve>>>()
  for (const message of prepared.messages) {
    if (!message.media || attachments.has(message.media.attachment_reference)) continue
    // These are separately authorized owned references, never caller-supplied URLs.
    attachments.set(message.media.attachment_reference, await client.attachments.resolve(message.media.attachment_reference))
  }
  return { operation, prepared, attachments }
}

/** Apply and deduplicate event IDs before saving this integration/team's next cursor. */
export async function applyEventPage(client: TotemClient, cursor: string | undefined,
  applyOnce: (event: Awaited<ReturnType<typeof client.events.list>>['data'][number]) => Promise<void>,
  saveCursor: (next: string) => Promise<void>) {
  const page = await client.events.list({ cursor, limit: 25 })
  for (const event of page.data) await applyOnce(event)
  await saveCursor(page.next_cursor)
  return page.has_more
}

/** Staff configuration chooses the channel/template. This starts queue admission, not provider delivery. */
export function queueRequestedInformation(client: TotemClient, lead: string, info: string, intent: string) {
  return client.messages.requestInfo({ lead_id: lead, info }, { idempotencyKey: intent })
}

/** This sends an invitation message; it does not start or confirm a call. */
export function inviteWhatsAppCall(client: TotemClient, conversation: string, intent: string) {
  return client.messages.send({ target: { kind: 'conversation', conversation_id: conversation },
    content: { kind: 'whatsapp_call', action: 'send_call_button', body_text: 'You can call our team here.', display_text: 'Call', ttl_minutes: 60 } }, { idempotencyKey: intent })
}
