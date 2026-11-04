import { TotemProtocolError } from './errors.js'
import { Transport, type WireInput } from './transport.js'
import type {
  ActivityList, BodyOf, Booking, BookingList, Call, CallList, ClientOptions, Conversation, ConversationList, FeedPage, Health, ItemOf, ItemsOperationId,
  LeadDetail, LeadList, ListOperationId, Me, Notification, NotificationList, Operation, OperationId, OptionsOf, PublicOperationId, QueryOf, RequestArgs, ResponseInfo, ResponseOf, BoardList, TaskCreateBody, TaskId, Team,
} from './types.js'

/** Server-side client for the Totem API. Every method returns its documented response body; errors are `TotemError` subclasses. */
export class TotemClient {
  #transport: Transport
  constructor(options: ClientOptions) { this.#transport = new Transport(options) }

  /** Calls any operation by id, typed from the contract. */
  async request<Id extends OperationId>(operation: Id, ...args: RequestArgs<Id>): Promise<ResponseOf<Id>> {
    return (await this.requestWithResponse(operation, ...args)).data
  }
  /** Like `request`, with the HTTP status, request id and headers. */
  requestWithResponse<Id extends OperationId>(operation: Id, ...args: RequestArgs<Id>): Promise<ResponseInfo<ResponseOf<Id>>> {
    return this.#transport.send(operation, args[0] ?? {})
  }

  readonly me = {
    /** The integration this key belongs to. `GET /me` */
    get: (options: OptionsOf<'me.get'> = {}): Promise<Me> => this.request('me.get', options),
  }
  readonly teams = {
    /** Every team this key reads, restricted ones included. `GET /teams` */
    list: (options: OptionsOf<'teams.list'> = {}): Promise<ResponseOf<'teams.list'>> => this.request('teams.list', options),
    /** One team. `GET /teams/{id}` */
    get: (id: string, options: OptionsOf<'teams.get'> = {}): Promise<Team> => this.request('teams.get', { ...options, path: { id } }),
  }
  readonly boards = {
    /** A page of the team's boards with their stages. `GET /boards` */
    list: (query: QueryOf<'boards.list'> = {}, options: OptionsOf<'boards.list'> = {}): Promise<BoardList> => this.request('boards.list', { ...options, query }),
  }
  readonly members = {
    /** Every member of the team, never paged. `GET /members` */
    list: (options: OptionsOf<'members.list'> = {}): Promise<ResponseOf<'members.list'>> => this.request('members.list', options),
  }
  readonly bookingServices = {
    /** Discover current enabled service choices directly from source, without a captured inventory or a lead. */
    options: (body: BodyOf<'booking_services.options'> = {}, options: OptionsOf<'booking_services.options'> = {}): Promise<ResponseOf<'booking_services.options'>> => this.request('booking_services.options', { ...options, body }),
    /** Every bookable service of the team, never paged. `GET /booking_services` */
    list: (options: OptionsOf<'booking_services.list'> = {}): Promise<ResponseOf<'booking_services.list'>> => this.request('booking_services.list', options),
  }
  readonly knowledge = {
    /** Retrieve bounded team knowledge passages under the separate content grant. This POST is a retryable read. */
    search: (body: BodyOf<'knowledge.search'>, options: OptionsOf<'knowledge.search'> = {}): Promise<ResponseOf<'knowledge.search'>> => this.request('knowledge.search', { ...options, body }),
  }
  readonly crm = {
    /** Read the current source lead and explicitly requested content. This does not wait for an inventory capture. */
    context: (body: BodyOf<'crm.context'> = {}, options: OptionsOf<'crm.context'> = {}): Promise<ResponseOf<'crm.context'>> => this.request('crm.context', { ...options, body }),
  }
  readonly messages = {
    /** Prepare the configured first reply from the current saved inbound turn; poll the returned operation. */
    prepareReply: (body: BodyOf<'messages.prepareReply'> = {}, options: OptionsOf<'messages.prepareReply'> = {}): Promise<Operation> => this.request('messages.prepareReply', { ...options, body }),
    /** Current opaque configured sender references; provider account ids and credentials remain private. */
    channels: (options: OptionsOf<'messages.channels'> = {}): Promise<ResponseOf<'messages.channels'>> => this.request('messages.channels', { ...options, body: {} }),
    /** Queue staff-configured requested information for the authorized contact; the receipt never claims delivery. */
    requestInfo: (body: BodyOf<'messages.requestInfo'>, options: OptionsOf<'messages.requestInfo'> = {}): Promise<Operation> => this.request('messages.requestInfo', { ...options, body }),
    /** Accept one current-source message operation; prepared web chat output is distinct from provider acceptance. */
    send: (body: BodyOf<'messages.send'>, options: OptionsOf<'messages.send'> = {}): Promise<Operation> => this.request('messages.send', { ...options, body }),
  }
  readonly library = {
    /** Discover currently permitted retained Library entries under their independent content permission. */
    list: (body: BodyOf<'library.list'> = {}, options: OptionsOf<'library.list'> = {}): Promise<ResponseOf<'library.list'>> => this.request('library.list', { ...options, body }),
    /** Read the current reviewed entry using its opaque content reference. */
    get: (reference: string, options: OptionsOf<'library.get'> = {}): Promise<ResponseOf<'library.get'>> => this.request('library.get', { ...options, body: { reference } }),
    /** Read ordered persisted visitor messages after a delivery receipt reports prepared. No new message is created. */
    prepared: (reference: string, options: OptionsOf<'library.prepared'> = {}): Promise<ResponseOf<'library.prepared'>> => this.request('library.prepared', { ...options, body: { reference } }),
    /** Accept delivery of the reviewed entry revision through the canonical channel rules. */
    send: (body: BodyOf<'library.send'>, options: OptionsOf<'library.send'> = {}): Promise<Operation> => this.request('library.send', { ...options, body }),
  }
  readonly attachments = {
    /** Resolve one owned retained attachment under its separate permission; no arbitrary storage or provider URL is accepted. */
    resolve: (reference: string, options: OptionsOf<'attachments.resolve'> = {}): Promise<ResponseOf<'attachments.resolve'>> => this.request('attachments.resolve', { ...options, body: { reference } }),
  }
  readonly catalog = {
    /** Search current published variants and their actual linked scheduling availability. */
    search: (body: BodyOf<'catalog.search'> = {}, options: OptionsOf<'catalog.search'> = {}): Promise<ResponseOf<'catalog.search'>> => this.request('catalog.search', { ...options, body }),
    /** Accept the reviewed published catalog selection; this does not claim a booking. */
    send: (body: BodyOf<'catalog.send'>, options: OptionsOf<'catalog.send'> = {}): Promise<Operation> => this.request('catalog.send', { ...options, body }),
  }
  readonly assistants = {
    /** Discover currently published chat selections without exposing private prompts or authoring controls. */
    options: (options: OptionsOf<'assistants.options'> = {}): Promise<ResponseOf<'assistants.options'>> => this.request('assistants.options', { ...options, body: {} }),
    /** Accept a real API-origin turn. Completion metadata is separate from reply content and requires the same retained source. */
    run: (body: BodyOf<'assistants.run'>, options: OptionsOf<'assistants.run'> = {}): Promise<Operation> => this.request('assistants.run', { ...options, body }),
  }
  readonly quotes = {
    /** Attest an external quote and external delivery facts; Totem applies configured disposition without claiming independent verification. */
    recordOutcome: (body: BodyOf<'quotes.recordOutcome'>, options: OptionsOf<'quotes.recordOutcome'> = {}): Promise<Operation> => this.request('quotes.recordOutcome', { ...options, body }),
  }
  readonly referrals = {
    /** Submit a consented referral to the fixed Totem intake; the neutral acknowledgement reveals no destination identity. */
    create: (body: BodyOf<'referrals.create'>, options: OptionsOf<'referrals.create'> = {}): Promise<ResponseOf<'referrals.create'>> => this.request('referrals.create', { ...options, body }),
  }
  readonly leads = {
    /** Persist the approved contact promise through the canonical delayed-contact dispatcher; no delivery is claimed. */
    scheduleContact: (body: BodyOf<'leads.scheduleContact'>, options: OptionsOf<'leads.scheduleContact'> = {}): Promise<ResponseOf<'leads.scheduleContact'>> => this.request('leads.scheduleContact', { ...options, body }),
    /** Submit the qualified source to one configured family office; ambiguous identity remains subject to human review. */
    handoff: (body: BodyOf<'leads.handoff'>, options: OptionsOf<'leads.handoff'> = {}): Promise<ResponseOf<'leads.handoff'>> => this.request('leads.handoff', { ...options, body }),
    /** A page of the team's leads and clients; filter by at most one of `board`, `stage` and `status`. `GET /leads` */
    list: (query: QueryOf<'leads.list'> = {}, options: OptionsOf<'leads.list'> = {}): Promise<LeadList> => this.request('leads.list', { ...options, query }),
    /** One lead with its attribution and response facets. `GET /leads/{id}` */
    get: (id: string, options: OptionsOf<'leads.get'> = {}): Promise<LeadDetail> => this.request('leads.get', { ...options, path: { id } }),
    /** Leads matching exactly one `email` or `phone`, at most 10, never paged. `POST /leads/search` */
    search: (body: BodyOf<'leads.search'>, options: OptionsOf<'leads.search'> = {}): Promise<ResponseOf<'leads.search'>> => this.request('leads.search', { ...options, body }),
    /** A page of one lead's status, stage and assignee changes. `GET /leads/{id}/activities` */
    activities: (id: string, query: QueryOf<'leads.activities'> = {}, options: OptionsOf<'leads.activities'> = {}): Promise<ActivityList> => this.request('leads.activities', { ...options, path: { id }, query }),
    /** Import inert CRM data or request explicitly enabled inbound intake. Idempotency is stable across this call's retries. */
    upsert: (body: BodyOf<'leads.upsert'>, options: OptionsOf<'leads.upsert'> = {}): Promise<ResponseOf<'leads.upsert'>> => this.request('leads.upsert', { ...options, body }),
    /** Update allowlisted fields against the current strong lead ETag. */
    update: (id: string, body: BodyOf<'leads.update'>, options: OptionsOf<'leads.update'>): Promise<ResponseOf<'leads.update'>> => this.request('leads.update', { ...options, path: { id }, body }),
    /** Append a note; its receipt contains metadata only. */
    addNote: (id: string, body: BodyOf<'leads.addNote'>, options: OptionsOf<'leads.addNote'> = {}): Promise<ResponseOf<'leads.addNote'>> => this.request('leads.addNote', { ...options, path: { id }, body }),
    /** Archive a lead against its current strong ETag; never erase its data. */
    archive: (id: string, body: BodyOf<'leads.archive'>, options: OptionsOf<'leads.archive'>): Promise<ResponseOf<'leads.archive'>> => this.request('leads.archive', { ...options, path: { id }, body }),
    /** Read note bodies only with an explicit note-content grant. */
    notes: (id: string, query: QueryOf<'leads.notes'> = {}, options: OptionsOf<'leads.notes'> = {}): Promise<ResponseOf<'leads.notes'>> => this.request('leads.notes', { ...options, path: { id }, query }),
    /** Read exact-name custom values with their independent content grant. Use requestWithResponse to retain the separate ETag. */
    customValues: (id: string, options: OptionsOf<'leads.customValues'> = {}): Promise<ResponseOf<'leads.customValues'>> => this.request('leads.customValues', { ...options, path: { id } }),
    /** Set/remove exact custom-value names against the current custom-values ETag; the receipt contains no content. */
    updateCustomValues: (id: string, body: BodyOf<'leads.updateCustomValues'>, options: OptionsOf<'leads.updateCustomValues'>): Promise<ResponseOf<'leads.updateCustomValues'>> => this.request('leads.updateCustomValues', { ...options, path: { id }, body }),
    /** Update a note against its current strong note ETag; receipt has no body. */
    updateNote: (id: string, note: string, body: BodyOf<'leads.updateNote'>, options: OptionsOf<'leads.updateNote'>): Promise<ResponseOf<'leads.updateNote'>> => this.request('leads.updateNote', { ...options, path: { id, note }, body }),
    /** Delete this reviewed note. Source mode returns metadata; legacy inventory deletion may have no response body. */
    deleteNote: (id: string, note: string, options: OptionsOf<'leads.deleteNote'>): Promise<ResponseOf<'leads.deleteNote'>> => this.request('leads.deleteNote', { ...options, path: { id, note } }),
  }
  readonly calls = {
    /** Complete one source-bound system-analyzer dispatch; ordinary integrations and assistant tools cannot use this capability. */
    updateAnalysis: (id: string, body: BodyOf<'call.analysis.update'>, options: OptionsOf<'call.analysis.update'> = {}): Promise<ResponseOf<'call.analysis.update'>> => this.request('call.analysis.update', { ...options, path: { id }, body }),
    /** Read current published calling choices for this retained lead without dialling. */
    options: (body: BodyOf<'calls.options'>, options: OptionsOf<'calls.options'> = {}): Promise<ResponseOf<'calls.options'>> => this.request('calls.options', { ...options, body }),
    /** Accept one consented outgoing call intent using the reviewed opaque binding; provider acceptance is not an answered/completed call. */
    start: (body: BodyOf<'calls.start'>, options: OptionsOf<'calls.start'> = {}): Promise<Operation> => this.request('calls.start', { ...options, body }),
    /** Read bounded retained speech under its independent content permission. */
    transcript: (id: string, options: OptionsOf<'calls.transcript'> = {}): Promise<ResponseOf<'calls.transcript'>> => this.request('calls.transcript', { ...options, path: { id } }),
    /** Resolve the existing owned European recording under its separate content permission. */
    recording: (id: string, options: OptionsOf<'calls.recording'> = {}): Promise<ResponseOf<'calls.recording'>> => this.request('calls.recording', { ...options, path: { id } }),
    /** A page of the team's calls. `GET /calls` */
    list: (query: QueryOf<'calls.list'> = {}, options: OptionsOf<'calls.list'> = {}): Promise<CallList> => this.request('calls.list', { ...options, query }),
    /** One call. `GET /calls/{id}` */
    get: (id: string, options: OptionsOf<'calls.get'> = {}): Promise<Call> => this.request('calls.get', { ...options, path: { id } }),
  }
  readonly conversations = {
    /** A page of the team's conversations. `GET /conversations` */
    list: (query: QueryOf<'conversations.list'> = {}, options: OptionsOf<'conversations.list'> = {}): Promise<ConversationList> => this.request('conversations.list', { ...options, query }),
    /** One conversation. `GET /conversations/{id}` */
    get: (id: string, options: OptionsOf<'conversations.get'> = {}): Promise<Conversation> => this.request('conversations.get', { ...options, path: { id } }),
    /** Current bounded message bodies require messages:content:read or the hosted messages processing grant. */
    messages: (body: BodyOf<'conversations.messages'> = {}, options: OptionsOf<'conversations.messages'> = {}): Promise<ResponseOf<'conversations.messages'>> => this.request('conversations.messages', { ...options, body }),
  }
  readonly bookings = {
    /** Complete one source-bound meeting-analyzer dispatch; this only updates its eligible summary and sentiment. */
    updateAnalysis: (id: string, body: BodyOf<'meeting.analysis.update'>, options: OptionsOf<'meeting.analysis.update'> = {}): Promise<ResponseOf<'meeting.analysis.update'>> => this.request('meeting.analysis.update', { ...options, path: { id }, body }),
    /** A page of the team's bookings. `GET /bookings` */
    list: (query: QueryOf<'bookings.list'> = {}, options: OptionsOf<'bookings.list'> = {}): Promise<BookingList> => this.request('bookings.list', { ...options, query }),
    /** One booking. `GET /bookings/{id}` */
    get: (id: string, options: OptionsOf<'bookings.get'> = {}): Promise<Booking> => this.request('bookings.get', { ...options, path: { id } }),
    /** Read current service choices and bounded opaque offers; this read never reserves capacity. */
    availability: (body: BodyOf<'bookings.availability'>, options: OptionsOf<'bookings.availability'> = {}): Promise<ResponseOf<'bookings.availability'>> => this.request('bookings.availability', { ...options, body }),
    /** Read the actual management view and its bka_ action ETag for cancellation or rescheduling. */
    inspect: (id: string, options: OptionsOf<'bookings.inspect'> = {}): Promise<ResponseOf<'bookings.inspect'>> => this.request('bookings.inspect', { ...options, path: { id } }),
    /** Current manageable bookings of the exact authorized lead; completeness is explicit. */
    forLead: (body: BodyOf<'bookings.forLead'>, options: OptionsOf<'bookings.forLead'> = {}): Promise<ResponseOf<'bookings.forLead'>> => this.request('bookings.forLead', { ...options, body }),
    /** Accept booking of one reviewed offer; payment-required results are not confirmed bookings. */
    create: (body: BodyOf<'bookings.create'>, options: OptionsOf<'bookings.create'> = {}): Promise<Operation> => this.request('bookings.create', { ...options, body }),
    /** Accept cancellation using the reviewed management ETag and a stable logical idempotency key. */
    cancel: (id: string, options: OptionsOf<'bookings.cancel'>): Promise<Operation> => this.request('bookings.cancel', { ...options, path: { id }, body: {} }),
    /** Accept a move using the same source management ETag; never retry an uncertain business outcome with a new key. */
    reschedule: (id: string, body: BodyOf<'bookings.reschedule'>, options: OptionsOf<'bookings.reschedule'>): Promise<Operation> => this.request('bookings.reschedule', { ...options, path: { id }, body }),
  }
  readonly bookingPayments = {
    /** Read the exact lead's current merchant-verified payment requests and active checkout generation. */
    get: (body: BodyOf<'bookingPayments.get'>, options: OptionsOf<'bookingPayments.get'> = {}): Promise<ResponseOf<'bookingPayments.get'>> => this.request('bookingPayments.get', { ...options, body }),
    /** Accept a confirmed transactional link send. This does not confirm payment or a booking. */
    sendLink: (body: BodyOf<'bookingPayments.sendLink'>, options: OptionsOf<'bookingPayments.sendLink'> = {}): Promise<Operation> => this.request('bookingPayments.sendLink', { ...options, body }),
  }
  readonly notifications = {
    /** Accept an ordinary team notification. Reconcile its operation before repeating an uncertain effect. */
    create: (body: BodyOf<'notifications.create'>, options: OptionsOf<'notifications.create'> = {}): Promise<Operation> => this.request('notifications.create', { ...options, body }),
    /** A page of the team's notifications; filter by at most one of `lead` and `status`. `GET /notifications` */
    list: (query: QueryOf<'notifications.list'> = {}, options: OptionsOf<'notifications.list'> = {}): Promise<NotificationList> => this.request('notifications.list', { ...options, query }),
    /** One notification. `GET /notifications/{id}` */
    get: (id: string, options: OptionsOf<'notifications.get'> = {}): Promise<Notification> => this.request('notifications.get', { ...options, path: { id } }),
  }
  readonly tasks = {
    /** Accept a task request. Follow the returned operation id for its result; keep the idempotency key across application retries. */
    create: (body: TaskCreateBody, options: OptionsOf<'tasks.create'> = {}): Promise<Operation> => this.request('tasks.create', { ...options, body }),
    /** Accept completion of this task in the selected team. The operation result carries its final task receipt. */
    complete: (id: TaskId, options: OptionsOf<'tasks.complete'> = {}): Promise<Operation> => this.request('tasks.complete', { ...options, path: { id }, body: {} }),
  }
  readonly operations = {
    /** Read this integration's operation in the selected team, under its current original authority. */
    get: (id: PublicOperationId, options: OptionsOf<'operations.get'> = {}): Promise<Operation> => this.request('operations.get', { ...options, path: { id } }),
    /** Request cancellation before the effect begins. A running effect may already have happened; this call is never automatically retried. */
    cancel: (id: PublicOperationId, options: OptionsOf<'operations.cancel'> = {}): Promise<Operation> => this.request('operations.cancel', { ...options, path: { id }, body: {} }),
  }
  readonly sync = {
    /** The next page of one team's changes feed. Save its `next_cursor` after applying it, even when the page is empty. `GET /sync/changes` */
    changes: (query: QueryOf<'sync.changes'> = {}, options: OptionsOf<'sync.changes'> = {}): Promise<FeedPage> => this.request('sync.changes', { ...options, query }),
  }
  readonly events = {
    /** Read integration-owned lifecycle events with the same durable cursor; accepted starts are separate from actual completion. */
    list: (query: QueryOf<'events.list'> = {}, options: OptionsOf<'events.list'> = {}): Promise<ResponseOf<'events.list'>> => this.request('events.list', { ...options, query }),
  }
  /** Whether the API is up; needs no key. `GET /health` */
  health(options: OptionsOf<'health'> = {}): Promise<Health> { return this.request('health', options) }

  /**
   * Yields each page until `has_more` is false. On `sync.changes` it stops
   * once caught up; persist each page's `next_cursor` yourself. `timeoutMs`
   * applies to each page; pass `signal: AbortSignal.timeout(ms)` to bound the
   * whole traversal. A missing or repeated cursor raises TotemProtocolError.
   */
  async *pages<Id extends ListOperationId>(operation: Id, ...args: RequestArgs<Id>): AsyncGenerator<ResponseOf<Id>> {
    const input: WireInput = { ...args[0] }
    const seen = new Set<string>()
    if (input.query && typeof input.query.cursor === 'string') seen.add(input.query.cursor)
    for (;;) {
      const response = await this.#transport.send<ResponseOf<Id>>(operation, input)
      const page = response.data as { data: unknown[]; has_more: boolean; next_cursor: string | null }
      if (!page || !Array.isArray(page.data) || typeof page.has_more !== 'boolean') throw new TotemProtocolError('Expected a Totem list page', response.requestId)
      if (page.has_more && (typeof page.next_cursor !== 'string' || !page.next_cursor || seen.has(page.next_cursor))) throw new TotemProtocolError('Pagination returned a missing or repeated cursor', response.requestId)
      yield response.data
      if (!page.has_more) return
      seen.add(page.next_cursor!)
      input.query = { ...input.query, cursor: page.next_cursor }
    }
  }
  /**
   * Yields each item of every page. Not offered for `sync.changes`, which
   * must be consumed with `pages()` so each cursor can be saved with its
   * changes. `timeoutMs` applies to each page, as in `pages()`.
   */
  async *items<Id extends ItemsOperationId>(operation: Id, ...args: RequestArgs<Id>): AsyncGenerator<ItemOf<Id>> {
    for await (const page of this.pages(operation, ...args)) {
      for (const item of (page as unknown as { data: ItemOf<Id>[] }).data) yield item
    }
  }
}
