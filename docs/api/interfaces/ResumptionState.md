[bodhi-realtime-agent](../index.md) / ResumptionState

# Interface: ResumptionState

Defined in: [types/session.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L38)

Tracks the Gemini session resumption state across reconnections.

## Properties

### latestHandle

> **latestHandle**: `string` \| `null`

Defined in: [types/session.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L40)

The most recent resumption handle from Gemini (null before first update).

***

### pendingMessages

> **pendingMessages**: [`ClientMessage`](ClientMessage.md)[]

Defined in: [types/session.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L44)

Messages queued during disconnection, to be replayed after reconnection.

***

### resumable

> **resumable**: `boolean`

Defined in: [types/session.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L42)

Whether the current handle is still valid for resumption.
