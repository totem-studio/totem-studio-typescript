import { TotemClient } from '../src/index.js'

/** Inert CRM import: call only with an explicitly authorized CRM-write key. */
export async function importContact(apiKey: string, team: string, email: string, externalId: string) {
  const client = new TotemClient({ apiKey, team })
  const imported = await client.requestWithResponse('leads.upsert', {
    body: { origin: 'import', email, external_id: externalId },
    // Persist this key with your source event so restarts reuse the logical write.
    idempotencyKey: `contact-import-${externalId}`,
  })
  if (imported.data.object !== 'lead_mutation') throw new Error('Expected a persisted import result')
  const id = imported.data.lead.id
  const ifMatch = imported.headers.get('ETag')
  if (!ifMatch) throw new Error('The API did not provide the required lead ETag')
  await client.leads.update(id, { tags: ['CRM import'] }, { ifMatch })
  const receipt = await client.leads.addNote(id, { body: 'Imported from the connected CRM.', external_id: externalId })
  // The receipt exposes metadata only. Reading the body needs the explicit notes grant.
  return { lead: id, note: receipt.note.id }
}

/** Notes are separately granted content. Their validators are independent of the parent lead. */
export async function reviseNote(client: TotemClient, lead: string, noteId: string, body: string) {
  for await (const note of client.items('leads.notes', { path: { id: lead } })) {
    if (note.id !== noteId) continue
    // This documented strong validator is bound to the opaque note id and version.
    return client.leads.updateNote(lead, note.id, { body }, { ifMatch: `"${note.id}:${note.version}"` })
  }
  throw new Error('Note not found')
}
