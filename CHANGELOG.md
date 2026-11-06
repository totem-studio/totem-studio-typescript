# Changelog

The SDK follows the Totem API contract. Each entry lists what changed and
what to adapt.

## 1.1.0 (2026-11-06)

- `leads.upsert` accepts `initial_custom_values` for ordinary integrations to set
  1–50 distinct exact-name values on new leads before inbound intake. Existing
  and revived leads ignore them; supplying the field also requires current
  `crm:custom_values:write`. Hosted source/model requests cannot supply it,
  provenance remains server-owned, and existing-value edits keep their own CAS.
- `leads.upsert` accepts an optional `note` of up to 5,000 characters. The server
  appends it atomically to a new or authorized existing lead; blank text adds no
  note, and replaying the same idempotent intent does not append again.
- The lead mutation receipt remains metadata only. Reading note content still
  requires its separate grant; the same 70 operation ids and key permissions
  remain in place.

## 1.0.0 (2026-11-05)

- The SDK version and documented package, Git tag and download paths use
  `1.0.0` for the stable API v1 contract.
- Generated from the stable API v1 metadata and the same 70 operation ids.
  `bookings.availability` accepts optional `additional_services` for one joint
  Koibox visit; choose the returned combined offer rather than inferring an
  overlap from independent service times.
- Permissions and existing key grants are unchanged. The version change
  grants no additional access.

## 1.0.0-rc.1 (candidate, 2026-11-04)

- Published the verified release candidate under the npm `rc` tag with
  trusted-publishing provenance. Registry and GitHub release tarballs match
  byte for byte. This does not certify completed production migration.
- Generated the SDK from the 70-operation v1 candidate contract. Typed clients
  include current-source CRM, messaging, calendar/payments, Library/Catalog,
  knowledge, assistant runs, calls/analysis, quotes and lifecycle events.
- Current-source guards, explicit content grants, durable operation receipts
  and retry semantics remain part of the same public API contract. Existing
  integrations receive no extra permissions through this version change.

## 0.3.0-beta.1 (2026-11-01)

- Published the verified GitHub release artifact to npm under `beta`.
  The `latest` tag remains `0.2.0-beta.1`. Registry downloads match the
  reviewed tarball byte for byte.
- Generated API 1.0b types and all guarded CRM operations: identity upsert,
  conditional update/archive, note list/create/update/delete and granted note
  feed upserts/removals. Existing read-only integrations retain their profile.
- Declared Idempotency-Key headers receive one UUID per logical call, stable
  through retries; callers can persist their own key across restarts.
  If-Match is required and validated for conditional lead/note writes.
- Explicit read/write effect metadata preserves retryable POST search;
  outcome_unknown is never retried. Supports 201 JSON and 204 void responses.
- Note receipts expose metadata only. Notes content needs the separate grant;
  read and write limits intentionally differ for existing product notes.
- Live acceptance defaults to the read profile. The explicit CRM profile
  validates disposable import/update/note/archive lifecycle and stale guards.

## 0.2.0-beta.2

### Documentation

- The npm package README now shows how to install the official beta from npm
  and links to the Totem Studio GitHub organization. The GitHub release
  tarball and tag remain available as alternatives.
- This release changes documentation and the SDK version identifier; it does
  not add or change API operations or wire types.

## 0.2.0-beta.1

### Added

- `Lead.date_of_birth` is a required nullable calendar string (`YYYY-MM-DD`)
  on lead lists, detail, search and lead changes. Missing or invalid stored
  birthdays read as `null`; the public API does not expose birthday writes or
  greeting settings. The live response validator checks real Gregorian dates.
- `client.notifications.list(query?)` and `client.notifications.get(id)` for
  team notifications, with `Notification` and `NotificationList` wire types.
  Lists accept pagination and one of `lead` or `status` (`new`, `read`,
  `archived`). Reads never change a notification's status.
- Notification upserts and removals in the changes feed (`kind:
  'notification'`), typed by `FeedItem` and `FeedObjectOf<'notification'>`.
  Consumers with an exhaustive feed-kind switch must add the new kind.
- The live smoke runner covers both notification endpoints and accepts an
  optional `notificationId` fixture. Packed-consumer verification includes the
  notification resource and its exported type.

### Contract

- Generated from the API contract with SHA-256
  `f16836bd8f953de813c8a9a74143477c232f43372ba63d954b0421edb3470a62` (`CONTRACT_SHA256`).
- `calls.list`, `conversations.list` and `bookings.list` accept an optional
  `lead` (`lead_…`) in their query: one lead's calls, conversations or
  bookings.
- `leads.search` by `phone` also matches the number stored in the layouts phone
  libraries write (`+1 202-555-0123`, `(202) 555-0123`, `2025550123`).
- Error catalogue: `sector_restricted` is no longer reserved. Totem returns it
  for a team in a sensitive sector, such as health care, whose data it does not
  export. `invalid_request` also covers a conversations cursor whose
  conversation was erased. `quota_exceeded` says that every list counts toward
  the quota, including `GET /v1/teams`, `GET /v1/members`,
  `GET /v1/booking_services` and a lead's activities. `key_expired` no longer
  mentions an expiry date. `service_unavailable` is reserved: the API itself
  does not return it today.
- The fixes in `openapi.json` (`x-totem-errors`, not part of the package) now
  say that while `plan_not_entitled`, `team_state_restricted` or
  `sector_restricted` refuses access, the changes feed delivers nothing for the
  team, removals included, so delete your copy once that lasts longer than your
  retention policy allows.
