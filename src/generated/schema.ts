/** Generated from openapi.json. Do not edit; run npm run generate. */
type UnionKeys<T> = T extends unknown ? keyof T : never
type ExclusiveUnion<T, All = T> = T extends unknown ? T & Partial<Record<Exclude<UnionKeys<All>, keyof T>, never>> : never
/** Every error code the contract documents. New codes may appear: handle an unknown one by its status. */
export type TotemErrorCode = "custom_values_review_required" | "idempotency_key_required" | "idempotency_key_reused" | "idempotency_in_progress" | "outcome_unknown" | "version_conflict" | "ambiguous_identity" | "inbound_not_enabled" | "consent_required" | "invalid_request" | "team_required" | "secret_key_in_browser" | "invalid_credentials" | "key_expired" | "insufficient_scope" | "plan_not_entitled" | "ip_not_allowed" | "team_state_restricted" | "sector_restricted" | "capability_disabled" | "resource_missing" | "team_not_accessible" | "resync_required" | "capture_not_ready" | "sync_cursor_expired" | "rate_limited" | "quota_exceeded" | "internal_error" | "api_disabled" | "service_unavailable"
/** What the caller should do about an error, from the contract's error catalogue. */
export type ErrorAction = "fix_request" | "retry_after" | "contact_support" | "check_credentials" | "keep_and_retry" | "drop_team" | "resync" | "wait_capture" | "backoff"
export interface Schemas {
/** One stage, status or assignee transition of a lead. Activities never change once written. */
"Activity": ExclusiveUnion<({
/** Public id of the record. */
"id": string;
/** Always `activity`. */
"object": "activity";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** `status_changed`, `archived`, `unarchived`, or `revived` (the contact came back on their own and reopened an archived lead). */
"type": ("status_changed" | "archived" | "unarchived" | "revived");
/** The team the lead belongs to. */
"team": string;
/** The lead that moved. Null only while Totem has not yet assigned the lead its id. */
"lead": (string | null);
/** When the change was saved. */
"occurred_at": string;
/** Who made the change: a person, the AI, Totem automation, an API caller, or unknown. Totem knows who made a change only when the same save wrote the lead's status, so a stage or assignee change made on its own reads unknown. */
"actor_kind": (("human" | "ai" | "system" | "api" | "unknown") | (string & {}));
/** The stage the lead was in after the change (for "clear pipeline data", the stage it left), or null. */
"stage_snapshot": ({
/** The stage. */
"stage": (string | null);
/** Its board, or null for a legacy stage without one. */
"board": (string | null);
/** The stage name when the change was recorded, or null when the stage was already deleted. */
"name": (string | null)
} | null);
/** The estimated value at that moment, in major units, or null. */
"value_snapshot": (number | null);
/** The status before, or null when there was none. */
"from": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** The status after. */
"to": (("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {}));
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
} | {
/** Public id of the record. */
"id": string;
/** Always `activity`. */
"object": "activity";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** Always `stage_changed`. */
"type": "stage_changed";
/** The team the lead belongs to. */
"team": string;
/** The lead that moved. Null only while Totem has not yet assigned the lead its id. */
"lead": (string | null);
/** When the change was saved. */
"occurred_at": string;
/** Who made the change: a person, the AI, Totem automation, an API caller, or unknown. Totem knows who made a change only when the same save wrote the lead's status, so a stage or assignee change made on its own reads unknown. */
"actor_kind": (("human" | "ai" | "system" | "api" | "unknown") | (string & {}));
/** The stage the lead was in after the change (for "clear pipeline data", the stage it left), or null. */
"stage_snapshot": ({
/** The stage. */
"stage": (string | null);
/** Its board, or null for a legacy stage without one. */
"board": (string | null);
/** The stage name when the change was recorded, or null when the stage was already deleted. */
"name": (string | null)
} | null);
/** The estimated value at that moment, in major units, or null. */
"value_snapshot": (number | null);
/** The stage and board before, or null when the lead had neither. */
"from": ({
/** The stage. */
"stage": (string | null);
/** The board, or null for a legacy stage without one. */
"board": (string | null)
} | null);
/** The stage and board after. */
"to": {
/** The stage. */
"stage": (string | null);
/** The board, or null for a legacy stage without one. */
"board": (string | null)
};
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
} | {
/** Public id of the record. */
"id": string;
/** Always `activity`. */
"object": "activity";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** Always `assignees_changed`. */
"type": "assignees_changed";
/** The team the lead belongs to. */
"team": string;
/** The lead that moved. Null only while Totem has not yet assigned the lead its id. */
"lead": (string | null);
/** When the change was saved. */
"occurred_at": string;
/** Who made the change: a person, the AI, Totem automation, an API caller, or unknown. Totem knows who made a change only when the same save wrote the lead's status, so a stage or assignee change made on its own reads unknown. */
"actor_kind": (("human" | "ai" | "system" | "api" | "unknown") | (string & {}));
/** The stage the lead was in after the change (for "clear pipeline data", the stage it left), or null. */
"stage_snapshot": ({
/** The stage. */
"stage": (string | null);
/** Its board, or null for a legacy stage without one. */
"board": (string | null);
/** The stage name when the change was recorded, or null when the stage was already deleted. */
"name": (string | null)
} | null);
/** The estimated value at that moment, in major units, or null. */
"value_snapshot": (number | null);
/** The assigned members before, sorted. */
"from": Array<string>;
/** The assigned members after, sorted. */
"to": Array<string>;
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
})>;
/** A page of Activity objects, in a stable order that carries no meaning. */
"ActivityList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Activity"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Content-free stored callback receipt. Acceptance never claims every deferred analysis task has completed. */
"AnalysisReceipt": {
/** Always analysis_receipt. */
"object": "analysis_receipt";
/** Resource whose current analysis was processed. */
"resource_kind": (("call" | "meeting") | (string & {}));
/** Whether this logical callback committed its eligible summary. */
"summary_updated": boolean;
/** Whether this callback committed any eligible call extraction into its current retained lead; always false for meetings. */
"custom_values_updated": boolean;
/** Status of requested canonical finite fields. Deferred or unavailable is never a completed paid classification. */
"finite_status": (("not_requested" | "applied" | "deferred" | "unavailable") | (string & {}))
};
/** Metadata-only published assistant discovery; no prompts, tool configuration or provider selectors. */
"AssistantOptions": {
/** Always assistant_options. */
"object": "assistant_options";
/** Bounded current published selections. Draft and disabled assistants are omitted. */
"data": Array<{
/** Short-lived opaque selection bound to this integration and the exact currently published assistant version; never a provider or workflow identifier. */
"reference": string;
/** Published assistant display name, without its private instructions. */
"name": string;
/** Exact current published version. A later publication invalidates this selection. */
"version": number
}>;
/** Whether this bounded discovery inspected every current assistant definition. */
"complete": boolean
};
/** Content-free completed-run metadata. It never exports the reply, prompt, private source or provider identifiers. */
"AssistantRunReceipt": {
/** Always assistant_run_receipt. */
"object": "assistant_run_receipt";
/** The original canonical turn completed with an actual retained assistant reply, not merely queue admission. */
"status": "completed";
/** Opaque current conversation. Read reply bodies through conversations.messages with its separate current content grant. */
"conversation_id": string
};
"Attachment": {
/** Always attachment. */
"object": "attachment";
/** Intentionally disclosed canonical URL of the exact owned EU application-bucket file. */
"url": string;
/** Canonical file MIME type. */
"mime_type": string;
/** Canonical file name when known, otherwise null. */
"file_name": (string | null);
/** Known file size in bytes, otherwise null. */
"file_size": (number | null)
};
/** A board with its stages in pipeline order. */
"Board": {
/** Public id of the record. */
"id": string;
/** Always `board`. */
"object": "board";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The board's name, or null when none is stored. */
"name": (string | null);
/** True for the team's default board, where new leads land unless routed elsewhere. */
"is_default": boolean;
/** True when the board is archived (hidden from the board selector). Its leads still export. */
"is_archived": boolean;
/** The stage of this board a lead moves to when its first appointment is confirmed, or null when none is set or it names no stage of this board. */
"appointment_booked_stage": (string | null);
/** The board's stages, ordered by position, then by id. A stage with no position stored at all is left out, although a lead can still name it. */
"stages": Array<{
/** Always `stage`. */
"object": "stage";
/** Public id of the stage; a lead's `stage` names it. */
"id": string;
/** The stage's name, or null when none is stored. */
"name": (string | null);
/** The stage's position on its board, left to right; null when the stored position is not a number. Stages are listed in this order. */
"position": (number | null);
/** True for the stage new leads of this board enter. */
"is_default": boolean;
/** True for a final stage: moving a lead here marks it converted. */
"is_final": boolean;
/** True for an archive stage, whose leads are hidden from the main board view. */
"is_archive": boolean;
/** Who moves leads: `standard` (people only), `supervised` (AI may move leads in, people move them out) or `automated` (AI runs outreach and moves leads in and out); null for a value this version does not know. */
"mode": ((("standard" | "supervised" | "automated") | (string & {})) | null)
}>;
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** A page of Board objects, in a stable order that carries no meaning. */
"BoardList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Board"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** A booking and its `kind`: an appointment for a bookable service, an event from the connected calendar, or a booking imported from another system. */
"Booking": {
/** Public id of the record. */
"id": string;
/** Always `booking`. */
"object": "booking";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The lead this booking belongs to, or null for a booking without a lead or when the lead no longer exists. Names and contact details appear only on the lead. */
"lead": (string | null);
/** `service_booking` (booked for a bookable service, by the AI, a customer or a person), `calendar_event` (an event from the connected calendar) or `external_import` (synced from an external booking system or read from a portal email). A booking from an origin this version does not know is reported as `calendar_event`. */
"kind": (("service_booking" | "calendar_event" | "external_import") | (string & {}));
/** The booked service (see `/booking_services`) on a `service_booking`; null otherwise. */
"service": (string | null);
/** `scheduled`, `rescheduled`, `cancelled`, `postponed`, `attended`, `no_show` or `team_no_show` (attendance is recorded only by people); null for a value this version does not know. `rescheduled` means the booking was moved in place and its times are the new ones; a booking the AI replaced with a new one reads `cancelled`, with `rescheduled_to` set. */
"status": ((("scheduled" | "rescheduled" | "cancelled" | "postponed" | "attended" | "no_show" | "team_no_show") | (string & {})) | null);
/** When the booking starts (UTC). */
"starts_at": (string | null);
/** When the booking ends (UTC). */
"ends_at": (string | null);
/** `online`, `in_person` or `phone`; null when not stored. */
"meeting_type": ((("online" | "in_person" | "phone") | (string & {})) | null);
/** Who booked it: `ai`, `customer`, `operator` or an authorized `integration`; null when not recorded. */
"source": ((("ai" | "customer" | "operator" | "integration") | (string & {})) | null);
/** The booking this one replaced in a reschedule, or null. For a few seconds the replaced booking can still read `scheduled`; bookings rescheduled before Totem started recording this link may not have it. */
"rescheduled_from": (string | null);
/** The booking that replaced this one in a reschedule, or null. When it is set, this booking reads `cancelled`. */
"rescheduled_to": (string | null);
/** When the booking was recorded in Totem (UTC). */
"created_at": (string | null);
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** Bounded public choices and offers without provider or raw resource identifiers. */
"BookingAvailability": {
/** Always booking_availability. */
"object": "booking_availability";
/** Selected service. */
"service_id": string;
/** Current business timezone. */
"timezone": string;
/** An instant in UTC. */
"expires_at": string;
/** Current permitted service options. Select one when several are returned. */
"options": Array<{
/** Server-issued opaque calendar reference; never parse or modify it. */
"id": string;
/** Option label. */
"label": string;
/** Current option duration. */
"duration_minutes": number
}>;
/** Bounded available slots with opaque offers; reading them does not reserve capacity. */
"slots": Array<{
/** Server-issued opaque calendar reference; never parse or modify it. */
"offer": string;
/** An instant in UTC. */
"starts_at": string;
/** An instant in UTC. */
"ends_at": string;
/** Start with the business timezone offset. */
"starts_at_business": string;
/** End with the business timezone offset. */
"ends_at_business": string;
/** Remaining seats when applicable. */
"remaining_seats": (number | null);
/** Remaining resource units when applicable. */
"remaining_units": (number | null)
}>
};
/** A page of Booking objects, in a stable order that carries no meaning. */
"BookingList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Booking"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Fresh management projection and action ETag from the same source snapshot; not a capture version. */
"BookingManagement": {
/** The team this record belongs to. */
"team": string;
/** The lead this booking belongs to, or null for a booking without a lead or when the lead no longer exists. Names and contact details appear only on the lead. */
"lead": (string | null);
/** `service_booking` (booked for a bookable service, by the AI, a customer or a person), `calendar_event` (an event from the connected calendar) or `external_import` (synced from an external booking system or read from a portal email). A booking from an origin this version does not know is reported as `calendar_event`. */
"kind": (("service_booking" | "calendar_event" | "external_import") | (string & {}));
/** The booked service (see `/booking_services`) on a `service_booking`; null otherwise. */
"service": (string | null);
/** `scheduled`, `rescheduled`, `cancelled`, `postponed`, `attended`, `no_show` or `team_no_show` (attendance is recorded only by people); null for a value this version does not know. `rescheduled` means the booking was moved in place and its times are the new ones; a booking the AI replaced with a new one reads `cancelled`, with `rescheduled_to` set. */
"status": ((("scheduled" | "rescheduled" | "cancelled" | "postponed" | "attended" | "no_show" | "team_no_show") | (string & {})) | null);
/** When the booking starts (UTC). */
"starts_at": (string | null);
/** When the booking ends (UTC). */
"ends_at": (string | null);
/** `online`, `in_person` or `phone`; null when not stored. */
"meeting_type": ((("online" | "in_person" | "phone") | (string & {})) | null);
/** Who booked it: `ai`, `customer`, `operator` or an authorized `integration`; null when not recorded. */
"source": ((("ai" | "customer" | "operator" | "integration") | (string & {})) | null);
/** The booking this one replaced in a reschedule, or null. For a few seconds the replaced booking can still read `scheduled`; bookings rescheduled before Totem started recording this link may not have it. */
"rescheduled_from": (string | null);
/** The booking that replaced this one in a reschedule, or null. When it is set, this booking reads `cancelled`. */
"rescheduled_to": (string | null);
/** When the booking was recorded in Totem (UTC). */
"created_at": (string | null);
/** Always booking_management. */
"object": "booking_management";
/** Current booking. */
"id": string;
/** Strong action validator from this exact current source; use it in If-Match for cancellation or rescheduling. */
"etag": string
};
/** Current authorized lead bookings, with explicit completeness. */
"BookingManagementList": {
/** Always booking_management_list. */
"object": "booking_management_list";
/** At most twenty current manageable bookings for the authorized lead. */
"data": Array<Schemas["BookingManagement"]>;
/** False when the bounded query may omit additional owned bookings. */
"complete": boolean
};
/** Owned current payment metadata, never a raw Stripe record. */
"BookingPayment": {
/** Always booking_payment. */
"object": "booking_payment";
/** Server-issued opaque calendar reference; never parse or modify it. */
"reference": string;
/** Current owned payment lifecycle; review needs reconciliation and consumed means applied to a booking. */
"status": (("pending" | "processing" | "paid" | "failed" | "refunded" | "review" | "consumed") | (string & {}));
/** Current payment amount in minor currency units. */
"amount_minor": number;
/** Uppercase three-letter currency code. */
"currency": string;
/** Current active authenticated-merchant checkout URL; null when unavailable. */
"checkout_url": (string | null);
/** Whether capacity is currently held for this payment. */
"slot_held": boolean;
/** Current hold expiry in UTC, or null without an active hold. */
"hold_expires_at": (string | null);
/** Current confirmed booking id when resolvable, otherwise null. */
"booking_id": (string | null)
};
/** At most five current payment requests for the authorized lead. */
"BookingPaymentList": {
/** Always booking_payment_list. */
"object": "booking_payment_list";
/** Current owned payment requests, at most five. */
"payments": Array<Schemas["BookingPayment"]>;
/** False when the bounded query may omit additional current requests. */
"complete": boolean
};
/** A payment request or link delivery is not a confirmed booking. */
"BookingPaymentReceipt": {
/** Always booking_payment_receipt. */
"object": "booking_payment_receipt";
/** Server-issued opaque calendar reference; never parse or modify it. */
"reference": string;
/** Current payment requirement, reconciliation state or accepted link send. */
"outcome": (("payment_required" | "payment_processing" | "payment_review" | "link_sent") | (string & {}));
/** Always false: a payment request or sent link does not confirm a booking. */
"booking_confirmed": false
};
/** Minimal current-source booking outcome. */
"BookingReceipt": {
/** Always booking_receipt. */
"object": "booking_receipt";
/** Booking id. */
"id": string;
/** Verified current booking outcome; unchanged means no new booking mutation. */
"status": (("scheduled" | "cancelled" | "rescheduled" | "unchanged") | (string & {}));
/** Original booking when a reschedule replaced it, otherwise null. */
"previous_id": (string | null)
};
/** A service customers can book, with its meeting type. */
"BookingService": {
/** Public id of the record. */
"id": string;
/** Always `booking_service`. */
"object": "booking_service";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The service's name, or null when none is stored. */
"name": (string | null);
/** How the service happens: `online` (the default when none is stored), `in_person` or `phone`. */
"meeting_type": (("online" | "in_person" | "phone") | (string & {}))
};
/** Every BookingService object, in one response: this list is never paged. */
"BookingServiceList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["BookingService"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Source-backed service discovery for tenant integrations and actual hosted assistants. */
"CalendarServiceOptionsResult": {
/** Always booking_service_options. */
"object": "booking_service_options";
/** Current permitted services in this page. */
"data": Array<{
/** Actual current service ID, shared with availability. */
"service_id": string;
/** Configured service name. */
"name": string;
/** Team-authored service guidance. */
"when_to_use": string;
/** How the service happens. */
"meeting_type": (("online" | "in_person" | "phone") | (string & {}));
/** Default service duration in minutes. */
"duration_minutes": number;
/** Configured minimum notice in minutes. */
"min_notice_minutes": number;
/** Configured booking horizon in days. */
"horizon_days": number;
/** Current permitted option labels and public terms. */
"options": Array<{
/** Actual configured option label. */
"label": string;
/** Configured option duration in minutes. */
"duration_minutes": number;
/** Team-authored choice guidance. */
"when_to_use": string;
/** Public terms only, without merchant/provider identifiers or payment URLs. */
"payment": {
/** Current public payment policy state. */
"mode": (("none" | "link" | "required" | "unavailable") | (string & {}));
/** Fixed amount in minor units, or null for a variable or unavailable amount. */
"amount_minor": (number | null);
/** Currency of the fixed amount, or null. */
"currency": (string | null);
/** Basis of a fixed amount, or null. */
"basis": ((("per_booking" | "per_person" | "per_resource_unit") | (string & {})) | null)
}
}>;
/** Actual enabled pages for this service. */
"booking_pages": Array<{
/** Published booking-page label. */
"title": string;
/** Canonical published Totem booking-page URL, or null when unavailable. */
"url": (string | null)
}>
}>;
/** Team business timezone. */
"timezone": string;
/** Whether the current search has no further page. */
"complete": boolean;
/** Opaque next-page cursor, or null. */
"next_cursor": (string | null)
};
/** A call: its direction, timing and a normalized outcome. No recording or transcript. */
"Call": {
/** Public id of the record. */
"id": string;
/** Always `call`. */
"object": "call";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The lead this call is linked to, or null when it is unlinked or the lead no longer exists. Identity (name, phone) travels on the lead only. */
"lead": (string | null);
/** `inbound` or `outbound`; null when not stored. */
"direction": ((("inbound" | "outbound") | (string & {})) | null);
/** When the call started (UTC), or when it was recorded if the provider gave no start time. */
"started_at": (string | null);
/** Whole seconds of the call (rounded down); null while the call is still live, or when not stored. */
"duration_seconds": (number | null);
/** How the call ended: `answered_human`, `answered_ai`, `voicemail`, `no_answer`, `busy`, `failed`, or `unknown` (still live, or no evidence of who answered). Read it with `outcome_basis`. */
"outcome": (("answered_human" | "answered_ai" | "voicemail" | "no_answer" | "busy" | "failed" | "unknown") | (string & {}));
/** The evidence behind `outcome`: `inbound_verdict` (Totem's classification of an inbound call on its phone lines), `ai_analysis` (Totem's classification of the status, end reason and length that Retell reports), `duration_floor` (a call on a connected Zadarma PBX, where at least 10 seconds counts as answered), `carrier_answer_only` (only the carrier's answer signal, which never counts as answered, so a connected call reads `unknown`: every outbound call on Totem's phone lines, made by the AI or by a person, and an inbound one Totem has not classified), `browser_session` (a web voice session with the assistant), or `none` (no evidence, as for a call that is still live). */
"outcome_basis": (("inbound_verdict" | "ai_analysis" | "duration_floor" | "carrier_answer_only" | "browser_session" | "none") | (string & {}));
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** Current eligible calling options. Reading does not dial, reserve budget or change configuration. */
"CallBindingOptions": {
/** Always call_binding_options. */
"object": "call_binding_options";
/** Bounded current published selections. Select one explicitly. */
"data": Array<{
/** Always call_binding. */
"object": "call_binding";
/** Opaque current calling binding emitted by the server. Never parse, edit or substitute its contents. */
"reference": string;
/** Published assistant display name. */
"assistant_name": string;
/** Current outgoing line label. */
"line_label": string;
/** The team’s own displayed outgoing number. */
"line_number": string;
/** Calling channel selected by this binding. */
"channel": (("phone" | "whatsapp") | (string & {}))
}>;
/** Whether this bounded response includes every current usable selection. */
"complete": boolean
};
/** A page of Call objects, in a stable order that carries no meaning. */
"CallList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Call"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** An existing canonical European recording, never an arbitrary provider URL. */
"CallRecording": {
/** Always call_recording. */
"object": "call_recording";
/** Current retained call. */
"call_id": string;
/** Intentional authorized recording disclosure: a bounded URL for the existing owned European application artifact. */
"url": string;
/** Expiry of this URL. Later access requires a fresh authorized request. */
"expires_at": string;
/** Stored artifact media type when available. */
"content_type": (string | null);
/** Stored artifact size in bytes when available. */
"size": (number | null)
};
/** Minimal truthful call-start acceptance receipt. */
"CallStartReceipt": {
/** Always call_start_receipt. */
"object": "call_start_receipt";
/** The provider accepted call initiation. This is not evidence that the person answered or the call completed. */
"status": "accepted";
/** Opaque canonical call id when its retained record exists; otherwise null. Never a raw provider id. */
"call_id": (string | null)
};
/** Explicitly authorized call speech content. */
"CallTranscript": {
/** Always call_transcript. */
"object": "call_transcript";
/** Current retained call. */
"call_id": string;
/** Speech-only transcript in its original order. Tool arguments and results are excluded. */
"text": string;
/** False when the current transcript exceeds the response limit. It does not indicate that an ongoing call has ended. */
"complete": boolean
};
"CatalogSearch": {
/** Always catalog_result_list. */
"object": "catalog_result_list";
/** Whether this bounded result includes every matching published variant. */
"complete": boolean;
/** Authorized matching published variants, up to one hundred. */
"data": Array<{
/** Current server-issued opaque content reference; never parse or modify it. */
"catalog": string;
/** Current server-issued opaque content reference; never parse or modify it. */
"product": string;
/** Current server-issued opaque content reference; never parse or modify it. */
"variant": string;
/** Current server-issued opaque content reference; never parse or modify it. */
"category": string;
/** Current published catalog revision. */
"revision": number;
/** Published catalog display name. */
"catalog_name": string;
/** Published category display name. */
"category_name": string;
/** Published product or variant title. */
"title": string;
/** Authorized published product description. */
"description": string;
/** Published product type. */
"type": (("physical" | "digital" | "service") | (string & {}));
/** Published variant option labels and values. */
"option_values": {
[key: string]: string
};
/** Current published price and its unit; this is not a confirmed booking offer. */
"price": {
/** Whether the published price is fixed, a starting price or requires a quote. */
"mode": (("fixed" | "from" | "quote") | (string & {}));
/** Published unit to which the price applies. */
"basis": (("item" | "booking" | "person" | "resource_unit") | (string & {}));
/** Published amount in minor currency units; null when a quote is required. */
"amount_minor": (number | null);
/** Published sale amount in minor currency units, or null. */
"sale_amount_minor": (number | null);
/** Three-letter published currency code. */
"currency": string
};
/** Published product image URL, or null. */
"image_url": (string | null);
/** Published customer-facing product URL, or null. */
"public_url": (string | null);
/** The published variant is manually available; scheduling can impose further constraints. */
"manual_availability": "available";
/** Which authority determines availability beyond the published manual status. */
"availability_basis": (("totem_scheduling" | "external_authority" | "manual_only") | (string & {}));
/** Published booking mode and its current linked service or external destination. */
"booking": ExclusiveUnion<({
/** No booking integration, or an enquiry handled by the business. */
"mode": ("none" | "enquiry")
} | {
/** Booking is managed by an external service. */
"mode": "external";
/** Published external booking URL when configured, otherwise null. */
"url": (string | null)
} | {
/** Booking is managed by the linked Totem service. */
"mode": "totem";
/** Current linked booking service. Read its availability to select an option and offer. */
"service_id": string;
/** Published booking page label, or null. */
"page_label": (string | null);
/** Published booking option label, or null. */
"option_label": (string | null)
})>;
/** Actual linked Totem scheduling result for the requested slot; null when no such check was made. */
"requested_slot_available": (boolean | null);
/** Unavailable or unverified scheduling, otherwise null. */
"availability_issue": ((("unavailable" | "not_checked") | (string & {})) | null);
/** Whether this published variant supports the configured WhatsApp catalog transport. */
"whatsapp_capable": boolean
}>
};
"CatalogSendReceipt": {
/** Always catalog_send_receipt. */
"object": "catalog_send_receipt";
/** The accepted single-product or product-list provider format. */
"sent_as": (("catalog_product" | "catalog_product_list") | (string & {}));
/** Number of reviewed variants in the accepted selection. */
"variant_count": number
};
/** A conversation on one channel: its status, assignee and the times of the latest messages, never their content. */
"Conversation": {
/** Public id of the record. */
"id": string;
/** Always `conversation`. */
"object": "conversation";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The lead this conversation is linked to, or null when it is unlinked or the lead no longer exists. Identity (name, phone, handle) travels on the lead only. */
"lead": (string | null);
/** The channel: `whatsapp`, `email`, `chatbot` (the web chat), `facebook`, `instagram`, `sms` or `tiktok`; null for a value this version does not know. A lead can have several conversations on the same channel and business account, one for each contact address (phone number, email address or handle) it has used, so key your copy on `id`. */
"channel_type": ((("sms" | "whatsapp" | "facebook" | "instagram" | "tiktok" | "chatbot" | "email") | (string & {})) | null);
/** `active` or `archived` in the team's inbox; null for a value this version does not know. */
"status": ((("active" | "archived") | (string & {})) | null);
/** The team member assigned to the conversation (see `/members`), or null. */
"assignee": (string | null);
/** `human` while a person has taken the conversation over, including a WhatsApp chat answered from the WhatsApp Business app; `ai` otherwise. `ai` means no takeover is active, not that an assistant is set up or answering on this channel. A timed takeover returns to `ai` when it expires, and the record's version changes then. */
"reply_mode": (("ai" | "human") | (string & {}));
/** When the conversation was created (UTC). */
"created_at": (string | null);
/** The latest customer message (UTC). Not counted: erased messages, imported WhatsApp history and web-chat visitor turns, so a `chatbot` conversation reads null. Instagram shares cannot be told apart and count. */
"last_inbound_at": (string | null);
/** The latest message sent to the customer that did not fail (UTC), whoever sent it. Imported WhatsApp history counts. */
"last_outbound_at": (string | null);
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** A page of Conversation objects, in a stable order that carries no meaning. */
"ConversationList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Conversation"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Bounded current message bodies without sender destinations, raw identifiers or media locations. Truncated means older retained rows may exist. */
"ConversationMessages": {
/** Identifies a content-authorized conversation message page. */
"object": "conversation_messages";
/** Latest retained messages visible under the current content grant, with at most fifty entries. */
"messages": Array<{
/** Opaque reference bound to this retained message and conversation incarnation. */
"reference": string;
/** Whether the message was received from or sent to the contact. */
"direction": (("inbound" | "outbound") | (string & {}));
/** Stored message timestamp in UTC. */
"at": string;
/** Retained message content type; attachments are indicated without exposing their locations. */
"content_type": (("text" | "image" | "audio" | "video" | "file" | "unknown") | (string & {}));
/** Authorized retained message text, limited to eight thousand characters. */
"text": string;
/** True when the retained text exceeds the returned text limit. */
"text_truncated": boolean;
/** Whether the retained message has an attachment; this does not grant attachment access. */
"has_attachment": boolean;
/** Observed delivery status, or null when no such provider evidence is retained. */
"delivery_status": ((("delivered" | "read" | "failed") | (string & {})) | null);
/** True for a message retained through history import. */
"imported": boolean
}>;
/** True when older retained messages may exist beyond this bounded page. */
"truncated": boolean
};
/** Current source-bound CRM metadata and independently requested content. No export capture version or business authoring profile is included. */
"CrmContext": {
/** Always crm_context. */
"object": "crm_context";
/** Current source contact evidence, independently of whether the conversation is linked to a lead. A tenant without a signed source receives null phone. */
"source_contact": {
/** Current canonical transport phone from the authorized retained source, or null when hidden, cleared or unavailable; never an old sender fallback. */
"phone": (string | null)
};
/** Current authorized execution conversation, or null for a lead-only tenant context; never an unrelated thread. */
"conversation_id": (string | null);
/** Current authorized voice call, or null when no call source exists. A browser session never invents a conversation or premature call. */
"call_id": (string | null);
/** Current authorized source lead, or null when this conversation is still unlinked. */
"lead": (Schemas["LeadSource"] | null);
/** Bounded team runtime facts; no assistant prompt or business profile. */
"team": {
/** The team's name as it appears in Totem, or null when none is stored. */
"name": (string | null);
/** The team's IANA time zone: its business-hours zone when that is valid, otherwise its default country's (Europe/Madrid when neither is set). Interpret the team's local times with it. */
"timezone": string;
/** The team's default country (ISO 3166-1 alpha-2), which Totem uses when someone types a phone number without a prefix; null when none is set. The API does not apply it: `Lead.phone` is validated without a default country, so a number stored without its country prefix reads `phone_status: invalid`. */
"default_country": (string | null);
/** Authorized team. */
"id": string;
/** The team’s short runtime extra information, never its authoring business profile. */
"extra_info": (string | null);
/** Whether the week is configured or uses the normal Monday–Friday 09:00–18:00 fallback. */
"business_hours_source": (("configured" | "default") | (string & {}));
/** Current canonical opening week in the team’s time zone. */
"business_hours": {
/** Monday opening intervals; an empty list means closed. */
"monday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Tuesday opening intervals; an empty list means closed. */
"tuesday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Wednesday opening intervals; an empty list means closed. */
"wednesday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Thursday opening intervals; an empty list means closed. */
"thursday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Friday opening intervals; an empty list means closed. */
"friday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Saturday opening intervals; an empty list means closed. */
"saturday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>;
/** Sunday opening intervals; an empty list means closed. */
"sunday": Array<{
/** Opening time on the business wall clock (HH:mm). */
"start": string;
/** Closing time on the business wall clock (HH:mm; 24:00 means midnight). */
"end": string
}>
};
/** Snapshot time rendered on the business clock with its actual UTC offset. */
"now_business": string
};
/** Up to twenty current retained notes when explicitly requested and authorized; otherwise null. */
"notes": (Array<{
/** The parent lead. */
"lead": string;
/** CRM note text; requires the explicit note-content grant. */
"body": string;
/** When this note was created. */
"created_at": string;
/** The caller’s own external id, or null. Canonical feed objects withhold all integration namespaces. */
"external_id": (string | null)
}> | null);
/** More notes exist beyond this bounded context; use the separately authorized notes endpoint for a full export. */
"notes_has_more": boolean;
/** Current custom values only when requested with their independent content permission; otherwise null. */
"custom_values": (Array<{
/** Exact stable field name; names are never inferred from labels. */
"name": string;
/** Human-readable label. */
"label": string;
/** Exact string value; an empty string is a stored value, not deletion. */
"value": string;
/** Stored provenance, when known. */
"source"?: (("form" | "call_extraction" | "manual" | "csv") | (string & {}))
}> | null);
/** Current CRM automation metadata, separate from permission and consent. */
"automation": ({
/** Current effective automation flags, including durable holds. */
"flags": {
/** Current recorded operational flag. */
"archived": boolean;
/** Current recorded operational flag. */
"paused": boolean;
/** Current recorded operational flag. */
"needs_human_attention": boolean
};
/** Canonical hold reason and time; private appointment ids are withheld. */
"hold": ({
/** Canonical durable hold reason. */
"reason": string;
/** Recorded hold start in epoch milliseconds. */
"since": number
} | null);
/** Current source state only; it never authorizes or schedules outreach. */
"state": {
/** Current recorded number, or null when unknown. */
"round": (number | null);
/** Current recorded number, or null when unknown. */
"currentStep": (number | null);
/** Current recorded number, or null when unknown. */
"stepEnteredAt": (number | null);
/** Current recorded number, or null when unknown. */
"roundExhaustedAt": (number | null);
/** Current recorded number, or null when unknown. */
"completedAt": (number | null);
/** Current stored text, or null when unavailable. */
"completionReason": (string | null);
/** Current recorded number, or null when unknown. */
"scheduledContactAt": (number | null);
/** Current stored text, or null when unavailable. */
"scheduledContactType": (string | null);
/** Current stored text, or null when unavailable. */
"scheduledContactNote": (string | null);
/** Current recorded number, or null when unknown. */
"coolOffUntil": (number | null);
/** Current recorded number, or null when unknown. */
"contactCount": (number | null);
/** Current recorded operational flag. */
"hasBeenReached": boolean
};
/** Existing effective canonical safety limits; unknown malformed stored values remain null. */
"contact_limits": {
/** Current recorded number, or null when unknown. */
"maxContactsPerLeadPerDay": (number | null);
/** Current recorded number, or null when unknown. */
"maxTotalContactsPerLead": (number | null);
/** Current recorded number, or null when unknown. */
"coolOffPeriodDays": (number | null);
/** Current recorded number, or null when unknown. */
"maxReactivationRounds": (number | null);
/** Current recorded number, or null when unknown. */
"maxCallAttemptsPerStep"?: (number | null)
}
} | null);
/** Current authorized pipeline facts; opaque ids can be used with the public business operations. */
"pipeline": ({
/** Current stage, including archived history. */
"stage": ({
/** Current opaque stage id. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current stored text, or null when unavailable. */
"mode": (string | null);
/** Current recorded number, or null when unknown. */
"position": (number | null);
/** Current recorded operational flag. */
"is_default": boolean;
/** Current recorded operational flag. */
"is_final": boolean;
/** Current recorded operational flag. */
"is_archive": boolean;
/** Current stored text, or null when unavailable. */
"context": (string | null)
} | null);
/** Current board metadata with canonical stage selection. */
"board": ({
/** Current opaque board. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current stored text, or null when unavailable. */
"type": (string | null);
/** Current recorded operational flag. */
"is_archived": boolean;
/** Current stored text, or null when unavailable. */
"goal": (string | null);
/** Current stored text, or null when unavailable. */
"extra_info": (string | null);
/** Current non-archive destination stages. */
"stages": Array<{
/** Current opaque stage id. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current stored text, or null when unavailable. */
"mode": (string | null);
/** Current recorded number, or null when unknown. */
"position": (number | null);
/** Current recorded operational flag. */
"is_default": boolean;
/** Current recorded operational flag. */
"is_final": boolean;
/** Current recorded operational flag. */
"is_archive": boolean;
/** Current stored text, or null when unavailable. */
"context": (string | null)
}>
} | null);
/** Only the destinations currently allowed by the product’s one-time conversation routing policy. */
"routing": ({
/** Canonical one-time routing instruction. */
"instruction": string;
/** Current stored text, or null when unavailable. */
"currentBoardName": (string | null);
/** Current permitted alternative boards. */
"boards": Array<{
/** Allowed opaque board destination. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current stored text, or null when unavailable. */
"description": (string | null);
/** Current stored text, or null when unavailable. */
"goal": (string | null);
/** Selectable destinations from the canonical routing policy. */
"stages": Array<{
/** Allowed opaque routing destination. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current recorded operational flag. */
"entry": boolean
}>
}>
} | null);
/** Current active own-team roster, without email addresses or raw user ids. */
"members": Array<{
/** Opaque active team member. */
"id": string;
/** Current stored text, or null when unavailable. */
"display_name": (string | null)
}>;
/** Actual safe effective timing and section metadata, or null without a current board. */
"cadence": ({
/** The four actual effective runtime sections. */
"sections": Array<{
/** Canonical runtime sequence. */
"name": (("main" | "reactivation" | "followUp" | "stageEntry") | (string & {}));
/** Actual inherited configuration source. */
"source": (("stage" | "board" | "main_fallback" | "none") | (string & {}));
/** Current recorded number, or null when unknown. */
"step_count": (number | null);
/** Bounded timing/channel description; no template, account or provider ids. */
"steps": Array<{
/** Zero-based effective sequence position. */
"index": number;
/** Business channel only; provider and sender selectors are withheld. */
"channel": (("call" | "whatsapp" | "email" | "unknown") | (string & {}));
/** Current recorded number, or null when unknown. */
"delay_minutes": (number | null)
}>;
/** Current recorded operational flag. */
"has_more": boolean
}>;
/** Current recorded number, or null when unknown. */
"conversation_stale_hours": (number | null);
/** Current recorded number, or null when unknown. */
"stage_entry_delay_minutes": (number | null);
/** Current recorded operational flag. */
"bypass_business_hours": boolean
} | null)
} | null);
/** Named current operational language, routing and verified legal/privacy facts; no destination members or authoring profile. */
"runtime": {
/** Canonical operational team language. */
"preferred_language": string;
/** Existing instruction for internal team notification language. */
"notification_language_instruction": string;
/** Current usable routing directory, without recipient identities. */
"notification_departments": Array<{
/** Saved natural department routing key, not a credential or member id. */
"id": string;
/** Current department name. */
"name": string;
/** Authored department responsibility description. */
"description": string
}>;
/** Saved default department key, or null. */
"default_department_id": (string | null);
/** Whether the current business routing configuration is enabled. */
"notifications_enabled": boolean;
/** Verified current legal controller name, including canonical organization inheritance. */
"controller_name": (string | null);
/** Current effective privacy disclosure URL, or null when none is published. */
"privacy_policy_url": (string | null)
};
/** Current configured organization routing only with the separately issued handoff capability; omitted for older or context-only grants. */
"family_routing"?: ({
/** Current stored text, or null when unavailable. */
"instruction": (string | null);
/** Bounded current configured organization directory, disclosed only with the independently issued handoff capability. */
"offices": Array<{
/** Exact current configured office slug. */
"office": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current stored text, or null when unavailable. */
"coverage": (string | null);
/** Current stored text, or null when unavailable. */
"preferred_language": (string | null);
/** Current configured eligible destination boards; no raw board or team ids. */
"boards": Array<{
/** Opaque eligible configured board, usable only with the organization handoff action. */
"id": string;
/** Current stored text, or null when unavailable. */
"name": (string | null);
/** Current recorded operational flag. */
"is_default": boolean
}>
}>
} | null);
/** Explicitly granted exact current conversation messages, or null when not requested/unavailable. */
"messages": (Schemas["ConversationMessages"] | null);
/** Explicitly granted current lead call evidence, or null when not requested/unavailable. */
"calls": (Array<{
/** Opaque current call incarnation. */
"id": string;
/** Recorded call direction. */
"direction": ((("inbound" | "outbound") | (string & {})) | null);
/** Current call start time, or null when unknown. */
"started_at": (string | null);
/** Canonical transport outcome; distinct from the model snapshot’s business contact-log outcome. */
"outcome": (("answered_human" | "answered_ai" | "voicemail" | "no_answer" | "busy" | "failed" | "unknown") | (string & {}));
/** Explicitly granted bounded stored call summary. */
"summary": (string | null);
/** Explicitly granted stored call sentiment, when present. */
"sentiment": (string | null);
/** Explicitly granted stored transcript text, when present. */
"transcript": (string | null);
/** Whether the stored transcript exceeds this bounded view. */
"transcript_truncated": boolean
}> | null);
/** Explicitly granted canonical customer payment evidence. Opaque display ids never authorize an action; incomplete never means unpaid. */
"payments": ({
/** Whether the canonical merchant reader proved complete history. */
"complete": boolean;
/** Current recorded number, or null when unknown. */
"checkedAt": (number | null);
/** At most five canonical current customer payment evidence items. */
"items": Array<{
/** Opaque display-only evidence digest; never a selector or capability. */
"id": string;
/** Canonical financial evidence status. */
"status": (("paid" | "pending" | "processing" | "failed" | "expired" | "cancelled" | "refunded" | "partially_refunded" | "review") | (string & {}));
/** Expected amount in minor currency units. */
"amountMinor": number;
/** Actually received amount in minor currency units. */
"amountReceivedMinor": number;
/** Known refunded amount in minor units, or null when unknown. */
"refundedAmountMinor": (number | null);
/** Lowercase three-letter currency code. */
"currency": string;
/** Current recorded number, or null when unknown. */
"createdAt": (number | null);
/** Current stored text, or null when unavailable. */
"description": (string | null);
/** Opaque booking-payment reference when present; no provider id. */
"reference": (string | null);
/** True only for real merchant evidence; test data is never live proof. */
"livemode": boolean;
/** Whether this evidence was checked against Stripe or is stored-only. */
"verification": (("stripe" | "stored") | (string & {}));
/** Current recorded number, or null when unknown. */
"checkedAt": (number | null);
/** Current stored text, or null when unavailable. */
"appointmentStatus": (string | null);
/** Canonical human-readable amount, when supplied. */
"amountHuman"?: string;
/** Canonical human-readable date, when supplied. */
"createdAtHuman"?: string
}>
} | null);
/** Explicit coverage for every independently authorized content section. */
"coverage": {
/** Coverage of this exact requested section; unavailable is never an empty history. */
"notes": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"custom_values": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"messages": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"calls": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"payments": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"recordings": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
};
/** Coverage of this exact requested section; unavailable is never an empty history. */
"attachments": {
/** Whether this requested section is complete, bounded or unavailable. */
"status": (("not_requested" | "complete" | "partial" | "unavailable") | (string & {}));
/** Number of authorized items actually included. */
"included": number;
/** Known complete total, or null when the read cannot prove it. */
"total": (number | null);
/** Closed operational coverage explanation, or null. */
"reason": (string | null)
}
};
/** Optional canonical model-facing projections with the existing sanitizer and exact total budgets; typed context remains separate. */
"model_context": ({
/** JSON serialized only after the canonical model projector and total content budget. */
"context_json": string;
/** Canonical lean automation JSON, or null without a current lead. */
"lead_automation_json": (string | null)
} | null)
};
"Event": {
/** Always event. */
"object": "event";
/** Stable opaque transition identity; deduplicate deliveries by this value. */
"id": string;
/** Captured lifecycle transition, distinct from acceptance of an asynchronous request. */
"name": (("operation.completed" | "call.completed" | "call.analysis_completed" | "booking.created" | "booking.rescheduled" | "booking.cancelled" | "assistant_run.completed") | (string & {}));
/** Kind of retained resource referenced by this event. */
"resource_type": (("operation" | "call" | "booking") | (string & {}));
/** Current opaque ID of the exact retained resource incarnation. */
"resource_id": (`op_${string}` | string | string);
/** Captured metadata status; outcome_unknown must be reconciled before repeating an effect. */
"status": (("succeeded" | "failed" | "cancelled" | "outcome_unknown" | "completed" | "ready" | "unavailable" | "created" | "rescheduled") | (string & {}));
/** Source transition time in UTC. */
"occurred_at": string
};
"EventList": {
/** Always event_list. */
"object": "event_list";
/** Authorized retained transitions in capture order; withheld entries still advance the cursor. */
"data": Array<Schemas["Event"]>;
/** Continue immediately with next_cursor while true, including when data is empty. */
"has_more": boolean;
/** Opaque cursor bound to this integration and selected team; save it after processing the page. */
"next_cursor": string
};
/** Content-free organization handoff result; destination contacts, source content and provider selectors remain private. */
"FamilyHandoffReceipt": {
/** Always family_handoff_receipt. */
"object": "family_handoff_receipt";
/** Canonical accepted disposition, or identity ambiguity awaiting human review. */
"status": (("accepted" | "needs_review") | (string & {}));
/** Configured receiving office slug; no internal destination team id. */
"office": string;
/** Whether the canonical source lead was transferred, preserving pending-work fences. */
"moved_source": boolean;
/** True only when the canonical notification and push outbox were committed. This does not claim delivery. */
"notification_queued": boolean
};
/** One change: the record's current state, or its removal. */
"FeedItem": ExclusiveUnion<({
/** The kind of the record, such as `lead` or `call`. */
"kind": "lead";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Lead"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "lead_note";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["LeadNote"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "lead_attribution";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["LeadAttribution"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "lead_response";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["LeadResponse"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "activity";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Activity"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "call";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Call"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "conversation";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Conversation"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "booking";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Booking"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "board";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Board"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": "notification";
/** Public id of the record; the facets `lead_attribution` and `lead_response` use their lead's id. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** The record as it is now. */
"object": Schemas["Notification"]
} | {
/** The kind of the record, such as `lead` or `call`. */
"kind": ("lead" | "lead_note" | "lead_attribution" | "lead_response" | "activity" | "call" | "conversation" | "booking" | "board" | "notification");
/** Public id of the removed record. */
"id": string;
/** The record's version. Apply the item only when it is greater than the version you hold. */
"version": number;
/** Present only on a removal. */
"removed": {
/** `erased` after an erasure, which is also what deleting a lead, call or conversation in Totem does: erasing a lead erases its calls, conversations and merged duplicates too, while its bookings stay with `lead` set to `null`. `deleted` for any other removal. Either way, delete your copy and keep this version, so an older copy delivered later is ignored. */
"reason": (("erased" | "deleted") | (string & {}))
}
})>;
/** A page of the changes feed. */
"FeedPage": {
/** Always `list`. */
"object": "list";
/** Changes in the order Totem recorded them. A record can appear more than once during an initial sync. */
"data": Array<Schemas["FeedItem"]>;
/** `true` when more changes are ready now; `false` once you have caught up. */
"has_more": boolean;
/** Always present, even on an empty page. Store it after applying the page and send it on the next call. */
"next_cursor": string
};
/** Source-proven canonical first-reply receipt with bounded context and no provider identifiers. */
"FirstReplyReceipt": {
/** Always first_reply_receipt. */
"object": "first_reply_receipt";
/** Current source-proven context, or null when no content may be disclosed. */
"first_reply": ({
/** Always first_reply_v1. */
"capability": "first_reply_v1";
/** Actual campaign delivery, preparation or suppression status. */
"status": string;
/** Canonical bounded explanation when available. */
"reason"?: string;
/** Language selected by the canonical first-reply policy. */
"language"?: string;
/** Authorized bounded text from the canonical campaign receipt. */
"sent_content": Array<string>;
/** Authorized bounded text prepared for the visitor when present. */
"prepared_content"?: Array<string>;
/** Last delivered question when the canonical campaign recorded one. */
"last_delivered_question"?: string
} | null);
/** Whether the canonical campaign or human ownership suppresses the normal assistant reply. */
"skip_ai_reply": boolean;
/** Opaque prepared webchat content reference, or null. Resolve it with the same current content permissions. */
"prepared_reference": (string | null)
};
/** The API is up. */
"Health": {
/** Always `health`. */
"object": "health";
/** Always `ok`: when the API is not available, the answer is an error instead. */
"status": "ok"
};
/** Current retained knowledge passages without query echo, provider ids or source URLs. */
"KnowledgeSearch": {
/** Always knowledge_search. */
"object": "knowledge_search";
/** Indexing with no retained match means the index is still being prepared. */
"status": (("ready" | "indexing") | (string & {}));
/** Matching passages only; an empty array is a successful search. */
"passages": Array<{
/** Retained matching passage. */
"text": string;
/** Stored document title. */
"title": string;
/** Stored section, if available. */
"section": (string | null);
/** Stored page number, if available. */
"page": (number | null);
/** Similarity score from 0 to 1. */
"score": number
}>
};
/** A lead or client record: lead fields only. */
"Lead": {
/** Public id of the record. */
"id": string;
/** Always `lead`. */
"object": "lead";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team the record belongs to. */
"team": string;
/** `lead` when the record has a pipeline status, otherwise `client`. A lead whose status this version does not know reads `status: null`. */
"record_kind": (("lead" | "client") | (string & {}));
/** First name or display name, or null. */
"name": (string | null);
/** Surname, or null. */
"surname": (string | null);
/** Civil date of birth in YYYY-MM-DD, without a time or timezone; null when missing, cleared or invalid. */
"date_of_birth": (string | null);
/** Email address as stored, or null. */
"email": (string | null);
/** Company, or null. */
"company": (string | null);
/** Contact website as stored, without fetching it, or null. */
"website": (string | null);
/** Phone in E.164, only when the stored number validates; otherwise null. */
"phone": (string | null);
/** `valid` (see `phone`), `invalid` (a number is stored but does not validate, for example one stored without its country prefix) or `missing`. */
"phone_status": (("valid" | "invalid" | "missing") | (string & {}));
/** Pipeline status; null for a client record, or for a status this version does not know. `converted` is not "won". */
"status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Who set the current status: a person, the AI, Totem automation, an API caller, or unknown (no recorded transition lands on it). Null when `status` is null. */
"status_set_by": ((("human" | "ai" | "system" | "api" | "unknown") | (string & {})) | null);
/** Why the record was archived, as a closed code; stored free text is `other`. Null when none is stored. */
"archive_reason": ((("opt_out" | "no_consent" | "not_interested" | "not_qualified" | "no_contact" | "merged" | "family_transfer" | "other") | (string & {})) | null);
/** The status the lead had before its current archive; null while it is not archived or when unknown. */
"archived_from_status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Contact permissions. Apply them before any outreach from your own systems. */
"contact_permissions": {
/** True when the person asked never to be contacted (the `opt_out` archive reason). Stop every channel. */
"do_not_contact": boolean;
/** True when the person unsubscribed from marketing and follow-up email. */
"email_opt_out": boolean;
/** When the email opt-out was recorded, or null. */
"email_opt_out_at": (string | null);
/** WhatsApp consent: false when refused, true when recorded, null when unknown. */
"whatsapp_consent": (boolean | null);
/** The source of each permission. */
"provenance": {
/** Where `do_not_contact` comes from, or null when it is false. */
"do_not_contact": ((("archive_reason") | (string & {})) | null);
/** Who recorded the email opt-out: the unsubscribe link, a person in Totem, or unknown. Null when there is none. */
"email_opt_out": ((("unsubscribe_link" | "manual" | "unknown") | (string & {})) | null);
/** `archive_reason` when a refusal is recorded as the archive reason; `stored` for the value kept on the record, which team members can edit. Null when unknown. */
"whatsapp_consent": ((("stored" | "archive_reason") | (string & {})) | null)
}
};
/** The lead this record was merged into, or null (also when that lead no longer exists). */
"merged_into": (string | null);
/** Where a transfer to another team of your organization sent this lead, or null. The team may be one your key does not read. */
"transferred_to": ({
/** The destination team. */
"team": string;
/** The destination lead, or null when its id cannot be named across teams: an assistant handoff created it, or the transfer landed on an existing lead-ads lead (Meta, Google Ads or LinkedIn) or another lead with a fixed id. */
"lead": (string | null)
} | null);
/** When the contact last came back on their own and revived an archived lead, or null. */
"revived_at": (string | null);
/** True when the lead was converted with "clear pipeline data": board, stage, priority, assignees, estimated value and the source fields other than `source_channel` are null because they were cleared. */
"pipeline_cleared": boolean;
/** When the lead was converted, while its status is `converted`; otherwise null. */
"converted_at": (string | null);
/** The estimated value when it was converted, in major units. Survives "clear pipeline data". */
"value_at_conversion": (number | null);
/** Priority, or null. */
"priority": ((("low" | "medium" | "high" | "urgent") | (string & {})) | null);
/** Labels as stored. `lead` and `booking` are system labels. */
"tags": Array<string>;
/** The board, resolved through the stage when it has one; or null. */
"board": (string | null);
/** The stage, or null. */
"stage": (string | null);
/** Assigned members, sorted. Null when the record has no pipeline data. */
"assignees": (Array<string> | null);
/** Estimated value in major units as stored (decimals allowed), or null. */
"estimated_value": (number | null);
/** Always null: Totem stores no currency with the value. */
"estimated_value_currency": null;
/** The stored lead source; `api` also covers leads created by Totem itself (for example from a conversation or a call), see `source_detail`. Null when none is stored. */
"source": ((("meta_lead_ads" | "manual" | "website_form" | "booking_page" | "csv_import" | "api" | "chatbot" | "google_ads" | "linkedin" | "other") | (string & {})) | null);
/** The channel the record started on (for example `whatsapp`, `phone`, `widget`), or null. Team members can edit it. */
"source_channel": (string | null);
/** `conversation`, `call`, `external:<provider>`, `gated_ad:<source>`, `family_handoff`, `api_intake` or `unknown`; null when `source` needs no detail. */
"source_detail": (string | null);
/** `server_written` when Totem set the source from what the ad platform reported; otherwise `member_editable` (team members can change it). Null with `source`. */
"source_provenance": ((("server_written" | "member_editable") | (string & {})) | null);
/** When the record was created. */
"created_at": string;
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** Where a lead came from: its original capture and latest submission. */
"LeadAttribution": {
/** Public id of the record. */
"id": string;
/** Always `lead_attribution`. */
"object": "lead_attribution";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team the lead belongs to. */
"team": string;
/** How the lead first entered the CRM, frozen once; null when it was not captured. "Original" is the first time the contact entered the CRM, not the first ad it answered. */
"original_capture": ({
/** `at_creation`: frozen from the lead as it was first saved. `at_activation`: copied once from the lead as it was when the API was activated, for a lead with no capture record (created before Totem started recording attribution, or whose creation was not recorded). */
"capture": (("at_creation" | "at_activation") | (string & {}));
/** When the record was written. */
"captured_at": string;
/** The lead source at capture, from the same set as the lead's `source`; `api` also covers leads created by Totem itself (for example from a conversation or a call, see `origin`). Null when none was stored. */
"source": ((("meta_lead_ads" | "manual" | "website_form" | "booking_page" | "csv_import" | "api" | "chatbot" | "google_ads" | "linkedin" | "other") | (string & {})) | null);
/** The real source of a gated ad lead stored as `api`, or null. */
"source_hint": (string | null);
/** The channel at capture, or null. */
"source_channel": (string | null);
/** The portal or booking platform of a forwarded or synced lead, or null. */
"external_provider": (string | null);
/** When the lead was received, as first written, or null. */
"received_at": (string | null);
/** When the ad platform says the form was submitted, or null. */
"submitted_at": (string | null);
/** The conversation or call that created the lead (never its id), or null (also for an origin of another kind). */
"origin": ({
/** `conversation` or `call`. */
"kind": (("conversation" | "call") | (string & {}));
/** Its channel, or null. */
"channel": (string | null)
} | null);
/** The campaign. */
"campaign": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The ad. */
"ad": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Meta ad set. */
"ad_set": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Google Ads ad group. */
"ad_group": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The lead form. */
"form": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The creative. */
"creative": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Google Ads asset group. */
"asset_group": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Facebook page. */
"page": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The five standard UTM keys, or null when none was captured. */
"utm": ({
/** `utm_source`. */
"source": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_medium`. */
"medium": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_campaign`. */
"campaign": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_term`. */
"term": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_content`. */
"content": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
} | null);
/** The network of the first click id (`google` or `meta`). The click id itself is never kept. */
"click_network": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** The first Meta ad referral of the conversation that created the lead, or null. */
"ad_referral": ({
/** The channel. */
"channel": (("whatsapp" | "facebook" | "instagram") | (string & {}));
/** What opened the conversation. */
"source_type": (("ad" | "post" | "link" | "other") | (string & {}));
/** The ad or post id, or null. */
"ad_id": (string | null);
/** Meta's time for the referral. */
"referred_at": string;
/** Always `provider`: only the signed Meta webhooks write it. */
"provenance": "provider"
} | null);
/** The transfer from another team of your organization that created the lead, or null. */
"family_origin": ({
/** The team of your organization the lead came from. */
"team": string;
/** Its lead there, or null when that id cannot be named across teams: an assistant handed off a caller without one, or the lead there is a lead-ads lead (Meta, Google Ads or LinkedIn) or another lead with a fixed id. `automated` tells an assistant's handoff from a move made by a person. */
"lead": (string | null);
/** True for an assistant's handoff. */
"automated": boolean
} | null);
/** Not available in this version. */
"audience": {
/** Always null. */
"value": null;
/** Totem does not record audiences; an ad set is not one. */
"missing_reason": "unsupported"
}
} | null);
/** `not_captured` when `original_capture` is null, otherwise null. */
"original_capture_missing_reason": ((("not_captured") | (string & {})) | null);
/** The newest ad submission recorded for this lead, including a repeat on an existing contact; null when none is recorded. A submission the ad platform reports deleted (a LinkedIn member deleting their form response) is no longer shown, and once the newest one expires or is withdrawn an older one can show instead. */
"latest_submission": ({
/** The ad platform. */
"provider": (("meta" | "google_ads" | "linkedin") | (string & {}));
/** When the platform says it was submitted, or null. */
"submitted_at": (string | null);
/** The campaign. */
"campaign": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The ad. */
"ad": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Meta ad set. */
"ad_set": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Google Ads ad group. */
"ad_group": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The lead form. */
"form": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** Its name. */
"name": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The creative. */
"creative": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** The Google Ads asset group. */
"asset_group": {
/** Its id. */
"id": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
};
/** Its UTM keys, or null. */
"utm": ({
/** `utm_source`. */
"source": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_medium`. */
"medium": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_campaign`. */
"campaign": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_term`. */
"term": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
};
/** `utm_content`. */
"content": {
/** The value, or null when it was not captured. */
"value": (string | null);
/** `provider` (reported by the ad platform), `team_alias` (typed by staff), `stored_metadata` (editable lead data), `stored_metadata_at_activation` (copied once when the API was activated, for a lead created before capture), or `not_captured` exactly when `value` is null. */
"provenance": (("provider" | "team_alias" | "stored_metadata" | "stored_metadata_at_activation" | "not_captured") | (string & {}))
}
} | null);
/** When this submission stops being readable (Google Ads and LinkedIn keep it 90 days); null for Meta. */
"expires_at": (string | null)
} | null);
/** `not_captured` when `latest_submission` is null, otherwise null. */
"latest_submission_missing_reason": ((("not_captured") | (string & {})) | null);
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** Custom values with a separate opaque ETag in the response header. */
"LeadCustomValues": {
/** Always lead_custom_values. */
"object": "lead_custom_values";
/** Owning lead. */
"lead": string;
/** Current exact-name values; requires the separate content-read grant. */
"values": Array<{
/** Exact stable field name; names are never inferred from labels. */
"name": string;
/** Human-readable label. */
"label": string;
/** Exact string value; an empty string is a stored value, not deletion. */
"value": string;
/** Stored provenance, when known. */
"source"?: (("form" | "call_extraction" | "manual" | "csv") | (string & {}))
}>
};
/** Content-free mutation receipt; the response ETag reflects the current source even on replay. */
"LeadCustomValuesReceipt": {
/** Always lead_custom_values_receipt. */
"object": "lead_custom_values_receipt";
/** Owning lead. */
"lead": string;
/** Whether this logical request changed stored custom values. */
"changed": boolean;
/** Exact names set by this logical request. */
"set_count": number;
/** Existing exact names removed by this logical request. */
"removed_count": number
};
/** A lead with its `attribution` and `response` facets, each with its own `version`. A facet is `null` only while Totem is still preparing it. */
"LeadDetail": {
/** Public id of the record. */
"id": string;
/** Always `lead`. */
"object": "lead";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team the record belongs to. */
"team": string;
/** `lead` when the record has a pipeline status, otherwise `client`. A lead whose status this version does not know reads `status: null`. */
"record_kind": (("lead" | "client") | (string & {}));
/** First name or display name, or null. */
"name": (string | null);
/** Surname, or null. */
"surname": (string | null);
/** Civil date of birth in YYYY-MM-DD, without a time or timezone; null when missing, cleared or invalid. */
"date_of_birth": (string | null);
/** Email address as stored, or null. */
"email": (string | null);
/** Company, or null. */
"company": (string | null);
/** Contact website as stored, without fetching it, or null. */
"website": (string | null);
/** Phone in E.164, only when the stored number validates; otherwise null. */
"phone": (string | null);
/** `valid` (see `phone`), `invalid` (a number is stored but does not validate, for example one stored without its country prefix) or `missing`. */
"phone_status": (("valid" | "invalid" | "missing") | (string & {}));
/** Pipeline status; null for a client record, or for a status this version does not know. `converted` is not "won". */
"status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Who set the current status: a person, the AI, Totem automation, an API caller, or unknown (no recorded transition lands on it). Null when `status` is null. */
"status_set_by": ((("human" | "ai" | "system" | "api" | "unknown") | (string & {})) | null);
/** Why the record was archived, as a closed code; stored free text is `other`. Null when none is stored. */
"archive_reason": ((("opt_out" | "no_consent" | "not_interested" | "not_qualified" | "no_contact" | "merged" | "family_transfer" | "other") | (string & {})) | null);
/** The status the lead had before its current archive; null while it is not archived or when unknown. */
"archived_from_status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Contact permissions. Apply them before any outreach from your own systems. */
"contact_permissions": {
/** True when the person asked never to be contacted (the `opt_out` archive reason). Stop every channel. */
"do_not_contact": boolean;
/** True when the person unsubscribed from marketing and follow-up email. */
"email_opt_out": boolean;
/** When the email opt-out was recorded, or null. */
"email_opt_out_at": (string | null);
/** WhatsApp consent: false when refused, true when recorded, null when unknown. */
"whatsapp_consent": (boolean | null);
/** The source of each permission. */
"provenance": {
/** Where `do_not_contact` comes from, or null when it is false. */
"do_not_contact": ((("archive_reason") | (string & {})) | null);
/** Who recorded the email opt-out: the unsubscribe link, a person in Totem, or unknown. Null when there is none. */
"email_opt_out": ((("unsubscribe_link" | "manual" | "unknown") | (string & {})) | null);
/** `archive_reason` when a refusal is recorded as the archive reason; `stored` for the value kept on the record, which team members can edit. Null when unknown. */
"whatsapp_consent": ((("stored" | "archive_reason") | (string & {})) | null)
}
};
/** The lead this record was merged into, or null (also when that lead no longer exists). */
"merged_into": (string | null);
/** Where a transfer to another team of your organization sent this lead, or null. The team may be one your key does not read. */
"transferred_to": ({
/** The destination team. */
"team": string;
/** The destination lead, or null when its id cannot be named across teams: an assistant handoff created it, or the transfer landed on an existing lead-ads lead (Meta, Google Ads or LinkedIn) or another lead with a fixed id. */
"lead": (string | null)
} | null);
/** When the contact last came back on their own and revived an archived lead, or null. */
"revived_at": (string | null);
/** True when the lead was converted with "clear pipeline data": board, stage, priority, assignees, estimated value and the source fields other than `source_channel` are null because they were cleared. */
"pipeline_cleared": boolean;
/** When the lead was converted, while its status is `converted`; otherwise null. */
"converted_at": (string | null);
/** The estimated value when it was converted, in major units. Survives "clear pipeline data". */
"value_at_conversion": (number | null);
/** Priority, or null. */
"priority": ((("low" | "medium" | "high" | "urgent") | (string & {})) | null);
/** Labels as stored. `lead` and `booking` are system labels. */
"tags": Array<string>;
/** The board, resolved through the stage when it has one; or null. */
"board": (string | null);
/** The stage, or null. */
"stage": (string | null);
/** Assigned members, sorted. Null when the record has no pipeline data. */
"assignees": (Array<string> | null);
/** Estimated value in major units as stored (decimals allowed), or null. */
"estimated_value": (number | null);
/** Always null: Totem stores no currency with the value. */
"estimated_value_currency": null;
/** The stored lead source; `api` also covers leads created by Totem itself (for example from a conversation or a call), see `source_detail`. Null when none is stored. */
"source": ((("meta_lead_ads" | "manual" | "website_form" | "booking_page" | "csv_import" | "api" | "chatbot" | "google_ads" | "linkedin" | "other") | (string & {})) | null);
/** The channel the record started on (for example `whatsapp`, `phone`, `widget`), or null. Team members can edit it. */
"source_channel": (string | null);
/** `conversation`, `call`, `external:<provider>`, `gated_ad:<source>`, `family_handoff`, `api_intake` or `unknown`; null when `source` needs no detail. */
"source_detail": (string | null);
/** `server_written` when Totem set the source from what the ad platform reported; otherwise `member_editable` (team members can change it). Null with `source`. */
"source_provenance": ((("server_written" | "member_editable") | (string & {})) | null);
/** When the record was created. */
"created_at": string;
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string;
/** The lead's attribution facet, or null while Totem is still preparing it. */
"attribution": (Schemas["LeadAttribution"] | null);
/** The lead's response facet, or null while Totem is still preparing it. */
"response": (Schemas["LeadResponse"] | null)
};
/** A page of Lead objects, in a stable order that carries no meaning. */
"LeadList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Lead"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
"LeadMutation": ({
/** Always lead_mutation. */
"object": "lead_mutation";
/** True only when this call created a new lead. */
"created": boolean;
"lead": Schemas["Lead"];
/** Intake outreach disposition, present on upsert responses. */
"outreach"?: {
/** not_armed for imports; withheld when a guard blocks intake outreach; eligible means queued under the team’s ordinary intake rules, never a delivery promise. */
"status": (("not_armed" | "withheld" | "eligible") | (string & {}));
/** Closed guard reason when withheld, otherwise null. */
"reason": (string | null)
}
} | {
/** Always lead_source_mutation. */
"object": "lead_source_mutation";
/** True only when this operation created the retained lead. */
"created": boolean;
/** Whether the source values changed; an inert repeat is false. */
"changed": boolean;
/** For voice registration, whether the genuinely created contact was linked to this execution. A different stated contact stays held and grants no subsequent source access. */
"registered_lead_linked"?: boolean;
/** Current authorized source receipt, or null when an unverified duplicate must remain unlinked. */
"lead": (Schemas["LeadSourceReceipt"] | null)
});
/** Lead note body. */
"LeadNote": {
/** Public id of the record. */
"id": string;
/** Always `lead_note`. */
"object": "lead_note";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The parent lead. */
"lead": string;
/** CRM note text; requires the explicit note-content grant. */
"body": string;
/** When this note was created. */
"created_at": string;
/** The caller’s own external id, or null. Canonical feed objects withhold all integration namespaces. */
"external_id": (string | null);
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
"LeadNoteList": ExclusiveUnion<({
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<{
/** Opaque stable note id, bound to this team and lead incarnation; never parse it. */
"id": string;
/** Always lead_note. */
"object": "lead_note";
/** True for real data; false only in fictional example data. */
"livemode": boolean;
/** The lead this note belongs to. */
"lead": string;
/** The current note version; use the matching strong note ETag for conditional writes. */
"version": number;
/** When the note was created. */
"created_at": string;
/** When the current version was recorded. */
"updated_at": string;
/** Your integration’s external id for this note, or null; other integrations’ ids are withheld. */
"external_id": (string | null);
/** Existing note content, including empty attachment-only notes; available only with the explicit note-content grant. API writes accept 1–20,000 characters. */
"body": string
}>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
} | {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["LeadNoteSource"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
})>;
/** Lead note metadata without its content; safe for a write-only receipt or replay. */
"LeadNoteMetadata": {
/** Opaque stable note id, bound to this team and lead incarnation; never parse it. */
"id": string;
/** Always lead_note. */
"object": "lead_note";
/** True for real data; false only in fictional example data. */
"livemode": boolean;
/** The lead this note belongs to. */
"lead": string;
/** The current note version; use the matching strong note ETag for conditional writes. */
"version": number;
/** When the note was created. */
"created_at": string;
/** When the current version was recorded. */
"updated_at": string;
/** Your integration’s external id for this note, or null; other integrations’ ids are withheld. */
"external_id": (string | null)
};
"LeadNoteReceipt": ({
/** Always lead_note_receipt. */
"object": "lead_note_receipt";
"note": Schemas["LeadNoteMetadata"]
} | {
/** Always lead_note_source_mutation. */
"object": "lead_note_source_mutation";
/** Whether this logical operation created the note. */
"created": boolean;
/** Whether this operation deleted its reviewed note incarnation. */
"deleted": boolean;
/** Live source metadata or the deleted note identity, never content. */
"note": ({
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_receipt. */
"object": "lead_note_source_receipt";
/** Strong validator bound to the current note and parent lead incarnations and source values. */
"etag": string;
/** Actual current source update time. */
"updated_at": string
} | {
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_deletion; it names the deleted incarnation only. */
"object": "lead_note_source_deletion"
})
});
/** Current retained note content under its independent read grant, without an inventory version. */
"LeadNoteSource": {
/** Current authorized parent lead. */
"lead": string;
/** CRM note text; requires the explicit note-content grant. */
"body": string;
/** When this note was created. */
"created_at": string;
/** The caller’s own external id, or null. Canonical feed objects withhold all integration namespaces. */
"external_id": (string | null);
/** Opaque id of this exact note incarnation. */
"id": string;
/** Always lead_note_source. */
"object": "lead_note_source";
/** Strong validator bound to the current note and parent lead incarnations and source values. */
"etag": string;
/** Actual source update time of this note. */
"updated_at": string
};
/** Content-free proof that this operation deleted the reviewed note incarnation. */
"LeadNoteSourceDeletion": {
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_deletion; it names the deleted incarnation only. */
"object": "lead_note_source_deletion"
};
/** Current source note mutation metadata; safe for write-only integrations and replay. */
"LeadNoteSourceMutation": {
/** Always lead_note_source_mutation. */
"object": "lead_note_source_mutation";
/** Whether this logical operation created the note. */
"created": boolean;
/** Whether this operation deleted its reviewed note incarnation. */
"deleted": boolean;
/** Live source metadata or the deleted note identity, never content. */
"note": ({
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_receipt. */
"object": "lead_note_source_receipt";
/** Strong validator bound to the current note and parent lead incarnations and source values. */
"etag": string;
/** Actual current source update time. */
"updated_at": string
} | {
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_deletion; it names the deleted incarnation only. */
"object": "lead_note_source_deletion"
})
};
/** Metadata-only source write receipt; no note text or other notes. */
"LeadNoteSourceReceipt": {
/** Opaque id of this exact note incarnation. */
"id": string;
/** Current authorized parent lead. */
"lead": string;
/** Always lead_note_source_receipt. */
"object": "lead_note_source_receipt";
/** Strong validator bound to the current note and parent lead incarnations and source values. */
"etag": string;
/** Actual current source update time. */
"updated_at": string
};
/** How the team has answered a lead across its conversations and calls: the latest messages each way and whether a reply is due. It uses its lead's id. */
"LeadResponse": {
/** Public id of the record. */
"id": string;
/** Always `lead_response`. */
"object": "lead_response";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The latest message from the customer on any of the lead's conversations (UTC), or null. Not counted: erased messages, imported WhatsApp history and web-chat visitor turns. Instagram shares cannot be told apart and count. */
"last_inbound_at": (string | null);
/** The latest message sent to the customer that did not fail, on any of the lead's conversations and whoever sent it (UTC), or null. Imported WhatsApp history counts. */
"last_outbound_at": (string | null);
/** True when `last_inbound_at` is newer than the latest reply on any of the lead's conversations. A reply is a sent message that did not fail and was recorded as a conversation reply or with no purpose; outreach, transactional messages (such as reminders) and imported history do not count. Most stored messages carry no purpose, so an automated send recorded without one also counts as a reply. False when the customer has never written. */
"awaiting_reply": boolean;
/** When the latest of the lead's calls whose `outcome` is `answered_human` or `answered_ai` started (UTC), or null. A connected outbound call on Totem's phone lines reads `unknown`, so it is not counted. */
"last_answered_call_at": (string | null);
/** `delivered`, `read` or `failed` for the latest message sent to the lead on WhatsApp. Null when that message has no receipt yet (`sent` is never stored) or the lead has no message sent on WhatsApp. */
"last_whatsapp_delivery_status": ((("delivered" | "read" | "failed") | (string & {})) | null);
/** What these facts were computed from. */
"coverage": {
/** The lead's conversations these facts were computed from, newest first; at most 20. */
"conversations": number;
/** The lead's calls `last_answered_call_at` was computed from, newest first; at most 50. */
"calls": number;
/** The channels of those conversations that store no delivery receipts (every channel but WhatsApp), sorted. */
"channels_without_delivery_data": Array<(("sms" | "facebook" | "instagram" | "tiktok" | "chatbot" | "email") | (string & {}))>;
/** True when a read limit was reached (20 conversations, 200 messages or 50 calls): older activity was not read, so a time can be null or older than the truth, and `awaiting_reply` can miss an older reply. */
"truncated": boolean
};
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** Current canonical CRM lead projection, available through the explicit operational context permission without inventing a capture version. */
"LeadSource": {
/** The team the record belongs to. */
"team": string;
/** `lead` when the record has a pipeline status, otherwise `client`. A lead whose status this version does not know reads `status: null`. */
"record_kind": (("lead" | "client") | (string & {}));
/** First name or display name, or null. */
"name": (string | null);
/** Surname, or null. */
"surname": (string | null);
/** Civil date of birth in YYYY-MM-DD, without a time or timezone; null when missing, cleared or invalid. */
"date_of_birth": (string | null);
/** Email address as stored, or null. */
"email": (string | null);
/** Company, or null. */
"company": (string | null);
/** Contact website as stored, without fetching it, or null. */
"website": (string | null);
/** Phone in E.164, only when the stored number validates; otherwise null. */
"phone": (string | null);
/** `valid` (see `phone`), `invalid` (a number is stored but does not validate, for example one stored without its country prefix) or `missing`. */
"phone_status": (("valid" | "invalid" | "missing") | (string & {}));
/** Pipeline status; null for a client record, or for a status this version does not know. `converted` is not "won". */
"status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Who set the current status: a person, the AI, Totem automation, an API caller, or unknown (no recorded transition lands on it). Null when `status` is null. */
"status_set_by": ((("human" | "ai" | "system" | "api" | "unknown") | (string & {})) | null);
/** Why the record was archived, as a closed code; stored free text is `other`. Null when none is stored. */
"archive_reason": ((("opt_out" | "no_consent" | "not_interested" | "not_qualified" | "no_contact" | "merged" | "family_transfer" | "other") | (string & {})) | null);
/** The status the lead had before its current archive; null while it is not archived or when unknown. */
"archived_from_status": ((("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | (string & {})) | null);
/** Contact permissions. Apply them before any outreach from your own systems. */
"contact_permissions": {
/** True when the person asked never to be contacted (the `opt_out` archive reason). Stop every channel. */
"do_not_contact": boolean;
/** True when the person unsubscribed from marketing and follow-up email. */
"email_opt_out": boolean;
/** When the email opt-out was recorded, or null. */
"email_opt_out_at": (string | null);
/** WhatsApp consent: false when refused, true when recorded, null when unknown. */
"whatsapp_consent": (boolean | null);
/** The source of each permission. */
"provenance": {
/** Where `do_not_contact` comes from, or null when it is false. */
"do_not_contact": ((("archive_reason") | (string & {})) | null);
/** Who recorded the email opt-out: the unsubscribe link, a person in Totem, or unknown. Null when there is none. */
"email_opt_out": ((("unsubscribe_link" | "manual" | "unknown") | (string & {})) | null);
/** `archive_reason` when a refusal is recorded as the archive reason; `stored` for the value kept on the record, which team members can edit. Null when unknown. */
"whatsapp_consent": ((("stored" | "archive_reason") | (string & {})) | null)
}
};
/** The lead this record was merged into, or null (also when that lead no longer exists). */
"merged_into": (string | null);
/** Where a transfer to another team of your organization sent this lead, or null. The team may be one your key does not read. */
"transferred_to": ({
/** The destination team. */
"team": string;
/** The destination lead, or null when its id cannot be named across teams: an assistant handoff created it, or the transfer landed on an existing lead-ads lead (Meta, Google Ads or LinkedIn) or another lead with a fixed id. */
"lead": (string | null)
} | null);
/** When the contact last came back on their own and revived an archived lead, or null. */
"revived_at": (string | null);
/** True when the lead was converted with "clear pipeline data": board, stage, priority, assignees, estimated value and the source fields other than `source_channel` are null because they were cleared. */
"pipeline_cleared": boolean;
/** When the lead was converted, while its status is `converted`; otherwise null. */
"converted_at": (string | null);
/** The estimated value when it was converted, in major units. Survives "clear pipeline data". */
"value_at_conversion": (number | null);
/** Priority, or null. */
"priority": ((("low" | "medium" | "high" | "urgent") | (string & {})) | null);
/** Labels as stored. `lead` and `booking` are system labels. */
"tags": Array<string>;
/** The board, resolved through the stage when it has one; or null. */
"board": (string | null);
/** The stage, or null. */
"stage": (string | null);
/** Assigned members, sorted. Null when the record has no pipeline data. */
"assignees": (Array<string> | null);
/** Estimated value in major units as stored (decimals allowed), or null. */
"estimated_value": (number | null);
/** Always null: Totem stores no currency with the value. */
"estimated_value_currency": null;
/** The stored lead source; `api` also covers leads created by Totem itself (for example from a conversation or a call), see `source_detail`. Null when none is stored. */
"source": ((("meta_lead_ads" | "manual" | "website_form" | "booking_page" | "csv_import" | "api" | "chatbot" | "google_ads" | "linkedin" | "other") | (string & {})) | null);
/** The channel the record started on (for example `whatsapp`, `phone`, `widget`), or null. Team members can edit it. */
"source_channel": (string | null);
/** `conversation`, `call`, `external:<provider>`, `gated_ad:<source>`, `family_handoff`, `api_intake` or `unknown`; null when `source` needs no detail. */
"source_detail": (string | null);
/** `server_written` when Totem set the source from what the ad platform reported; otherwise `member_editable` (team members can change it). Null with `source`. */
"source_provenance": ((("server_written" | "member_editable") | (string & {})) | null);
/** When the record was created. */
"created_at": string;
/** Opaque current lead id, scoped to the authorized team and incarnation. */
"id": string;
/** Strong ETag of the exact retained lead source shown here; never an export capture version. */
"etag": string;
/** Actual source update time of this retained snapshot. */
"updated_at": string;
/** Always lead_source; this is not a captured Lead version. */
"object": "lead_source"
};
/** Source-backed CRM mutation metadata. It never invents an inventory version or grants read access through a write. */
"LeadSourceMutation": {
/** Always lead_source_mutation. */
"object": "lead_source_mutation";
/** True only when this operation created the retained lead. */
"created": boolean;
/** Whether the source values changed; an inert repeat is false. */
"changed": boolean;
/** For voice registration, whether the genuinely created contact was linked to this execution. A different stated contact stays held and grants no subsequent source access. */
"registered_lead_linked"?: boolean;
/** Current authorized source receipt, or null when an unverified duplicate must remain unlinked. */
"lead": (Schemas["LeadSourceReceipt"] | null)
};
/** Write receipt metadata only: no contact details or CRM content. */
"LeadSourceReceipt": {
/** Opaque current lead id, scoped to the authorized team and incarnation. */
"id": string;
/** Strong ETag of the exact retained lead source shown here; never an export capture version. */
"etag": string;
/** Actual source update time of this retained snapshot. */
"updated_at": string;
/** Always lead_source_receipt. */
"object": "lead_source_receipt"
};
/** The persisted lead result, or a validation-only result without a mutation. */
"LeadUpsertResult": (Schemas["LeadMutation"] | Schemas["LeadValidation"]);
/** A successful dry run; it never represents a persisted lead. */
"LeadValidation": {
/** Always lead_validation. */
"object": "lead_validation";
/** The request passed validation; no mutation or outreach was performed. */
"valid": true
};
"LibraryDeliveryReceipt": {
/** Always library_delivery_receipt. */
"object": "library_delivery_receipt";
/** Current durable delivery state. Reconcile partial or uncertain delivery before repeating it. */
"status": (("sent" | "partial" | "uncertain" | "failed" | "held" | "in_progress" | "prepared") | (string & {}));
/** Parts with retained provider acceptance; prepared web chat parts are separate. */
"sent_parts": number;
/** Total parts of this reviewed delivery. */
"total_parts": number;
/** True only for a persisted web chat response prepared for the caller to render. */
"prepared": boolean;
/** Current source-bound prepared response reference, or null for other delivery states. */
"prepared_reference": (string | null);
/** Closed delivery disposition without private provider errors. */
"reason": (("none" | "already_sent" | "resource_changed" | "conversation_changed" | "session_closed" | "delivery_refused" | "provider_outcome_unknown" | "content_erased" | "not_prepared") | (string & {}))
};
"LibraryEntry": {
/** Always library_entry. */
"object": "library_entry";
/** Current server-issued opaque content reference; never parse or modify it. */
"reference": string;
/** Current entry display name. */
"name": string;
/** Current authored entry description. */
"description": string;
/** A text message, media entry or ordered sequence. */
"type": (("message" | "media" | "sequence") | (string & {}));
/** Current authored revision; sending requires the revision you reviewed. */
"revision": number;
/** Number of sendable parts in this current entry. */
"part_count": number;
/** Number of files in this current entry. */
"file_count": number;
/** Bounded authorized content preview. */
"preview": string;
/** Configured entry language, or null. */
"language": (string | null);
/** Ordered authorized parts, included by the detail read. */
"parts"?: Array<{
/** Text or media part of this entry. */
"kind": (("message" | "media") | (string & {}));
/** Authored message or media caption text. */
"text": string;
/** Stored file name when available, otherwise null. */
"file_name": (string | null);
/** Stored media type when available, otherwise null. */
"media_type": (string | null)
}>
};
"LibraryEntryList": {
/** Always library_entry_list. */
"object": "library_entry_list";
/** Current permitted entries on this page. */
"data": Array<Schemas["LibraryEntry"]>;
/** Opaque next-page cursor, or null after the last page. */
"next_cursor": (string | null);
/** Whether more discovery pages remain or this result is complete. */
"coverage": (("page" | "complete") | (string & {}));
/** Total entries when established by the bounded discovery, otherwise null. */
"total": (number | null);
/** Number of entries matched within this returned page. */
"matched_in_page": number
};
"LibraryPreparedResponse": {
/** Always library_prepared_response. */
"object": "library_prepared_response";
/** Prepared visitor response format version, always one. */
"version": 1;
/** Ordered persisted visitor messages; preserve this order when rendering. */
"messages": Array<{
/** Stable opaque prepared message identity for visitor rendering. */
"id": string;
/** Always assistant. */
"role": "assistant";
/** Prepared visitor message type. */
"kind": (("text" | "image" | "video" | "audio" | "document") | (string & {}));
/** Prepared text or caption when present. */
"content"?: string;
/** Persisted message time in UTC. */
"timestamp": string;
/** File metadata and an opaque attachment reference; resolve it with its separate permission. */
"media"?: {
/** Current server-issued opaque content reference; never parse or modify it. */
"attachment_reference": string;
/** Canonical file MIME type. */
"mime_type": string;
/** Canonical file name when known, otherwise null. */
"file_name": (string | null);
/** Known file size in bytes, otherwise null. */
"file_size": (number | null)
}
}>
};
/** The integration that owns the key, with the teams the key reads. */
"Me": {
/** Always `integration`. */
"object": "integration";
/** Public id of the integration. */
"id": string;
/** Present only for a hosted service identity. Its empty team list grants no team access; each operation still requires its signed execution context. */
"principal_kind"?: "automation_service";
/** `true` for a real key; `false` in example data. */
"livemode": boolean;
/** The name an administrator gave the integration. */
"name": string;
/** The key used for this request. */
"key": {
/** The last four characters of the key used for this request. */
"last4": string
};
/** The teams this key reads today. Their details are in `GET /v1/teams`. */
"teams": Array<string>;
/** The key’s explicitly granted scopes; old read-only keys never gain writes or note content implicitly. */
"scopes": Array<(("teams:read" | "crm:read" | "calls:read" | "messages:read" | "calendar:read" | "crm:write" | "crm:notes:read" | "tasks:write" | "notifications:write" | "notifications:incidents:write" | "calendar:availability:read" | "calendar:write" | "calendar:payments:read" | "calendar:payment_links:send" | "messages:send" | "crm:context:read" | "events:read" | "crm:scheduled_contacts:write" | "crm:handoff:write" | "calls:write" | "referrals:write" | "quotes:write" | "assistants:run" | "crm:custom_values:read" | "crm:custom_values:write" | "knowledge:read" | "messages:content:read" | "calls:transcripts:read" | "calls:recordings:read" | "attachments:read" | "library:read" | "catalog:read" | "payments:read" | "calls:analysis:write" | "calendar:analysis:write") | (string & {}))>
};
/** A team member, by display name only: Totem exports no email, phone or role. */
"Member": {
/** Public id of the record. */
"id": string;
/** Always `member`. */
"object": "member";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The member's display name, or first and last name, or null when none is stored. Totem exports no email, phone or role. */
"display_name": (string | null)
};
/** Every Member object, in one response: this list is never paged. */
"MemberList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Member"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Configured sender references without provider identifiers or credentials. */
"MessageChannels": {
/** Identifies a configured message sender inventory. */
"object": "message_channels";
/** Current configured senders, limited to one hundred entries. References are scoped to this integration and team. */
"channels": Array<{
/** Opaque reference to one current configured sender returned by messages.channels. A changed connection invalidates it. */
"reference": string;
/** Messaging channel served by this configured sender. */
"channel_type": (("whatsapp" | "facebook" | "instagram" | "tiktok" | "email" | "sms" | "chatbot") | (string & {}));
/** Configured sender display name. */
"name": string
}>
};
/** Current-source message result without body, destination or provider identifiers. */
"MessageReceipt": {
/** Identifies a retained message delivery result. */
"object": "message_receipt";
/** Sent requires actual provider acceptance; prepared identifies a retained web chat response awaiting its delivery surface. */
"status": (("sent" | "prepared") | (string & {}));
/** Current conversation in the selected team. Tenant integrations must supply its identifier; hosted processing may derive its exact signed source. */
"conversation_id": string
};
/** A business notification, including its summary and linked lead, call or conversation. Personal notes and technical alerts are excluded. */
"Notification": {
/** Public id of the record. */
"id": string;
/** Always `notification`. */
"object": "notification";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team this record belongs to. */
"team": string;
/** The associated lead, or null when none is linked or its public id is not captured yet. */
"lead": (string | null);
/** The associated call, or null. */
"call": (string | null);
/** The associated conversation, or null. */
"conversation": (string | null);
/** The stored business notification text, trimmed and limited to 10,000 characters; null when blank. It can contain personal data and a source summary already copied into the notice. The API does not independently read or export message content, transcripts, call summaries, lead notes or technical errors. */
"summary": (string | null);
/** `new`, `read` or `archived`; null for an unknown stored status. Reading the API never marks a notice read. */
"status": ((("new" | "read" | "archived") | (string & {})) | null);
/** The business source: call, chat, reminder, task or manual (also used for an absent source). Unknown and technical sources are excluded. */
"source": (("call" | "chat" | "reminder" | "task" | "manual") | (string & {}));
/** The recorded handoff reason, or null. No reason is inferred from the summary. */
"handoff_reason": ((("missed_team_appointment") | (string & {})) | null);
/** When the notification was created in Totem (UTC), or null. */
"created_at": (string | null);
/** Increases every time one of the record's exported fields changes. Apply a change only when its version is greater than the one you hold. */
"version": number;
/** When Totem recorded this version (UTC). It is not the time the business event happened. */
"updated_at": string
};
/** A page of Notification objects, in a stable order that carries no meaning. */
"NotificationList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Notification"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
};
/** Minimal notification receipt without its content, recipients or internal source references. */
"NotificationReceipt": {
/** Always notification_receipt. */
"object": "notification_receipt";
/** Opaque notification id bound to its team and incarnation. */
"id": string;
/** Present only for an explicitly authorized incident report; it never asserts verified attendance or delivery. */
"handoff"?: {
/** The explicit customer-reported incident reason. */
"reason": "missed_team_appointment";
/** Current canonical state: pending human attention, already resolved by a human, or only an alert because no source-bound lead exists. */
"incident": (("pending_human" | "resolved" | "lead_missing") | (string & {}))
};
/** Notification status recorded by the operation. */
"status": (("new" | "archived") | (string & {}))
};
/** Durable operation status, available only to its current authorized integration and team. */
"Operation": {
/** Always operation. */
"object": "operation";
/** Opaque durable operation id. */
"id": `op_${string}`;
/** Durable operation state; outcome_unknown must be reconciled before repeating the effect. */
"status": (("queued" | "running" | "succeeded" | "failed" | "cancelled" | "outcome_unknown") | (string & {}));
/** The original endpoint executed by this operation. */
"endpoint": (("tasks.create" | "tasks.complete" | "notifications.create" | "bookings.create" | "bookings.cancel" | "bookings.reschedule" | "bookingPayments.sendLink" | "messages.send" | "messages.requestInfo" | "messages.prepareReply" | "calls.start" | "library.send" | "catalog.send" | "quotes.recordOutcome" | "assistants.run") | (string & {}));
/** When this operation was accepted, in UTC. */
"created_at": string;
/** When its current state was recorded, in UTC. */
"updated_at": string;
/** Minimal public resource receipt after success, otherwise null. */
"result": (({
/** Always task_receipt. */
"object": "task_receipt";
/** Opaque task id bound to its team and incarnation; never parse it. */
"id": `task_${string}`;
/** Task state recorded by the completed operation. */
"status": ("open" | "done")
} | {
/** Always notification_receipt. */
"object": "notification_receipt";
/** Opaque notification id bound to its team and incarnation. */
"id": string;
/** Present only for an explicitly authorized incident report; it never asserts verified attendance or delivery. */
"handoff"?: {
/** The explicit customer-reported incident reason. */
"reason": "missed_team_appointment";
/** Current canonical state: pending human attention, already resolved by a human, or only an alert because no source-bound lead exists. */
"incident": (("pending_human" | "resolved" | "lead_missing") | (string & {}))
};
/** Notification status recorded by the operation. */
"status": ("new" | "archived")
} | {
/** Always booking_receipt. */
"object": "booking_receipt";
/** Booking id. */
"id": string;
/** Verified current booking outcome; unchanged means no new booking mutation. */
"status": ("scheduled" | "cancelled" | "rescheduled" | "unchanged");
/** Original booking when a reschedule replaced it, otherwise null. */
"previous_id": (string | null)
} | {
/** Always booking_payment_receipt. */
"object": "booking_payment_receipt";
/** Server-issued opaque calendar reference; never parse or modify it. */
"reference": string;
/** Current payment requirement, reconciliation state or accepted link send. */
"outcome": (("payment_required" | "payment_processing" | "payment_review" | "link_sent") | (string & {}));
/** Always false: a payment request or sent link does not confirm a booking. */
"booking_confirmed": false
} | {
/** Identifies a retained message delivery result. */
"object": "message_receipt";
/** Sent requires actual provider acceptance; prepared identifies a retained web chat response awaiting its delivery surface. */
"status": ("sent" | "prepared");
/** Current conversation in the selected team. Tenant integrations must supply its identifier; hosted processing may derive its exact signed source. */
"conversation_id": string
} | {
/** Always requested_info_receipt. */
"object": "requested_info_receipt";
/** Whether this admission created the queued request or found an existing request in progress. This is an admission snapshot. */
"status": ("queued" | "already_queued");
/** Configured response channel chosen by current staff policy. */
"channel": (("whatsapp" | "email") | (string & {}));
/** This queue acknowledgement does not attest delivery, including when read again after dispatch. */
"delivery_confirmed": false;
/** Whether the configured response includes the requested information field. */
"includes_requested_detail": boolean;
/** The canonical queue estimate at admission, in minutes; not a delivery guarantee. */
"eta_minutes": 5
} | {
/** Always first_reply_receipt. */
"object": "first_reply_receipt";
/** Current source-proven context, or null when no content may be disclosed. */
"first_reply": ({
/** Always first_reply_v1. */
"capability": "first_reply_v1";
/** Actual campaign delivery, preparation or suppression status. */
"status": string;
/** Canonical bounded explanation when available. */
"reason"?: string;
/** Language selected by the canonical first-reply policy. */
"language"?: string;
/** Authorized bounded text from the canonical campaign receipt. */
"sent_content": Array<string>;
/** Authorized bounded text prepared for the visitor when present. */
"prepared_content"?: Array<string>;
/** Last delivered question when the canonical campaign recorded one. */
"last_delivered_question"?: string
} | null);
/** Whether the canonical campaign or human ownership suppresses the normal assistant reply. */
"skip_ai_reply": boolean;
/** Opaque prepared webchat content reference, or null. Resolve it with the same current content permissions. */
"prepared_reference": (string | null)
} | {
/** Always call_start_receipt. */
"object": "call_start_receipt";
/** The provider accepted call initiation. This is not evidence that the person answered or the call completed. */
"status": "accepted";
/** Opaque canonical call id when its retained record exists; otherwise null. Never a raw provider id. */
"call_id": (string | null)
} | {
/** Always quote_outcome_receipt. */
"object": "quote_outcome_receipt";
/** Canonical commercial disposition was recorded. This does not claim independent verification of the external quote or delivery. */
"status": "recorded";
/** External delivery evidence was attested by the caller. */
"delivery_evidence": "caller_attested"
} | {
/** Always assistant_run_receipt. */
"object": "assistant_run_receipt";
/** The original canonical turn completed with an actual retained assistant reply, not merely queue admission. */
"status": "completed";
/** Opaque current conversation. Read reply bodies through conversations.messages with its separate current content grant. */
"conversation_id": string
} | {
/** Always library_delivery_receipt. */
"object": "library_delivery_receipt";
/** Current durable delivery state. Reconcile partial or uncertain delivery before repeating it. */
"status": ("sent" | "partial" | "uncertain" | "failed" | "held" | "in_progress" | "prepared");
/** Parts with retained provider acceptance; prepared web chat parts are separate. */
"sent_parts": number;
/** Total parts of this reviewed delivery. */
"total_parts": number;
/** True only for a persisted web chat response prepared for the caller to render. */
"prepared": boolean;
/** Current source-bound prepared response reference, or null for other delivery states. */
"prepared_reference": (string | null);
/** Closed delivery disposition without private provider errors. */
"reason": (("none" | "already_sent" | "resource_changed" | "conversation_changed" | "session_closed" | "delivery_refused" | "provider_outcome_unknown" | "content_erased" | "not_prepared") | (string & {}))
} | {
/** Always catalog_send_receipt. */
"object": "catalog_send_receipt";
/** The accepted single-product or product-list provider format. */
"sent_as": (("catalog_product" | "catalog_product_list") | (string & {}));
/** Number of reviewed variants in the accepted selection. */
"variant_count": number
}) | null);
/** Safe failure information, or null. */
"error": ({
/** Closed failure code without provider text, task content or credentials. */
"code": (("authorization_failed" | "configuration_missing" | "input_expired" | "invalid_input" | "resource_missing" | "execution_failed" | "outcome_unknown") | (string & {}))
} | null)
};
/** An error, as `application/problem+json` (RFC 9457). */
"Problem": {
/** A link to this error's entry in the docs; equal to `doc_url`. */
"type": string;
/** A short summary of the error, in English. It can change: branch on `code`. */
"title": string;
/** The HTTP status. */
"status": number;
/** Machine-readable error code. New codes may appear: handle an unknown one by its status. */
"code": (TotemErrorCode | (string & {}));
/** The `Totem-Request-Id` of the request. Quote it when you contact support. */
"request_id": string;
/** The parameter, header or body field at fault, when there is one. Never its value. */
"param"?: string;
/** The docs entry for this code: when it happens and what to do. */
"doc_url": string
};
/** Content-free quote outcome receipt; no customer, provider, stage or private effect selectors. */
"QuoteOutcomeReceipt": {
/** Always quote_outcome_receipt. */
"object": "quote_outcome_receipt";
/** Canonical commercial disposition was recorded. This does not claim independent verification of the external quote or delivery. */
"status": "recorded";
/** External delivery evidence was attested by the caller. */
"delivery_evidence": "caller_attested"
};
/** Content-free receipt with no destination existence or identity disclosure. */
"ReferralReceipt": {
/** Always referral_receipt. */
"object": "referral_receipt";
/** Submission received. Unverified duplicates are acknowledged neutrally without changing or identifying an existing contact. This does not claim approval, outreach or provider delivery. */
"status": "received"
};
/** Immutable queue admission acknowledgement, without content, destination or provider identifiers. */
"RequestedInfoReceipt": {
/** Always requested_info_receipt. */
"object": "requested_info_receipt";
/** Whether this admission created the queued request or found an existing request in progress. This is an admission snapshot. */
"status": (("queued" | "already_queued") | (string & {}));
/** Configured response channel chosen by current staff policy. */
"channel": (("whatsapp" | "email") | (string & {}));
/** This queue acknowledgement does not attest delivery, including when read again after dispatch. */
"delivery_confirmed": false;
/** Whether the configured response includes the requested information field. */
"includes_requested_detail": boolean;
/** The canonical queue estimate at admission, in minutes; not a delivery guarantee. */
"eta_minutes": 5
};
/** Metadata of a persisted callback promise, without customer contact details or provider selectors. */
"ScheduledContactReceipt": {
/** Always scheduled_contact_receipt. */
"object": "scheduled_contact_receipt";
"lead": Schemas["LeadSourceReceipt"];
/** The time committed to the existing delayed-contact dispatcher. */
"contact_at": string;
/** Committed contact channel. This receipt does not claim provider delivery. */
"channel": (("call" | "whatsapp") | (string & {}));
/** Whether this operation genuinely created the contact. */
"created": boolean
};
/** Minimal task receipt without task content or internal ids. */
"TaskReceipt": {
/** Always task_receipt. */
"object": "task_receipt";
/** Opaque task id bound to its team and incarnation; never parse it. */
"id": `task_${string}`;
/** Task state recorded by the completed operation. */
"status": (("open" | "done") | (string & {}))
};
/** A team this key reads, with its time zone and default country. */
"Team": {
/** Public id of the record. */
"id": string;
/** Always `team`. */
"object": "team";
/** `true` for real data; `false` in example data. */
"livemode": boolean;
/** The team's name as it appears in Totem, or null when none is stored. */
"name": (string | null);
/** The team's IANA time zone: its business-hours zone when that is valid, otherwise its default country's (Europe/Madrid when neither is set). Interpret the team's local times with it. */
"timezone": string;
/** The team's default country (ISO 3166-1 alpha-2), which Totem uses when someone types a phone number without a prefix; null when none is set. The API does not apply it: `Lead.phone` is validated without a default country, so a number stored without its country prefix reads `phone_status: invalid`. */
"default_country": (string | null)
};
/** Every Team object, in one response: this list is never paged. */
"TeamList": {
/** Always `list`. */
"object": "list";
/** The items of this page. */
"data": Array<Schemas["Team"]>;
/** `true` when another page follows: fetch it with `next_cursor`, even if this page holds fewer items than `limit`. */
"has_more": boolean;
/** Opaque cursor for the next page, or null on the last page. Never parse it. */
"next_cursor": (string | null)
}
}
export interface OperationContracts {
/**
 * Get the integration behind this key
 *
 * Returns the integration this key belongs to: its name, the last four characters of the key, the teams it reads today and its scopes. Call it first to check that a key works and to see which teams it reads; `GET /v1/teams` has their details.
 */
"me.get": { response: Schemas["Me"]; query: {

}; path: {

}; body: never };
/**
 * List the teams this key reads
 *
 * Lists every team this key reads, in one response that is never paged, including teams that are restricted for now (their other endpoints answer `403`). Re-read it on every sync run: a team that is no longer listed has left the key, so delete its copy and its cursor.
 */
"teams.list": { response: Schemas["TeamList"] & {
/** Always `list`. */
"object"?: "list";
/** Every team this key reads, restricted ones included. */
"data"?: Array<Schemas["Team"]>;
/** Always `false`: this list is never paged. */
"has_more"?: false;
/** Always `null`: there is no next page. */
"next_cursor"?: null
}; query: {

}; path: {

}; body: never };
/**
 * Get a team
 *
 * Returns one team this key reads: its name, time zone and default country. A team the key does not read answers `404 resource_missing`.
 */
"teams.get": { response: Schemas["Team"]; query: {

}; path: {
/** The team's public id. */
"id": string
}; body: never };
/**
 * List boards with their stages
 *
 * Returns a page of the team's boards, each with its stages in pipeline order. Boards also arrive in the changes feed; read this list when you need them at once, for example when a lead names a stage you have not seen yet.
 */
"boards.list": { response: Schemas["BoardList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined
}; path: {

}; body: never };
/**
 * List team members
 *
 * Lists every member of the team in one response that is never paged and takes no `limit` or `cursor`. Members are not in the changes feed: read this list when you start syncing a team, again when an item names a member you do not know, and at least once a day. A member who leaves the team drops out of the list while older records keep naming its id, so keep a name you need from an earlier read.
 */
"members.list": { response: Schemas["MemberList"] & {
/** Always `list`. */
"object"?: "list";
/** Every member of the team. */
"data"?: Array<Schemas["Member"]>;
/** Always `false`: this list is never paged. */
"has_more"?: false;
/** Always `null`: there is no next page. */
"next_cursor"?: null
}; query: {

}; path: {

}; body: never };
/**
 * List bookable services
 *
 * Lists every bookable service of the team in one response that is never paged and takes no `limit` or `cursor`. Bookable services are not in the changes feed: read this list when you start syncing a team, again when a booking names a service you do not know, and at least once a day. A deleted service drops out of the list while its bookings keep naming its id, so keep a service name you need from an earlier read.
 */
"booking_services.list": { response: Schemas["BookingServiceList"] & {
/** Always `list`. */
"object"?: "list";
/** Every bookable service of the team. */
"data"?: Array<Schemas["BookingService"]>;
/** Always `false`: this list is never paged. */
"has_more"?: false;
/** Always `null`: there is no next page. */
"next_cursor"?: null
}; query: {

}; path: {

}; body: never };
/**
 * Discover current booking services
 *
 * Reads current enabled services, descriptive options, public payment terms and published booking pages, preserving hosted assistant allowlists. No lead or captured inventory is required; availability supplies actionable option and slot references. The cursor is bound to this integration and current source configuration.
 */
"booking_services.options": { response: Schemas["CalendarServiceOptionsResult"]; query: {

}; path: {

}; body: {
/** Ranks recognizable service names without hiding permitted fallbacks. */
"query"?: string | undefined;
/** Maximum services in this page, from 1 to 50. */
"limit"?: number | undefined;
/** Opaque cursor from this principal, source and search. */
"cursor"?: string | undefined
} };
/**
 * List leads
 *
 * Returns a page of the team's leads and clients, in a stable order that carries no meaning. Filter by at most one of `board`, `stage` or `status`; a board or stage the team does not have returns an empty page. To keep a copy up to date, follow the changes feed instead of re-reading this list.
 */
"leads.list": { response: Schemas["LeadList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined;
/** Only leads on this board. At most one of `board`, `stage` and `status`. */
"board"?: string | null | undefined;
/** Only leads in this stage. At most one of `board`, `stage` and `status`. */
"stage"?: string | null | undefined;
/** Only leads with this status. At most one of `board`, `stage` and `status`. */
"status"?: ("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | null | undefined
}; path: {

}; body: never };
/**
 * Upsert a lead by identity
 *
 * Creates a lead with supplied CRM fields (201) or fills only missing contact details on an existing identity (200), appending an optional note in the same idempotent transaction; changing an existing pipeline value requires conditional PATCH or returns `400 invalid_request`. Import never revives or arms outreach; inbound requires its separate capability and a phone supplied by the person, with destination, consent and durable outreach guards. A validate_only dry run returns 200 without writes, conflicting identities return `409 ambiguous_identity`, and external ids never cross integration namespaces.
 */
"leads.upsert": { response: Schemas["LeadUpsertResult"]; query: {

}; path: {

}; body: {
/** Required contact contract: import never arms outreach; inbound requires an explicitly enabled principal and a phone supplied by the person. */
"origin": ("import" | "inbound");
/** Request a source-backed metadata receipt rather than an export capture version; operational source authorization still applies. */
"response_view"?: "source" | undefined;
/** Phone supplied by the person in E.164 format. */
"phone"?: string | undefined;
/** Contact email address. */
"email"?: string | undefined;
/** First name or display name. */
"name"?: string | undefined;
/** Surname. */
"surname"?: string | undefined;
/** Company name. */
"company"?: string | undefined;
/** Contact website; it is stored without fetching it. */
"website"?: string | undefined;
/** Destination board belonging to the selected team. */
"board"?: string | undefined;
/** Destination stage belonging to the selected board and team; a move never bypasses outreach guards. */
"stage"?: string | undefined;
/** Business tags, replacing the editable set; system tags cannot be set or removed. */
"tags"?: Array<string> | undefined;
/** Lead priority. */
"priority"?: ("low" | "medium" | "high" | "urgent") | undefined;
/** Estimated value in major units, without an implied currency. */
"estimated_value"?: number | undefined;
/** Assigned team members, replacing the previous editable set. */
"assignees"?: Array<string> | undefined;
/** Your integration’s external id, scoped to this principal and team; never another integration’s namespace. */
"external_id"?: string | undefined;
/** Validate without creating, updating or contacting anyone; the response is a lead_validation object. */
"validate_only"?: boolean | undefined;
/** Explicit consent evidence; omitted consent is never treated as granted and import does not record it. */
"consent"?: {
/** Auditable WhatsApp consent evidence, attributed to the integration. */
"whatsapp"?: {
/** The person’s explicit WhatsApp choice; inbound origin alone never grants consent. */
"granted": boolean;
/** When the person made this choice. */
"captured_at": string;
/** How this explicit consent was collected. */
"method": string;
/** Reference to the notice shown when collecting this choice. */
"notice_ref": string
} | undefined
} | undefined;
/** Optional qualification note appended atomically to a created or authorized existing lead. Blank text writes no note; replaying the same Idempotency-Key does not append again. Reading note content still requires its separate grant. */
"note"?: string | undefined;
/** Initial exact-name values set only when this request creates a new lead; existing or revived leads ignore them. Requires current crm:custom_values:write in addition to crm:write; hosted assistant/source requests cannot supply this field. Provenance is server-owned; editing existing values still requires the independent custom-values If-Match. */
"initial_custom_values"?: Array<{
/** Exact stable field name; names are never inferred from labels. */
"name": string;
/** Human-readable label. */
"label": string;
/** Exact string value; an empty string is a stored value, not deletion. */
"value": string
}> | undefined
} };
/**
 * Read current CRM context
 *
 * Reads the current canonical lead and bounded team context without an export capture version. Hosted executions resolve only their retained source lead. Notes and custom values require their own explicit current content permission before any content read; the business authoring profile is never included.
 */
"crm.context": { response: Schemas["CrmContext"]; query: {

}; path: {

}; body: {
/** Own-team retained lead. Hosted executions may name only their current canonical source lead; omit to resolve it. */
"lead_id"?: string | undefined;
/** Optional owned retained conversation. Tenant keys may use it for current-message context; hosted executions may name only their exact signed source. */
"conversation_id"?: string | undefined;
/** Explicitly request bounded note content; requires its separate content grant before any note read. */
"include_notes"?: boolean | undefined;
/** Explicitly request custom values with their independent content permission. */
"include_custom_values"?: boolean | undefined;
/** Request bounded messages of the exact current signed conversation with its independent content grant. */
"include_messages"?: boolean | undefined;
/** Request bounded current lead call transcript/summary evidence with its independent transcript grant. */
"include_calls"?: boolean | undefined;
/** Request current exact-lead merchant evidence with the separate payments content permission. */
"include_payments"?: boolean | undefined;
/** Request recording coverage with its separate grant; content stays unavailable until a retained reference adapter exists. */
"include_recordings"?: boolean | undefined;
/** Request attachment coverage with its separate grant; no provider media URL is disclosed. */
"include_attachments"?: boolean | undefined;
/** Additionally return the canonical bounded model projections, using the same sanitizer as the existing assistants. */
"representation"?: "model" | undefined
} };
/**
 * Schedule a requested contact
 *
 * Persists a requested callback after current recipient, consent, hold, channel and thirty-day checks; select an owned lead or a genuinely new contact, while hosted execution may derive its exact source. New registration and scheduling share the canonical transaction, and the receipt proves a saved promise without claiming delivery. Reuse Idempotency-Key; optional current source If-Match protects a reviewed existing lead.
 */
"leads.scheduleContact": { response: Schemas["ScheduledContactReceipt"]; query: {

}; path: {

}; body: {
/** Current own-team lead. Hosted executions may only name their canonical current source lead. */
"lead_id"?: string | undefined;
/** Create a genuinely new contact and schedule through the same canonical intake operation; cannot be combined with lead_id. */
"new_contact"?: {
/** Name supplied by the person for a genuinely new contact. */
"name": string;
/** Phone supplied by the person; never used as proof of source ownership. */
"phone": string
} | undefined;
/** Requested future contact time, strictly within thirty days of admission. */
"contact_at": string;
/** Requested business channel; current recipient and delivery configuration are validated by the server. */
"channel": ("call" | "whatsapp");
/** Operational callback note only; never a model prompt or call objective. */
"note"?: string | undefined;
/** Explicit attestation that the person requested this contact time; it never overrides opt-outs or current holds. */
"customer_confirmed": true
} };
/**
 * Hand off to a configured organization office
 *
 * Uses the configured organization directory and current owned source; tenant integrations select their lead while hosted execution derives its retained conversation, call or voice session. An unverified identity cannot take over an existing destination contact, and ambiguity follows human review. The content-free receipt grants no general cross-team access and does not claim delivery of a queued notification.
 */
"leads.handoff": { response: Schemas["FamilyHandoffReceipt"]; query: {

}; path: {

}; body: {
/** Owned retained source lead, required for tenant keys; hosted execution may derive its current source without a lead yet. */
"lead_id"?: string | undefined;
/** Exact configured organization office slug; omit for the current office. */
"office"?: string | undefined;
/** Opaque current board from that configured office; omit for its canonical default. */
"board_id"?: string | undefined;
/** Qualified need for the receiving office, preserving relevant customer statements. */
"summary": string;
/** Name supplied by the person; existing canonical identity stays authoritative. */
"name"?: string | undefined;
/** Phone supplied by the person for the referral; never proof of authority over an existing contact. */
"phone"?: string | undefined;
/** Email supplied by the person; ambiguity is routed to canonical human review. */
"email"?: string | undefined
} };
/**
 * Submit a consented referral to Totem Studio
 *
 * Submits a consented referral through the canonical CRM engine to the fixed Totem intake; the source lead provides provenance without selecting or granting destination access. The neutral received acknowledgement reveals neither destination identity nor existing matches, and unverified matching records remain unchanged. Attest consent and reuse Idempotency-Key for retries.
 */
"referrals.create": { response: Schemas["ReferralReceipt"]; query: {

}; path: {

}; body: {
/** Real name supplied by the person; placeholder names are rejected. */
"name": string;
/** Contact phone in E.164. Hosted execution may omit it only when its actual retained transport supplies a current verified phone; hidden source identifiers never become phones. */
"phone"?: string | undefined;
/** Qualified context for the fixed Totem referral; source provenance is attached only by the server. */
"note": string;
/** Business tags for a genuinely new referred contact. Existing destination tags remain authoritative. */
"tags"?: Array<string> | undefined;
/** Explicit attestation that the person wants Totem AI/automation contact. It is not WhatsApp marketing consent and never overrides the destination review policy. */
"consent": true;
/** Optional owned source lead for provenance. Hosted execution may name only its current lead; this never selects or grants access to a Totem destination contact. */
"lead_id"?: string | undefined
} };
/**
 * Record an attested external quote outcome
 *
 * Records the caller’s external calculator and delivery attestation against its current owned source, reusing configured commercial disposition and one-shot review or closure effects. Totem does not independently verify those external facts; callers cannot select destination teams, providers, private effects or attempt tokens. Current source, configuration and authority are rechecked before effects; reuse Idempotency-Key and reconcile outcome_unknown before repeating.
 */
"quotes.recordOutcome": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current own-team lead; hosted execution may only name its current canonical source lead. */
"lead_id"?: string | undefined;
/** Exact current owned conversation for tenant integrations; hosted executions derive their retained source. */
"conversation_id"?: string | undefined;
/** Exact current owned call, as an alternative to conversation_id. */
"call_id"?: string | undefined;
/** Stable reference from the external calculator, scoped to this lead and source. */
"quote_reference": string;
/** SHA-256 of the exact external calculator revision attested by the caller. */
"quote_revision_hash": string;
/** Whether the external calculator produced a numeric offer accepted for delivery. */
"quoted": boolean;
/** Canonical refusal or review reason. Omit for a numeric offer. */
"reason"?: ("BELOW_MINIMUM" | "BELOW_MINIMUM_REQUIRES_REVIEW" | "ABOVE_MAXIMUM" | "ABOVE_MAXIMUM_REQUIRES_REVIEW" | "PERSONAL_STUDY_REQUIRED") | undefined;
/** Qualified quote summary for canonical CRM history or configured review email; never a model prompt. */
"summary"?: string | undefined;
/** At most one attested receipt per supported channel. Numeric quotes require a receipt; refusals cannot carry proposal deliveries. */
"deliveries"?: Array<{
/** External delivery channel attested by the caller. */
"channel": ("email" | "whatsapp");
/** External acceptance reference supplied and attested by the caller; Totem does not independently verify it. */
"external_receipt": string;
/** External acceptance time attested by the caller; must be current. */
"accepted_at": string
}> | undefined
} };
/**
 * Get a lead with its attribution and response
 *
 * Returns one lead with its two facets: `attribution` (where it came from) and `response` (how the team has answered it), each with its own `version`. A lead created moments ago can answer `404 resource_missing` until Totem has prepared it; the changes feed delivers it then.
 */
"leads.get": { response: Schemas["LeadDetail"]; query: {

}; path: {
/** The lead's public id. */
"id": string
}; body: never };
/**
 * Update editable CRM fields
 *
 * Updates only the declared CRM fields using the strong ETag from the current lead in If-Match; a stale version returns `412 version_conflict`. Omitted fields remain unchanged, opt-outs can only be added, contact changes never arm outreach and an empty diff writes nothing. System, assistant, automation and billing fields are refused.
 */
"leads.update": { response: Schemas["LeadMutation"]; query: {

}; path: {
/** The lead's public id. */
"id": string
}; body: {
/** E.164 contact phone, or null to clear it without arming outreach. */
"phone"?: (string | null) | undefined;
/** Contact email address, or null to clear it without arming outreach. */
"email"?: (string | null) | undefined;
/** First name or display name. */
"name"?: string | undefined;
/** Surname, or null to clear it. Omission preserves the current value. */
"surname"?: (string | null) | undefined;
/** Company name, or null to clear it. */
"company"?: (string | null) | undefined;
/** Contact website, or null to clear it; it is never fetched. */
"website"?: (string | null) | undefined;
/** Destination board belonging to the selected team. */
"board"?: string | undefined;
/** Destination stage belonging to the selected board and team; a move never bypasses outreach guards. */
"stage"?: string | undefined;
/** Business tags, replacing the editable set; system tags cannot be set or removed. */
"tags"?: Array<string> | undefined;
/** Lead priority. */
"priority"?: ("low" | "medium" | "high" | "urgent") | undefined;
/** Estimated value in major units, or null to remove the optional value; omission preserves it. */
"estimated_value"?: (number | null) | undefined;
/** Assigned team members, replacing the previous editable set. */
"assignees"?: Array<string> | undefined;
/** Current pipeline status. A transition into archived, converted or lost requires its dedicated action; an existing terminal status may be restated. An opted-out archived lead cannot be revived automatically. Cannot be combined with board/stage. */
"status"?: ("new" | "contacted" | "qualified" | "negotiating" | "converted" | "lost" | "archived" | "unreachable") | undefined;
/** The person’s explicit automated follow-up choice. Omission preserves it. ai never clears global opt-outs, human ownership, pauses, incidents or manual callbacks. */
"follow_up_preference"?: ("ai" | "human" | "none") | undefined;
/** Civil birth date, or null to clear it. */
"date_of_birth"?: (string | null) | undefined;
/** Your integration’s external id, scoped to this principal and team; never another integration’s namespace. */
"external_id"?: string | undefined;
/** Record an opt-out on every channel; the API cannot clear one. */
"do_not_contact"?: true | undefined;
/** Record an email opt-out; the API cannot clear one. */
"email_opt_out"?: true | undefined
} };
/**
 * Find leads by exact phone or email
 *
 * Finds the team's leads whose phone or email matches exactly, including archived, merged and client records (follow `merged_into` to the lead that was kept). Send exactly one of `phone` or `email` in the JSON body, never in the URL. Returns at most 10 leads, chosen from the first 20 records that match, in one response that never paginates.
 */
"leads.search": { response: Schemas["LeadList"] & {
/** Always `list`. */
"object"?: "list";
/** The matching leads: at most 10. */
"data"?: Array<Schemas["Lead"]>;
/** Always `false`, even when more records match: search returns at most 10 leads and has no next page. */
"has_more"?: false;
/** Always `null`: search does not paginate. */
"next_cursor"?: null
}; query: {

}; path: {

}; body: ExclusiveUnion<({
/** A phone number in E.164 (`+12025550123`). It finds the number stored in E.164, with or without the `+`, and in the layouts phone libraries write: `+1 202-555-0123`, `(202) 555-0123` and `2025550123`. Other layouts, such as `202 555 0123`, are not found. */
"phone": string
} | {
/** An email address. It finds records stored exactly as sent, or stored in lowercase. */
"email": string
})> };
/**
 * List a lead's activities
 *
 * Returns a page of the lead's activities: each change of its stage, status or assigned members, with when it happened and, when Totem recorded it, who made it. Pages are not in date order, so sort by `occurred_at`. Activities never change once written, and new ones also arrive in the changes feed.
 */
"leads.activities": { response: Schemas["ActivityList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined
}; path: {
/** The lead's public id. */
"id": string
}; body: never };
/**
 * List a lead’s note content
 *
 * Returns a cursor-paged list of this lead’s notes only when this principal has the separate explicit note-content grant and crm:notes:read scope. Existing read-only keys never gain note content automatically, and sector restrictions still apply. Cursors are bound to this principal, team and lead incarnation.
 */
"leads.notes": { response: Schemas["LeadNoteList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** Opaque note-page cursor bound to the current lead. */
"cursor"?: string | null | undefined;
/** Select the unversioned current source representation. */
"view"?: "source" | null | undefined
}; path: {
/** The lead's public id. */
"id": string
}; body: never };
/**
 * Add a lead note
 *
 * Appends one integration-authored plain-text note and returns only its metadata, never note content. An external id is scoped to this integration and lead, and Idempotency-Key safely replays the same logical request. Reading any note body requires the separate explicit note-content grant.
 */
"leads.addNote": { response: Schemas["LeadNoteReceipt"]; query: {

}; path: {
/** The lead's public id. */
"id": string
}; body: {
/** Plain-text note body; stored with the integration as its author. */
"body": string;
/** Your integration’s external id, scoped to this principal and team; never another integration’s namespace. */
"external_id"?: string | undefined;
/** Return metadata for the current source without an inventory capture version. */
"response_view"?: "source" | undefined
} };
/**
 * Archive a lead
 *
 * Archives the lead with a closed business reason using its current strong ETag in If-Match; stale versions return `412 version_conflict`. The destructive-change budget applies and an opt_out reason suppresses every contact channel. This route cannot merge, transfer or erase a lead.
 */
"leads.archive": { response: Schemas["LeadMutation"]; query: {

}; path: {
/** The lead's public id. */
"id": string
}; body: {
/** Public archive reason; merging and transfers within an organization are separate privileged operations. */
"reason": ("opt_out" | "no_consent" | "not_interested" | "not_qualified" | "no_contact" | "other");
/** Optional explanation of the archive reason. */
"detail"?: string | undefined
} };
/**
 * Read named lead custom values
 *
 * Requires the independent current custom-value content grant; exact names identify fields and current customFields override legacy formFields. Returns its own strong ETag, bound to the complete current snapshot and lead incarnation. Merged, erased and ambiguous duplicate-name sources are refused.
 */
"leads.customValues": { response: Schemas["LeadCustomValues"]; query: {
/** Select the unversioned current source representation. */
"view"?: "source" | null | undefined
}; path: {
/** The lead's public id. */
"id": string
}; body: never };
/**
 * Set or remove named lead custom values
 *
 * Changes up to 50 distinct exact names using the custom-values ETag in If-Match even for no-op requests; omitted values and unknown row attributes remain unchanged, while touched legacy values are migrated or removed atomically. Separate write permission never exports values: the receipt contains counts and a fresh ETag only. Retry the same logical write with the same Idempotency-Key; a replay renders current metadata without restoring old content.
 */
"leads.updateCustomValues": { response: Schemas["LeadCustomValuesReceipt"]; query: {
/** Select the unversioned current source representation. */
"view"?: "source" | null | undefined
}; path: {
/** The lead's public id. */
"id": string
}; body: {
/** Set these exact names; omitted fields remain unchanged. */
"set"?: Array<{
/** Exact stable field name; names are never inferred from labels. */
"name": string;
/** Human-readable label. */
"label": string;
/** Exact string value; an empty string is a stored value, not deletion. */
"value": string
}> | undefined;
/** Remove these exact names, including legacy copies. */
"remove"?: Array<string> | undefined
} };
/**
 * Delete a lead note
 *
 * Deletes only the named note under this lead incarnation using its current strong note ETag in If-Match; a stale version returns `412 version_conflict`. Success returns 204 with no JSON body and the changes feed retains a deletion marker. It never deletes or archives the parent lead.
 */
"leads.deleteNote": { response: Schemas["LeadNoteReceipt"] | void; query: {

}; path: {
/** The note’s parent lead id. */
"id": string;
/** The opaque note id within this lead incarnation. */
"note": string
}; body: never };
/**
 * Update a lead note
 *
 * Updates the note under this lead incarnation using its current strong note ETag in If-Match; stale versions return `412 version_conflict`. Only the note body and this integration’s external id can change, and the response contains metadata without content. An unchanged body creates no new note version.
 */
"leads.updateNote": { response: Schemas["LeadNoteReceipt"]; query: {

}; path: {
/** The note’s parent lead id. */
"id": string;
/** The opaque note id within this lead incarnation. */
"note": string
}; body: {
/** Plain-text note body; stored with the integration as its author. */
"body": string;
/** Your integration’s external id, scoped to this principal and team; never another integration’s namespace. */
"external_id"?: string | undefined;
/** Return metadata for the current source without an inventory capture version. */
"response_view"?: "source" | undefined
} };
/**
 * Create a task
 *
 * Accepts a same-team task request as a durable operation. Follow its operation id until completion; retries with the same Idempotency-Key return the same logical operation. The server fixes task provenance and actor; current members and lead ownership are checked again before execution.
 */
"tasks.create": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Task title, up to 300 characters. */
"title": string;
/** Task description in Markdown. */
"body_markdown"?: string | undefined;
/** Task priority; defaults to none. */
"priority"?: ("none" | "low" | "medium" | "high" | "urgent") | undefined;
"start_at"?: (string | null) | undefined;
"due_at"?: (string | null) | undefined;
/** Current team members assigned to this task. */
"assigned_to_ids"?: Array<string> | undefined;
"owner_id"?: (string | null) | undefined;
"lead_id"?: (string | null) | undefined;
/** Task tags, up to 30 entries of 50 characters. */
"tags"?: Array<string> | undefined;
/** Reminder preferences, or null for no reminder configuration. */
"reminders"?: ({
/** Whether this task has reminders enabled. */
"enabled": boolean;
/** Up to five offsets before the due time, each from 0 to 43,200 minutes. */
"offsets_minutes": Array<number>
} | null) | undefined
} };
/**
 * Complete a task
 *
 * Accepts completion of a task in the selected team as a durable operation. Completing a task already done is safe. The opaque task id and current execution authority are checked before any mutation; selecting a team never authorizes a task from another team.
 */
"tasks.complete": { response: Schemas["Operation"]; query: {

}; path: {
/** The task's public id. */
"id": `task_${string}`
}; body: Record<string, never> };
/**
 * List notifications
 *
 * Returns a page of business notifications with their summary and linked records; pass either `lead` or `status` to filter. Personal notes, technical alerts and notices whose linked source was erased are excluded. Reading never marks notices read; use the changes feed for updates and removals.
 */
"notifications.list": { response: Schemas["NotificationList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined;
/** Only the notifications linked to this lead: every item's `lead` is this id. A lead of another team, or one that does not exist, matches nothing. */
"lead"?: string | null | undefined;
/** Only notices with this status. At most one of `lead` and `status`. */
"status"?: ("new" | "read" | "archived") | null | undefined
}; path: {

}; body: never };
/**
 * Create a team notification
 *
 * Accepts an ordinary business notification as a durable operation; the server validates current lead ownership, routing and recipient access before saving the card and its existing delivery outboxes together. Exact recent chat alerts may merge without a second delivery. Reuse the same Idempotency-Key after an uncertain acknowledgement; technical/system alerts remain private.
 */
"notifications.create": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Business notification text, up to 5,000 characters; it must not be blank. */
"note": string;
/** Optional notification delivery title. */
"title"?: string | undefined;
/** Optional current lead belonging to the selected team. */
"lead_id"?: string | undefined;
/** Existing business department routing key. An unavailable department follows the team’s current fallback route. */
"department_id"?: string | undefined;
/** Queue the team’s configured delivery plan; defaults to true. Delivery is not promised by acceptance. */
"notify"?: boolean | undefined;
/** Explicit customer report that the team missed a promised call or appointment. Requires notifications:incidents:write; opens a canonical human incident or records an unlinked alert, never attendance or resolution. */
"handoff_reason"?: "missed_team_appointment" | undefined;
/** Initial inbox status; defaults to new. */
"status"?: ("new" | "archived") | undefined
} };
/**
 * List current message senders
 *
 * Returns bounded opaque references to currently configured permitted sending channels. It exposes no provider account identifiers, destinations or message content; sending rechecks the current connection and recipient.
 */
"messages.channels": { response: Schemas["MessageChannels"]; query: {

}; path: {

}; body: Record<string, never> };
/**
 * Queue the configured information response
 *
 * Queues staff-configured requested information for the current authorized lead. Current server configuration selects the WhatsApp or designed-email channel, sender and template; raw destinations and caller-selected templates are refused. The receipt confirms queue admission without claiming delivery; reuse Idempotency-Key after an uncertain acknowledgement.
 */
"messages.requestInfo": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current retained lead; hosted processing may derive its exact signed source. */
"lead_id"?: string | undefined;
/** The information requested by the contact, up to five hundred characters. The current staff configuration selects the sender and template. */
"info": string
} };
/**
 * Prepare the configured first reply
 *
 * Processes the configured first-reply campaign for the exact saved inbound conversation, preserving lifetime deduplication, human control and newer-message fences. Tenant integrations provide an owned conversation while hosted execution derives its signed source; configured Library content may be sent or prepared for webchat. Read the completed receipt before continuing the assistant because 202 only accepts the intent; private source identifiers and provider URLs are withheld.
 */
"messages.prepareReply": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current owned conversation. Required for tenant integrations; hosted execution derives its exact saved source. */
"conversation_id"?: string | undefined
} };
/**
 * Send a message
 *
 * Starts one durable send to a current owned conversation or canonical lead using a permitted configured sender. Current source, recipient, actor and channel rules are checked at the actual provider boundary. Prepared web chat responses are distinguished from provider acceptance; uncertain delivery must be reconciled before repeating it.
 */
"messages.send": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Choose the current conversation or a current lead and configured sender; never supply a raw destination. */
"target": ExclusiveUnion<({
/** Send within a current retained conversation. */
"kind": "conversation";
/** Current conversation in the selected team. Tenant integrations must supply its identifier; hosted processing may derive its exact signed source. */
"conversation_id"?: string | undefined
} | {
/** Use a current lead and a configured sending channel. */
"kind": "lead";
/** Current canonical lead whose stored contact details determine the destination. */
"lead_id": string;
/** Opaque reference to one current configured sender returned by messages.channels. A changed connection invalidates it. */
"channel_reference": string
})>;
/** One bounded text, approved WhatsApp template, calling invitation or current retained Library selection. */
"content": (ExclusiveUnion<({
/** Send an interactive WhatsApp calling invitation or permission request. */
"kind": "whatsapp_call";
/** Send the current configured WhatsApp call button. */
"action": "send_call_button";
/** Text displayed to the current WhatsApp recipient, up to one thousand twenty-four characters. */
"body_text": string;
/** Optional button label, up to twenty characters. */
"display_text"?: string | undefined;
/** Optional button lifetime in minutes, from one to forty-three thousand two hundred. */
"ttl_minutes"?: number | undefined
} | {
/** Send an interactive WhatsApp calling invitation or permission request. */
"kind": "whatsapp_call";
/** Request calling permission within the current WhatsApp reply window and permission limits. */
"action": "request_permission";
/** Text displayed to the current WhatsApp recipient, up to one thousand twenty-four characters. */
"body_text"?: string | undefined
})> | {
/** Send a plain text message through the selected channel. */
"kind": "text";
/** Message text, with at most twenty thousand characters. */
"text": string;
/** Email subject; omitted replies reuse the current thread subject. */
"subject"?: string | undefined
} | {
/** Send an approved WhatsApp template using current channel and Prelude rules. */
"kind": "template";
/** Exact name of a currently approved template on the configured WhatsApp account. */
"template_name": string;
/** Approved template language code, such as es or en_US. */
"language": string;
/** How the approved template identifies its body variables. */
"parameter_format"?: ("NAMED" | "POSITIONAL") | undefined;
/** Ordered body values for a positional template. */
"variable_values"?: Array<string> | undefined;
/** Named body values keyed by the approved template parameter names. */
"variable_values_map"?: {
[key: string]: string
} | undefined;
/** Dynamic URL button values keyed by the approved button index. */
"url_button_values"?: {
[key: string]: string
} | undefined;
/** Caller attestation that the template send was confirmed; this does not manufacture customer consent. */
"consent_confirmed": true
} | {
/** Send one current retained Library selection through its canonical delivery flow. */
"kind": "library";
/** Current server-issued opaque content reference; never parse or modify it. */
"asset_reference": string;
/** Optional caption for the current retained Library selection. */
"caption"?: string | undefined
})
} };
/**
 * Discover currently published chat assistants
 *
 * Returns bounded published assistant names and exact serving versions, bound to this integration and team. Drafts, disabled assistants, private instructions, tool configuration and workflow/provider identifiers are excluded. This read changes no configuration; a newer publication invalidates the selection.
 */
"assistants.options": { response: Schemas["AssistantOptions"]; query: {

}; path: {

}; body: Record<string, never> };
/**
 * Run a currently published chat assistant
 *
 * Admits a real API-origin turn through the published assistant gateway and existing execution, prepaid and contact rules; an existing conversation must belong to this integration and assistant. Current caller authority is checked before execution and every delegated effect; only an actual retained completed reply produces a completed-run receipt. Read reply text separately through conversations.messages with its independent content grant, reuse Idempotency-Key and never redispatch outcome_unknown.
 */
"assistants.run": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Short-lived opaque selection bound to this integration and the exact currently published assistant version; never a provider or workflow identifier. */
"reference": string;
/** User message for this real API-origin chat turn; it never proves a phone, transport identity or consent. */
"message": string;
/** Optional retained API-origin conversation owned by this same integration and selected assistant. Omit to begin a new session. */
"conversation_id"?: string | undefined
} };
/**
 * List permitted library entries
 *
 * Reads a bounded page of current permitted library content with an independent library-content grant. References bind the current source revision; raw file locations, provider identifiers and internal access lists stay private. Hosted discovery preserves the assistant library selection rules.
 */
"library.list": { response: Schemas["LibraryEntryList"]; query: {

}; path: {

}; body: {
/** Optional discovery query; hosted assistant discovery retains its canonical selection rules. */
"query"?: string | undefined;
/** Restrict discovery to this entry type. */
"type"?: ("message" | "media" | "sequence") | undefined;
/** Optional language filter. */
"language"?: string | undefined;
/** Current server-issued opaque content reference; never parse or modify it. */
"cursor"?: string | undefined;
/** Maximum entries on this page, between one and fifty. */
"limit"?: number | undefined
} };
/**
 * Read a permitted library entry
 *
 * Reads authorized text and file metadata for one current library reference. Current grant, source incarnation, revision and hosted assistant access are checked before content is read. It returns no raw media download location.
 */
"library.get": { response: Schemas["LibraryEntry"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"reference": string
} };
/**
 * Read a prepared library response
 *
 * Resolves a current owned prepared-response reference to ordered persisted text and media descriptors. It rechecks the current source, revision and content permission; media locations remain separate opaque attachment references. Prepared content is not a provider delivery claim.
 */
"library.prepared": { response: Schemas["LibraryPreparedResponse"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"reference": string
} };
/**
 * Resolve an authorized attachment
 *
 * Intentionally discloses the current canonical application-bucket file URL and bounded file metadata under an independent attachment-content grant. Only the exact retained owned library file from a prepared response may resolve; provider, foreign-bucket and caller-supplied URLs are refused. Current source and permission are checked on each resolution.
 */
"attachments.resolve": { response: Schemas["Attachment"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"reference": string
} };
/**
 * Send a reviewed library entry
 *
 * Starts a durable delivery of the current reviewed library revision to an owned retained conversation. Existing per-part progress, channel policy and uncertainty guards apply. Prepared web chat content is distinct from provider delivery; partial or uncertain delivery is never silently repeated.
 */
"library.send": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"reference": string;
/** Current authored revision; sending requires the revision you reviewed. */
"expected_revision": number;
/** Current retained conversation. Required for a tenant key; hosted execution derives its exact source when omitted. */
"conversation_id"?: string | undefined;
/** Optional caption where the canonical entry and channel permit one. */
"caption"?: string | undefined
} };
/**
 * Search published catalog items
 *
 * Reads bounded currently published permitted variants, prices and availability basis with an explicit catalog-content grant. Draft and provider administration fields stay private. Advisory availability is not a booking offer; use the booking availability operation to select an actionable offer.
 */
"catalog.search": { response: Schemas["CatalogSearch"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"catalog"?: string | undefined;
/** Optional text to match against the published catalog. */
"query"?: string | undefined;
/** Optional requested start in UTC; linked Totem services check their real scheduling availability. */
"requested_start"?: string | undefined;
/** Requested party size for linked scheduling, between one and ten thousand. */
"party_size"?: number | undefined
} };
/**
 * Send reviewed catalog items
 *
 * Starts one durable card send of the reviewed current published selection to an owned retained conversation. Current variant revision, provider synchronization, sender, recipient and messaging policy are rechecked at the provider boundary. Unknown provider acceptance is not retried automatically.
 */
"catalog.send": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current server-issued opaque content reference; never parse or modify it. */
"catalog": string;
/** One to thirty distinct reviewed variant references from this catalog. */
"variants": Array<string>;
/** Published catalog revision that was reviewed before sending. */
"expected_revision": number;
/** Current retained conversation. Tenant keys must select it; hosted execution derives its exact retained source when omitted. */
"conversation_id"?: string | undefined;
/** Optional message accompanying the reviewed catalog selection. */
"body_text"?: string | undefined
} };
/**
 * Search team knowledge
 *
 * Retrieves bounded passages from the team’s enabled, retained indexed knowledge with a separate knowledge-content opt-in; existing keys gain no access. Provider deletion discovery is eventual. Private lead files, raw file identifiers and source URLs are excluded.
 */
"knowledge.search": { response: Schemas["KnowledgeSearch"]; query: {

}; path: {

}; body: {
/** Question to retrieve from the selected team’s indexed knowledge. */
"query": string;
/** Maximum passages, from 1 to 8; defaults to 4. */
"max_results"?: number | undefined
} };
/**
 * Get an operation
 *
 * Returns one operation owned by this integration and selected team. The caller must still hold the original operation’s scope and current execution authority; an empty catalogue scope never grants access by itself.
 */
"operations.get": { response: Schemas["Operation"]; query: {

}; path: {
/** The operation's public id. */
"id": `op_${string}`
}; body: never };
/**
 * Cancel an operation before its effect
 *
 * Requests cancellation of this integration’s operation in the selected team, subject to its original current scope and authority. Cancellation prevents an effect only before it begins; a running effect may already have happened. Repeating the request is safe.
 */
"operations.cancel": { response: Schemas["Operation"]; query: {

}; path: {
/** The operation's public id. */
"id": `op_${string}`
}; body: Record<string, never> };
/**
 * Read current outgoing call options
 *
 * Returns bounded current published assistant and outgoing line selections for the owned lead, under current consent and contact policy. This read places no call. Choose one opaque binding explicitly; no provider or account credentials are exported.
 */
"calls.options": { response: Schemas["CallBindingOptions"]; query: {

}; path: {

}; body: {
/** Current retained lead in the selected team. */
"lead_id": string
} };
/**
 * List calls
 *
 * Returns a page of the team's calls, each with its direction, start time, duration and a normalized outcome, and linked to its lead when there is one. Pass `lead` for one lead's calls. Recordings and transcripts are not exported.
 */
"calls.list": { response: Schemas["CallList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined;
/** Only the calls linked to this lead: every item's `lead` is this id. A lead of another team, or one that does not exist, matches nothing. */
"lead"?: string | null | undefined
}; path: {

}; body: never };
/**
 * Start an approved outgoing call
 *
 * Accepts one durable call intent using the current lead contact and a binding returned by calls.options. The canonical engine rechecks assistant, line, consent, opt-out, contact limits and budget before provider effects. The receipt confirms provider acceptance without claiming an answer or completed call; reuse Idempotency-Key after uncertainty and never repeat outcome_unknown.
 */
"calls.start": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current retained lead in the selected team. */
"lead_id": string;
/** Opaque current calling binding emitted by the server. Never parse, edit or substitute its contents. */
"binding_reference": string;
/** Explicit caller attestation that this outgoing call was approved. Existing recipient consent, opt-out and contact limits remain required. */
"consent_confirmed": true;
/** Optional bounded objective for this call. It does not change the published assistant instructions or contact policy. */
"objective"?: string | undefined
} };
/**
 * Get a call
 *
 * Returns one call by its id. A call this key cannot read, or one that was removed, answers `404 resource_missing`.
 */
"calls.get": { response: Schemas["Call"]; query: {

}; path: {
/** The call's public id. */
"id": string
}; body: never };
/**
 * Read authorized retained call speech
 *
 * Reads bounded retained speech under the independent transcript grant and current team communication-sharing policy; tool arguments and private transport metadata are excluded. The call, current linked lead, erasure fence and exact retained incarnation are rechecked, with complete:false when truncated. Call metadata permission alone grants no transcript content.
 */
"calls.transcript": { response: Schemas["CallTranscript"]; query: {

}; path: {
/** The call's public id. */
"id": string
}; body: never };
/**
 * Resolve an authorized retained call recording
 *
 * Returns a short-lived URL for the current owned application recording stored in the supported European bucket, after fresh recording content grant, current sharing and exact source checks. It does not fetch provider URLs, import recordings or grant general storage access. A missing retained application artifact returns resource_missing.
 */
"calls.recording": { response: Schemas["CallRecording"]; query: {

}; path: {
/** The call's public id. */
"id": string
}; body: never };
/**
 * Update dispatched call analysis
 *
 * Processes one system-analyzer callback for the exact dispatched call generation under current system delegation and source-bound context. Ordinary integrations and assistants cannot use this grant, and the content-free receipt distinguishes eligible writes from deferred finite analysis. The original dispatch admits one logical callback; reuse its Idempotency-Key after uncertainty.
 */
"call.analysis.update": { response: Schemas["AnalysisReceipt"]; query: {

}; path: {
/** The call's public id. */
"id": string
}; body: {
/** Analyzer summary for the exact dispatched call. Existing language and voicemail policies apply. */
"summary"?: string | undefined;
/** At most 50 exact-name scalar extractions. Strings fit the existing 2,000-character lead value contract; empty and null values never delete existing fields. */
"custom_values"?: {
[key: string]: (string | number | boolean | null)
} | undefined;
/** Request existing finite Decisions fields from persisted source evidence. Caller-inferred verdict values are never accepted. */
"finite_fields"?: Array<("user_sentiment" | "call_successful" | "in_voicemail")> | undefined
} };
/**
 * List conversations
 *
 * Returns a page of the team's conversations, one per channel, business account and contact address: channel, inbox status, assignee and the times of the latest inbound and outbound messages. Pass `lead` for one lead's conversations. Message content is never exported.
 */
"conversations.list": { response: Schemas["ConversationList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined;
/** Only the conversations linked to this lead: every item's `lead` is this id. A lead of another team, or one that does not exist, matches nothing. */
"lead"?: string | null | undefined
}; path: {

}; body: never };
/**
 * Get a conversation
 *
 * Returns one conversation by its id, without message content. A conversation this key cannot read, or one that was removed, answers `404 resource_missing`.
 */
"conversations.get": { response: Schemas["Conversation"]; query: {

}; path: {
/** The conversation's public id. */
"id": string
}; body: never };
/**
 * Read current conversation messages
 *
 * Reads a bounded latest slice of retained message text under its separate explicit content grant; existing messages:read keys remain metadata-only. Hosted executions derive their exact current conversation, and any supplied opaque id must match it. Media locations, provider identifiers and erased messages are withheld, with explicit truncation.
 */
"conversations.messages": { response: Schemas["ConversationMessages"]; query: {

}; path: {

}; body: {
/** Current conversation in the selected team. Tenant integrations must supply its identifier; hosted processing may derive its exact signed source. */
"conversation_id"?: string | undefined;
/** Maximum number of latest retained messages to return, from one to fifty. */
"limit"?: number | undefined
} };
/**
 * List bookings
 *
 * Returns a page of the team's bookings: appointments for a bookable service, events from the connected calendar and bookings imported from other systems, each with its status and times. Pass `lead` for one lead's bookings.
 */
"bookings.list": { response: Schemas["BookingList"]; query: {
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** The `next_cursor` of the previous page. Omit it for the first page. */
"cursor"?: string | null | undefined;
/** Only the bookings linked to this lead: every item's `lead` is this id. A lead of another team, or one that does not exist, matches nothing. */
"lead"?: string | null | undefined
}; path: {

}; body: never };
/**
 * Book a current offer
 *
 * Accepts one current encrypted offer as a durable operation and revalidates service, capacity, current lead and provider authority before effects. Payment-required outcomes return a payment receipt and never claim a confirmed booking. Reuse the same Idempotency-Key after an uncertain acknowledgement; never repeat an outcome_unknown operation.
 */
"bookings.create": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current lead in the selected team. */
"lead_id": string;
/** Server-issued opaque calendar reference; never parse or modify it. */
"offer": string;
/** Customer display name on the booking. */
"customer_name": string;
/** Optional booking notes. */
"notes"?: string | undefined;
/** Server-issued opaque calendar reference; never parse or modify it. */
"payment_reference"?: string | undefined
} };
/**
 * Get a booking
 *
 * Returns one booking by its id. A booking this key cannot read, or one that was removed, answers `404 resource_missing`.
 */
"bookings.get": { response: Schemas["Booking"]; query: {

}; path: {
/** The booking's public id. */
"id": string
}; body: never };
/**
 * Update dispatched meeting analysis
 *
 * Processes one system-analyzer callback for the current retained meeting artifact and exact booking incarnation under current delegation and source-bound context. Updates only summary and sentiment; the receipt never claims deferred work completed. The original dispatch admits one logical callback; reuse its Idempotency-Key after uncertainty.
 */
"meeting.analysis.update": { response: Schemas["AnalysisReceipt"]; query: {

}; path: {
/** The booking's public id. */
"id": string
}; body: {
/** Fallback analyzer summary for the exact retained meeting artifact. */
"summary"?: string | undefined;
/** Meeting summary sentiment, without lead custom-field synchronization or notes. */
"sentiment"?: string | undefined
} };
/**
 * Read current booking availability
 *
 * Returns bounded service-option choices and encrypted offers bound to this integration, team and lead; select an option when several are returned. Offers expire within fifteen minutes while provider resources and raw slot proofs stay private. This read reserves no capacity.
 */
"bookings.availability": { response: Schemas["BookingAvailability"]; query: {

}; path: {

}; body: {
/** Current lead in the selected team. */
"lead_id": string;
/** Current bookable service. */
"service_id": string;
/** Server-issued opaque calendar reference; never parse or modify it. */
"option"?: string | undefined;
/** Up to four additional services for one joint Koibox visit. Resolve multi-option choices first; never compare independent starts to infer an overlap. */
"additional_services"?: Array<{
/** Another current service for the same visit. */
"service_id": string;
/** Server-issued opaque calendar reference; never parse or modify it. */
"option"?: string | undefined
}> | undefined;
/** An instant in UTC. */
"from_at"?: string | undefined;
/** An instant in UTC. */
"to_at"?: string | undefined;
/** People attending, when supported by this service. */
"party_size"?: number | undefined;
/** Resource units required by this service. */
"resource_units"?: number | undefined;
/** Published booking page slug when required to disambiguate staffing. */
"booking_page"?: string | undefined
} };
/**
 * Inspect a current booking for management
 *
 * Returns the current canonical booking projection and its action ETag from the same source snapshot. Use that ETag in If-Match when cancelling or moving the booking. This management view has no capture version and does not alter the existing versioned booking inventory.
 */
"bookings.inspect": { response: Schemas["BookingManagement"]; query: {

}; path: {
/** The booking's public id. */
"id": string
}; body: never };
/**
 * Read current bookings for a lead
 *
 * Lists up to twenty currently manageable bookings of the authorized canonical lead with current action ETags. Hosted assistants remain restricted to their current retained conversation lead and permitted services. complete is false when the bounded source query may omit further records.
 */
"bookings.forLead": { response: Schemas["BookingManagementList"]; query: {

}; path: {

}; body: {
/** Current lead in the selected team. */
"lead_id": string;
/** An instant in UTC. */
"from_at"?: string | undefined;
/** An instant in UTC. */
"to_at"?: string | undefined
} };
/**
 * Cancel a reviewed booking
 *
 * Accepts canonical cancellation of this owned booking using the management view ETag. Ownership, source incarnation and current version are checked before the actual provider action. An uncertain provider result remains unknown; cancellation of an operation is not a claim that an already accepted booking action was undone.
 */
"bookings.cancel": { response: Schemas["Operation"]; query: {

}; path: {
/** The booking's public id. */
"id": string
}; body: Record<string, never> };
/**
 * Move a reviewed booking
 *
 * Moves the owned booking to the requested instant while preserving canonical service, professional, capacity and paid-reservation rules. Use the current management ETag. Replacement and cancellation receipts follow the canonical lifecycle; an accepted replacement is never deleted merely because its local receipt became uncertain.
 */
"bookings.reschedule": { response: Schemas["Operation"]; query: {

}; path: {
/** The booking's public id. */
"id": string
}; body: {
/** An instant in UTC. */
"starts_at": string
} };
/**
 * Read current booking payments
 *
 * Reads at most five owned current payment requests and active checkout URLs, revalidating the merchant and current checkout generation through the canonical payment ledger. Payment completion is verified with the merchant provider, never inferred from a caller flag. Raw Stripe accounts, sessions and customer records remain private.
 */
"bookingPayments.get": { response: Schemas["BookingPaymentList"]; query: {

}; path: {

}; body: {
/** Current lead in the selected team. */
"lead_id": string;
/** Server-issued opaque calendar reference; never parse or modify it. */
"reference"?: string | undefined
} };
/**
 * Send a confirmed booking payment link
 *
 * Requires explicit consent_confirmed:true, fresh send authority and the current verified recipient; sender, template, URL, amount and currency come from server policy. Canonical delivery honors configured Prelude, and only acceptance of the target template proves link delivery. Sending a link never confirms a booking.
 */
"bookingPayments.sendLink": { response: Schemas["Operation"]; query: {

}; path: {

}; body: {
/** Current lead in the selected team. */
"lead_id": string;
/** Server-issued opaque calendar reference; never parse or modify it. */
"reference": string;
/** Explicit caller attestation that sending this payment link was confirmed. This is not a server claim that the customer consented. */
"consent_confirmed": true
} };
/**
 * Get a notification
 *
 * Returns one business notification by its opaque id, including its summary. A foreign, personal, excluded or removed notice answers `404 resource_missing`. This endpoint never changes its status.
 */
"notifications.get": { response: Schemas["Notification"]; query: {

}; path: {
/** The notification's public id. */
"id": string
}; body: never };
/**
 * Read the changes feed of one team
 *
 * Reads current records and removals in capture order under the key's current scopes: the feed and CRM kinds require `crm:read`, calls `calls:read`, conversations `messages:read`, bookings `calendar:read`; notes additionally require `crm:notes:read`, explicit content permission and completed note capture. Start without `cursor` and save every `next_cursor`; withheld kinds advance it and can leave `data` empty with `has_more: true`, so keep paging; after gaining a scope, restart without a cursor to recover earlier withheld records. A cursor expires 30 days after its feed position or, during bootstrap, 30 days after bootstrap started.
 */
"sync.changes": { response: Schemas["FeedPage"]; query: {
/** The `next_cursor` of the previous page. Omit it to start an initial sync from the beginning. */
"cursor"?: string | null | undefined;
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined
}; path: {

}; body: never };
/**
 * Read retained lifecycle events
 *
 * Poll current-authorized retained transition metadata with one saved cursor per integration and team, deduplicating by event ID; operation completions belong only to their initiating integration and acceptance is not completion. Missing or unauthorized sources are withheld while advancing the cursor; continue immediately while has_more is true even for empty pages, otherwise poll later. Capture invents no historical transitions, cursors expire after thirty days and events expire with their source or earlier; use sync.changes separately for CRM state and removals.
 */
"events.list": { response: Schemas["EventList"]; query: {
/** Opaque cursor returned by this integration and team event feed. */
"cursor"?: string | null | undefined;
/** Items per page, 1–100. Defaults to 25. */
"limit"?: number | null | undefined;
/** Without a cursor, now initializes at the current capture position without replay; retained reads available history. Do not combine start with cursor. */
"start"?: ("now" | "retained") | null | undefined
}; path: {

}; body: never };
/**
 * Check that the API is up
 *
 * Tells you whether the API is up; call it with `GET`, because the firewall in front of the API answers any other method, `HEAD` included, with a plain `404`. It needs no key and takes no query string: any parameter, even a cache-buster, answers `400 invalid_request`. The `Totem-Release` response header names the release that answered.
 */
"health": { response: Schemas["Health"]; query: {

}; path: {

}; body: never }
}
/** One stage, status or assignee transition of a lead. Activities never change once written. */
export type Activity = Schemas["Activity"]
/** A page of Activity objects, in a stable order that carries no meaning. */
export type ActivityList = Schemas["ActivityList"]
/** Content-free stored callback receipt. Acceptance never claims every deferred analysis task has completed. */
export type AnalysisReceipt = Schemas["AnalysisReceipt"]
/** Metadata-only published assistant discovery; no prompts, tool configuration or provider selectors. */
export type AssistantOptions = Schemas["AssistantOptions"]
/** Content-free completed-run metadata. It never exports the reply, prompt, private source or provider identifiers. */
export type AssistantRunReceipt = Schemas["AssistantRunReceipt"]
export type Attachment = Schemas["Attachment"]
/** A board with its stages in pipeline order. */
export type Board = Schemas["Board"]
/** A page of Board objects, in a stable order that carries no meaning. */
export type BoardList = Schemas["BoardList"]
/** A booking and its `kind`: an appointment for a bookable service, an event from the connected calendar, or a booking imported from another system. */
export type Booking = Schemas["Booking"]
/** Bounded public choices and offers without provider or raw resource identifiers. */
export type BookingAvailability = Schemas["BookingAvailability"]
/** A page of Booking objects, in a stable order that carries no meaning. */
export type BookingList = Schemas["BookingList"]
/** Fresh management projection and action ETag from the same source snapshot; not a capture version. */
export type BookingManagement = Schemas["BookingManagement"]
/** Current authorized lead bookings, with explicit completeness. */
export type BookingManagementList = Schemas["BookingManagementList"]
/** Owned current payment metadata, never a raw Stripe record. */
export type BookingPayment = Schemas["BookingPayment"]
/** At most five current payment requests for the authorized lead. */
export type BookingPaymentList = Schemas["BookingPaymentList"]
/** A payment request or link delivery is not a confirmed booking. */
export type BookingPaymentReceipt = Schemas["BookingPaymentReceipt"]
/** Minimal current-source booking outcome. */
export type BookingReceipt = Schemas["BookingReceipt"]
/** A service customers can book, with its meeting type. */
export type BookingService = Schemas["BookingService"]
/** Every BookingService object, in one response: this list is never paged. */
export type BookingServiceList = Schemas["BookingServiceList"]
/** Source-backed service discovery for tenant integrations and actual hosted assistants. */
export type CalendarServiceOptionsResult = Schemas["CalendarServiceOptionsResult"]
/** A call: its direction, timing and a normalized outcome. No recording or transcript. */
export type Call = Schemas["Call"]
/** Current eligible calling options. Reading does not dial, reserve budget or change configuration. */
export type CallBindingOptions = Schemas["CallBindingOptions"]
/** A page of Call objects, in a stable order that carries no meaning. */
export type CallList = Schemas["CallList"]
/** An existing canonical European recording, never an arbitrary provider URL. */
export type CallRecording = Schemas["CallRecording"]
/** Minimal truthful call-start acceptance receipt. */
export type CallStartReceipt = Schemas["CallStartReceipt"]
/** Explicitly authorized call speech content. */
export type CallTranscript = Schemas["CallTranscript"]
export type CatalogSearch = Schemas["CatalogSearch"]
export type CatalogSendReceipt = Schemas["CatalogSendReceipt"]
/** A conversation on one channel: its status, assignee and the times of the latest messages, never their content. */
export type Conversation = Schemas["Conversation"]
/** A page of Conversation objects, in a stable order that carries no meaning. */
export type ConversationList = Schemas["ConversationList"]
/** Bounded current message bodies without sender destinations, raw identifiers or media locations. Truncated means older retained rows may exist. */
export type ConversationMessages = Schemas["ConversationMessages"]
/** Current source-bound CRM metadata and independently requested content. No export capture version or business authoring profile is included. */
export type CrmContext = Schemas["CrmContext"]
export type Event = Schemas["Event"]
export type EventList = Schemas["EventList"]
/** Content-free organization handoff result; destination contacts, source content and provider selectors remain private. */
export type FamilyHandoffReceipt = Schemas["FamilyHandoffReceipt"]
/** One change: the record's current state, or its removal. */
export type FeedItem = Schemas["FeedItem"]
/** A page of the changes feed. */
export type FeedPage = Schemas["FeedPage"]
/** Source-proven canonical first-reply receipt with bounded context and no provider identifiers. */
export type FirstReplyReceipt = Schemas["FirstReplyReceipt"]
/** The API is up. */
export type Health = Schemas["Health"]
/** Current retained knowledge passages without query echo, provider ids or source URLs. */
export type KnowledgeSearch = Schemas["KnowledgeSearch"]
/** A lead or client record: lead fields only. */
export type Lead = Schemas["Lead"]
/** Where a lead came from: its original capture and latest submission. */
export type LeadAttribution = Schemas["LeadAttribution"]
/** Custom values with a separate opaque ETag in the response header. */
export type LeadCustomValues = Schemas["LeadCustomValues"]
/** Content-free mutation receipt; the response ETag reflects the current source even on replay. */
export type LeadCustomValuesReceipt = Schemas["LeadCustomValuesReceipt"]
/** A lead with its `attribution` and `response` facets, each with its own `version`. A facet is `null` only while Totem is still preparing it. */
export type LeadDetail = Schemas["LeadDetail"]
/** A page of Lead objects, in a stable order that carries no meaning. */
export type LeadList = Schemas["LeadList"]
export type LeadMutation = Schemas["LeadMutation"]
/** Lead note body. */
export type LeadNote = Schemas["LeadNote"]
export type LeadNoteList = Schemas["LeadNoteList"]
/** Lead note metadata without its content; safe for a write-only receipt or replay. */
export type LeadNoteMetadata = Schemas["LeadNoteMetadata"]
export type LeadNoteReceipt = Schemas["LeadNoteReceipt"]
/** Current retained note content under its independent read grant, without an inventory version. */
export type LeadNoteSource = Schemas["LeadNoteSource"]
/** Content-free proof that this operation deleted the reviewed note incarnation. */
export type LeadNoteSourceDeletion = Schemas["LeadNoteSourceDeletion"]
/** Current source note mutation metadata; safe for write-only integrations and replay. */
export type LeadNoteSourceMutation = Schemas["LeadNoteSourceMutation"]
/** Metadata-only source write receipt; no note text or other notes. */
export type LeadNoteSourceReceipt = Schemas["LeadNoteSourceReceipt"]
/** How the team has answered a lead across its conversations and calls: the latest messages each way and whether a reply is due. It uses its lead's id. */
export type LeadResponse = Schemas["LeadResponse"]
/** Current canonical CRM lead projection, available through the explicit operational context permission without inventing a capture version. */
export type LeadSource = Schemas["LeadSource"]
/** Source-backed CRM mutation metadata. It never invents an inventory version or grants read access through a write. */
export type LeadSourceMutation = Schemas["LeadSourceMutation"]
/** Write receipt metadata only: no contact details or CRM content. */
export type LeadSourceReceipt = Schemas["LeadSourceReceipt"]
/** The persisted lead result, or a validation-only result without a mutation. */
export type LeadUpsertResult = Schemas["LeadUpsertResult"]
/** A successful dry run; it never represents a persisted lead. */
export type LeadValidation = Schemas["LeadValidation"]
export type LibraryDeliveryReceipt = Schemas["LibraryDeliveryReceipt"]
export type LibraryEntry = Schemas["LibraryEntry"]
export type LibraryEntryList = Schemas["LibraryEntryList"]
export type LibraryPreparedResponse = Schemas["LibraryPreparedResponse"]
/** The integration that owns the key, with the teams the key reads. */
export type Me = Schemas["Me"]
/** A team member, by display name only: Totem exports no email, phone or role. */
export type Member = Schemas["Member"]
/** Every Member object, in one response: this list is never paged. */
export type MemberList = Schemas["MemberList"]
/** Configured sender references without provider identifiers or credentials. */
export type MessageChannels = Schemas["MessageChannels"]
/** Current-source message result without body, destination or provider identifiers. */
export type MessageReceipt = Schemas["MessageReceipt"]
/** A business notification, including its summary and linked lead, call or conversation. Personal notes and technical alerts are excluded. */
export type Notification = Schemas["Notification"]
/** A page of Notification objects, in a stable order that carries no meaning. */
export type NotificationList = Schemas["NotificationList"]
/** Minimal notification receipt without its content, recipients or internal source references. */
export type NotificationReceipt = Schemas["NotificationReceipt"]
/** Durable operation status, available only to its current authorized integration and team. */
export type Operation = Schemas["Operation"]
/** An error, as `application/problem+json` (RFC 9457). */
export type Problem = Schemas["Problem"]
/** Content-free quote outcome receipt; no customer, provider, stage or private effect selectors. */
export type QuoteOutcomeReceipt = Schemas["QuoteOutcomeReceipt"]
/** Content-free receipt with no destination existence or identity disclosure. */
export type ReferralReceipt = Schemas["ReferralReceipt"]
/** Immutable queue admission acknowledgement, without content, destination or provider identifiers. */
export type RequestedInfoReceipt = Schemas["RequestedInfoReceipt"]
/** Metadata of a persisted callback promise, without customer contact details or provider selectors. */
export type ScheduledContactReceipt = Schemas["ScheduledContactReceipt"]
/** Minimal task receipt without task content or internal ids. */
export type TaskReceipt = Schemas["TaskReceipt"]
/** A team this key reads, with its time zone and default country. */
export type Team = Schemas["Team"]
/** Every Team object, in one response: this list is never paged. */
export type TeamList = Schemas["TeamList"]
