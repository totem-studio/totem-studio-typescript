/** Generated from openapi.json and package.json. Do not edit; run npm run generate. */
import type { ErrorAction, TotemErrorCode } from './schema.js'

export const CONTRACT_SHA256 = '081ffdfd1c9fdd4e72b035aa893a64b0ea971b9bc075a7e8296d72afcbc67eac'
export const SDK_VERSION = '1.0.0'
export const DEFAULT_BASE_URL = "https://api.totemstudio.ai/v1"
export const operationDefinitions = {
  "me.get": {
    "method": "GET",
    "path": "/me",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "teams.list": {
    "method": "GET",
    "path": "/teams",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "teams.get": {
    "method": "GET",
    "path": "/teams/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "boards.list": {
    "method": "GET",
    "path": "/boards",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor"
    ]
  },
  "members.list": {
    "method": "GET",
    "path": "/members",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "booking_services.list": {
    "method": "GET",
    "path": "/booking_services",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "booking_services.options": {
    "method": "POST",
    "path": "/booking_services/options",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.list": {
    "method": "GET",
    "path": "/leads",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "board",
      "stage",
      "status"
    ]
  },
  "leads.upsert": {
    "method": "POST",
    "path": "/leads",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      },
      {
        "status": 201,
        "body": true
      }
    ],
    "query": []
  },
  "crm.context": {
    "method": "POST",
    "path": "/crm/context",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.scheduleContact": {
    "method": "POST",
    "path": "/crm/scheduled-contact",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"lrs1_[a-f0-9]{64}\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.handoff": {
    "method": "POST",
    "path": "/crm/handoff",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "referrals.create": {
    "method": "POST",
    "path": "/referrals/totem",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "quotes.recordOutcome": {
    "method": "POST",
    "path": "/crm/quote-outcomes",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "leads.get": {
    "method": "GET",
    "path": "/leads/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.update": {
    "method": "PATCH",
    "path": "/leads/{id}",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"(?:lrs1_[a-f0-9]{64}|lead_[A-Za-z0-9]+:[1-9][0-9]{0,15})\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.search": {
    "method": "POST",
    "path": "/leads/search",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.activities": {
    "method": "GET",
    "path": "/leads/{id}/activities",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor"
    ]
  },
  "leads.notes": {
    "method": "GET",
    "path": "/leads/{id}/notes",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "view"
    ]
  },
  "leads.addNote": {
    "method": "POST",
    "path": "/leads/{id}/notes",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 201,
        "body": true
      }
    ],
    "query": []
  },
  "leads.archive": {
    "method": "POST",
    "path": "/leads/{id}/archive",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"(?:lrs1_[a-f0-9]{64}|lead_[A-Za-z0-9]+:[1-9][0-9]{0,15})\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "leads.customValues": {
    "method": "GET",
    "path": "/leads/{id}/custom-values",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "view"
    ]
  },
  "leads.updateCustomValues": {
    "method": "PATCH",
    "path": "/leads/{id}/custom-values",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"lcv_[a-f0-9]{64}\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "view"
    ]
  },
  "leads.deleteNote": {
    "method": "DELETE",
    "path": "/leads/{id}/notes/{note}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"(?:lns1_[a-f0-9]{64}|note_[A-Za-z0-9]+:[1-9][0-9]{0,15})\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      },
      {
        "status": 204,
        "body": false
      }
    ],
    "query": []
  },
  "leads.updateNote": {
    "method": "PATCH",
    "path": "/leads/{id}/notes/{note}",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": false,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"(?:lns1_[a-f0-9]{64}|note_[A-Za-z0-9]+:[1-9][0-9]{0,15})\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "tasks.create": {
    "method": "POST",
    "path": "/tasks",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "tasks.complete": {
    "method": "POST",
    "path": "/tasks/{id}/complete",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "notifications.list": {
    "method": "GET",
    "path": "/notifications",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "lead",
      "status"
    ]
  },
  "notifications.create": {
    "method": "POST",
    "path": "/notifications",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "messages.channels": {
    "method": "POST",
    "path": "/messages/channels",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "messages.requestInfo": {
    "method": "POST",
    "path": "/messages/requested-info",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "messages.prepareReply": {
    "method": "POST",
    "path": "/messages/prepare-reply",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "messages.send": {
    "method": "POST",
    "path": "/messages/send",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "assistants.options": {
    "method": "POST",
    "path": "/assistants/options",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "assistants.run": {
    "method": "POST",
    "path": "/assistants/runs",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "library.list": {
    "method": "POST",
    "path": "/library/list",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "library.get": {
    "method": "POST",
    "path": "/library/get",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "library.prepared": {
    "method": "POST",
    "path": "/library/prepared",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "attachments.resolve": {
    "method": "POST",
    "path": "/attachments/resolve",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "library.send": {
    "method": "POST",
    "path": "/library/send",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "catalog.search": {
    "method": "POST",
    "path": "/catalog/search",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "catalog.send": {
    "method": "POST",
    "path": "/catalog/send",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "knowledge.search": {
    "method": "POST",
    "path": "/knowledge/search",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "operations.get": {
    "method": "GET",
    "path": "/operations/{id}",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "operations.cancel": {
    "method": "POST",
    "path": "/operations/{id}/cancel",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "calls.options": {
    "method": "POST",
    "path": "/calls/options",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "calls.list": {
    "method": "GET",
    "path": "/calls",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "lead"
    ]
  },
  "calls.start": {
    "method": "POST",
    "path": "/calls",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "calls.get": {
    "method": "GET",
    "path": "/calls/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "calls.transcript": {
    "method": "GET",
    "path": "/calls/{id}/transcript",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "calls.recording": {
    "method": "GET",
    "path": "/calls/{id}/recording",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "call.analysis.update": {
    "method": "PATCH",
    "path": "/calls/{id}/analysis",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "conversations.list": {
    "method": "GET",
    "path": "/conversations",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "lead"
    ]
  },
  "conversations.get": {
    "method": "GET",
    "path": "/conversations/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "conversations.messages": {
    "method": "POST",
    "path": "/conversations/messages",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.list": {
    "method": "GET",
    "path": "/bookings",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "limit",
      "cursor",
      "lead"
    ]
  },
  "bookings.create": {
    "method": "POST",
    "path": "/bookings",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.get": {
    "method": "GET",
    "path": "/bookings/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "meeting.analysis.update": {
    "method": "PATCH",
    "path": "/bookings/{id}/analysis",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.availability": {
    "method": "POST",
    "path": "/bookings/availability",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.inspect": {
    "method": "GET",
    "path": "/bookings/{id}/management",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.forLead": {
    "method": "POST",
    "path": "/bookings/for-lead",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.cancel": {
    "method": "POST",
    "path": "/bookings/{id}/cancel",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"bka_[a-f0-9]{64}\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "bookings.reschedule": {
    "method": "POST",
    "path": "/bookings/{id}/reschedule",
    "authenticated": true,
    "body": true,
    "team": false,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      },
      {
        "name": "If-Match",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 300,
          "pattern": "^\"bka_[a-f0-9]{64}\"$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "bookingPayments.get": {
    "method": "POST",
    "path": "/booking-payments/get",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "bookingPayments.sendLink": {
    "method": "POST",
    "path": "/booking-payments/send-link",
    "authenticated": true,
    "body": true,
    "team": true,
    "effect": "write",
    "headers": [
      {
        "name": "Idempotency-Key",
        "required": true,
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 255,
          "pattern": "^[\\x21-\\x7e]+$"
        }
      }
    ],
    "successResponses": [
      {
        "status": 202,
        "body": true
      }
    ],
    "query": []
  },
  "notifications.get": {
    "method": "GET",
    "path": "/notifications/{id}",
    "authenticated": true,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  },
  "sync.changes": {
    "method": "GET",
    "path": "/sync/changes",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "cursor",
      "limit"
    ]
  },
  "events.list": {
    "method": "GET",
    "path": "/events",
    "authenticated": true,
    "body": false,
    "team": true,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": [
      "cursor",
      "limit",
      "start"
    ]
  },
  "health": {
    "method": "GET",
    "path": "/health",
    "authenticated": false,
    "body": false,
    "team": false,
    "effect": "read",
    "headers": [],
    "successResponses": [
      {
        "status": 200,
        "body": true
      }
    ],
    "query": []
  }
} as const
/** The contract's error catalogue: HTTP status, recommended action and docs entry for each code. */
export const errorCatalogue = {
/** Stored custom values contain duplicate names or ambiguous legacy rows. */
"custom_values_review_required": { status: 409, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#custom_values_review_required" },
/** This write requires an Idempotency-Key header before it can have an effect. */
"idempotency_key_required": { status: 400, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#idempotency_key_required" },
/** This key was already used with a different body, resource or selected team. */
"idempotency_key_reused": { status: 409, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#idempotency_key_reused" },
/** An identical write with this idempotency key is still being processed. */
"idempotency_in_progress": { status: 409, action: "retry_after", docUrl: "https://totemstudio.ai/developers/errors#idempotency_in_progress" },
/** An earlier attempt may have committed its effect, but Totem cannot safely prove its outcome. */
"outcome_unknown": { status: 409, action: "contact_support", docUrl: "https://totemstudio.ai/developers/errors#outcome_unknown" },
/** The strong If-Match validator no longer names the current public version of this lead. */
"version_conflict": { status: 412, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#version_conflict" },
/** The supplied phone, email or integration external id resolves to conflicting lead identities. */
"ambiguous_identity": { status: 409, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#ambiguous_identity" },
/** The principal does not hold the separate inbound intake capability requested by this write. */
"inbound_not_enabled": { status: 403, action: "check_credentials", docUrl: "https://totemstudio.ai/developers/errors#inbound_not_enabled" },
/** This effect requires explicit consent evidence that this request does not provide. */
"consent_required": { status: 403, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#consent_required" },
/** Something in the request is not valid: an unknown, repeated or out-of-range query parameter, a query string or body on an endpoint that takes none, a cursor issued for another endpoint, filter or team, a malformed `Totem-Team` header, or a body that is not the JSON this endpoint expects. `param` names the parameter, header or field at fault. A conversations cursor is also refused once the conversation it points at has been erased. */
"invalid_request": { status: 400, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#invalid_request" },
/** The key reads more than one team and this endpoint reads one team's data, but the request does not say which team. */
"team_required": { status: 400, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#team_required" },
/** The request carried a secret key together with an `Origin` header, which means it came from a browser. Totem refuses it before reading anything. */
"secret_key_in_browser": { status: 400, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#secret_key_in_browser" },
/** The `Authorization` header is missing or malformed, or the key is unknown, wrong or revoked, or its integration is no longer active. */
"invalid_credentials": { status: 401, action: "check_credentials", docUrl: "https://totemstudio.ai/developers/errors#invalid_credentials" },
/** The key was rolled and its grace period is over. */
"key_expired": { status: 401, action: "check_credentials", docUrl: "https://totemstudio.ai/developers/errors#key_expired" },
/** The key lacks a permission this endpoint needs; CRM writes and note-content reads require separate explicit grants. */
"insufficient_scope": { status: 403, action: "check_credentials", docUrl: "https://totemstudio.ai/developers/errors#insufficient_scope" },
/** The organization's plan does not include the Totem API at the moment. */
"plan_not_entitled": { status: 403, action: "keep_and_retry", docUrl: "https://totemstudio.ai/developers/errors#plan_not_entitled" },
/** The key is valid, but the request came from an IP address outside the integration's allowlist. */
"ip_not_allowed": { status: 403, action: "check_credentials", docUrl: "https://totemstudio.ai/developers/errors#ip_not_allowed" },
/** The team is restricted for now: it is disabled (for example, suspended for non-payment), archived or billing-only, or its API access is paused. `GET /v1/teams` still lists it. */
"team_state_restricted": { status: 403, action: "keep_and_retry", docUrl: "https://totemstudio.ai/developers/errors#team_state_restricted" },
/** Totem does not export this team's data through the API because the team works in a sensitive sector, such as health care, where its records can reveal health information. */
"sector_restricted": { status: 403, action: "keep_and_retry", docUrl: "https://totemstudio.ai/developers/errors#sector_restricted" },
/** Totem has temporarily switched this endpoint off for every key. */
"capability_disabled": { status: 403, action: "keep_and_retry", docUrl: "https://totemstudio.ai/developers/errors#capability_disabled" },
/** The record does not exist, was removed, belongs to a team this key does not read, or was created so recently that Totem has not prepared it yet. A `GET` or `POST` under `/v1/` that matches no endpoint also gets this code. Any other method, and any path outside `/v1/`, gets a plain `404` from the firewall in front of the API, with no problem body and no `Totem-Request-Id`. */
"resource_missing": { status: 404, action: "fix_request", docUrl: "https://totemstudio.ai/developers/errors#resource_missing" },
/** The `Totem-Team` header names a team this key does not read: one it never covered, one removed from the key or from the organization, or one that was deleted. Without the header, it means the key no longer reads any team. */
"team_not_accessible": { status: 404, action: "drop_team", docUrl: "https://totemstudio.ai/developers/errors#team_not_accessible" },
/** Totem cannot continue the feed from this cursor: the data was restored from a backup, or a gap was found in the team's changes. */
"resync_required": { status: 409, action: "resync", docUrl: "https://totemstudio.ai/developers/errors#resync_required" },
/** Totem is still preparing this team's data for the API. This happens once per team, after it is first added to any key; adding it to another key later does not repeat it. */
"capture_not_ready": { status: 409, action: "wait_capture", docUrl: "https://totemstudio.ai/developers/errors#capture_not_ready" },
/** The cursor is more than 30 days old, counted from the point in the feed it reached (or, while an initial sync is still running, from when that sync started). */
"sync_cursor_expired": { status: 410, action: "resync", docUrl: "https://totemstudio.ai/developers/errors#sync_cursor_expired" },
/** The key went over its rate limit (items per minute), or too many failed authentication attempts from this IP address or against this key have locked it out for a while. */
"rate_limited": { status: 429, action: "retry_after", docUrl: "https://totemstudio.ai/developers/errors#rate_limited" },
/** The key has spent its daily quota of items. Every item returned by the changes feed and by every list counts toward it, including `GET /v1/teams`, `GET /v1/members`, `GET /v1/booking_services` and a lead's activities. The quota resets at 00:00 UTC. */
"quota_exceeded": { status: 429, action: "retry_after", docUrl: "https://totemstudio.ai/developers/errors#quota_exceeded" },
/** Something went wrong inside Totem while answering this request. */
"internal_error": { status: 500, action: "backoff", docUrl: "https://totemstudio.ai/developers/errors#internal_error" },
/** Totem has temporarily switched the API off for every key. */
"api_disabled": { status: 503, action: "backoff", docUrl: "https://totemstudio.ai/developers/errors#api_disabled" },
/** Reserved: the API itself does not return this code today. A `503` from the load balancer or the hosting platform in front of the API arrives without a problem body; treat it like this code. */
"service_unavailable": { status: 503, action: "backoff", docUrl: "https://totemstudio.ai/developers/errors#service_unavailable" }
} as const satisfies Record<TotemErrorCode, { readonly status: number; readonly action: ErrorAction; readonly docUrl: string }>