- Descriptions now say that a member who leaves and a deleted bookable service
  drop out of their lists while records keep their ids; that activity pages are
  not in date order and that a stage or assignee change made on its own has an
  unknown actor; that a lead can have several conversations on one channel and
  business account, one per contact address; that a stage with no stored
  position is left out of its board; how a reschedule reads (`rescheduled` in
  place, or `cancelled` with `rescheduled_to`); what each `outcome_basis` value
  means; that a lead whose status this version does not know reads
  `status: null`; and that `Lead.phone` is validated without the team's default
  country.

## 0.1.0-beta.2

At this release, the SDK was distributed through the release tarball; it had not yet been published to npm.

### Renamed

- The package is now `@totemstudioai/sdk` (was `@totemstudio/sdk`), matching the
  `totemstudioai` npm organization. Update your imports.

### Changed: adapt your code

- Response enums are open types (`'new' | … | (string & {})`), as the contract
  says enums can grow. An exhaustive `switch` or `Record<Lead['status'], …>`
  needs a default branch. Union discriminators (`FeedItem['kind']`,
  `Activity['type']`) and request filters stay closed.
- `items('sync.changes')` no longer compiles: read the feed with `pages()` and
  save each page's cursor with its changes.
- The `team` request option is accepted only by collection routes, where the
  API reads `Totem-Team`. Detail, `me`, `teams` and `health` calls take the team
  from the record id (the runtime still ignores a `team` passed to them).
- A retry wait that cannot finish before the request deadline is skipped: the
  `TotemApiError` (with `retryAfterMs`) or `TotemConnectionError` that caused it
  is returned at once, instead of a `TotemTimeoutError` when the deadline fires.
- `maxRetryDelayMs` caps only a server's `Retry-After`; it no longer disables
  the SDK's own backoff when set below 250 ms.
- A network failure that retries cannot recover is a `TotemConnectionError`
  with the original error as `cause`, instead of the raw `TypeError`. A
  connection reset mid-body is retried as a network failure, instead of a
  `TotemProtocolError` for invalid JSON.
- `TotemApiError.message` adds the parameter name: `Totem API request failed
  (400, invalid_request, param=limit)`.
- Construction refuses an empty or whitespace `team`, a `baseUrl` on
  `api.totemstudio.ai` without `/v1`, and browser workers. A request refuses a
  `signal` that is not an `AbortSignal`.

### Added

- `TotemError`, the base class of every SDK error, and `TotemConnectionError`.
- `TotemApiError.action`, `.param` and `.title`; `code` typed as
  `TotemErrorCode | (string & {})`.
- `errorCatalogue`, `TotemErrorCode` and `ErrorAction`, generated from the
  contract's `x-totem-errors`.
- A named type for every schema (`LeadAttribution`, `LeadResponse`, `Me`,
  `Health`, the `…List` envelopes, …), plus `Stage`, `FeedUpsert`,
  `FeedRemoval`, `FeedObjectOf<K>`, `OptionsOf<Id>`, `ItemsOperationId` and the
  `isFeedRemoval()` guard.
- Documentation comments on every method, parameter, schema and operation; the
  client's declarations name their response types.
- `SDK_VERSION`, used in the `User-Agent`, and the `@totemstudioai/sdk/package.json` export.
- A `null` or `undefined` query value is omitted, so `cursor: page.next_cursor`
  works; optional options and query fields accept `undefined` under
  `exactOptionalPropertyTypes`.

### Fixed

- The deadline holds when a custom `fetch` or a response body ignores its signal.
- `Retry-After` accepts only whole seconds or an IMF-fixdate; a malformed value
  no longer causes an immediate retry.
- The SDK's backoff has jitter (125–250 ms, then 250–500 ms).
- A refused `signal` no longer leaves the deadline timer running.
- `fetch` is called unbound. On Cloudflare Workers (workerd) the default
  `fetch` used to fail with `Illegal invocation`, because it was called as a
  method of the client.

### Contract

- Generated from the API contract with SHA-256
  `8c3475e071a77c9a450ce78b812903cb1d0e6bcc8811a8aa4d0eef4214b61f62` (`CONTRACT_SHA256`).
- `LeadAttribution.original_capture.origin.kind` is `'conversation' | 'call'`,
  and `original_capture.source` uses the same values as `Lead['source']`.
- `limit` documents its default of 25. Descriptions now say that a live call's
  `duration_seconds` is `null`, when a cross-team lead reference is `null`, and
  what `removed.reason` means for a lead, call or conversation deleted in Totem.

### Packaging

- `engines` is Node `>=22.12.0` (was `>=24.18.0`); CI runs Node 22.12, 24.18 and the newest 24.x.
- Releases attach the packed tarball and its SHA-256.

## 0.1.0-beta.1 (2026-10-17)

First Beta: a typed, dependency-free client for every operation of the
read-only Totem API, generated from `openapi.json`, with pagination, bounded
retries, a per-request deadline, redirect refusal and a live smoke runner.

## Unreleased — 1.0 candidate

- Add the shared operational API client: current CRM context and source writes,
  tasks, notifications and incident reports, messages and first-reply preparation,
  Library/Catalog delivery, scheduling and payment links, published assistant runs,
  consented calls, source-bound analysis callbacks and lifecycle event polling.
- Keep content permissions independent, preserve source ETags and expose queued,
  prepared, accepted and uncertain outcomes without treating them as completion.
- Extend the fail-closed generator for annotated string-key maps. Preserve the
  existing no-automatic-retry behavior for explicit `outcome_unknown` responses.
- This entry documents local release work; publication and production acceptance
  are tracked separately from local tests.
