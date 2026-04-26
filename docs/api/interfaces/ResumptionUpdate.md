[bodhi-realtime-agent](../index.md) / ResumptionUpdate

# Interface: ResumptionUpdate

Defined in: [types/session.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L48)

A resumption handle update received from the Gemini server.

## Properties

### handle

> **handle**: `string`

Defined in: [types/session.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L50)

Opaque handle string used to resume the Gemini session.

***

### resumable

> **resumable**: `boolean`

Defined in: [types/session.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L52)

Whether the session can be resumed with this handle.
