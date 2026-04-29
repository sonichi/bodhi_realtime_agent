[bodhi-realtime-agent](../index.md) / ClientMessage

# Interface: ClientMessage

Defined in: [types/audio.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/audio.ts#L20)

Non-audio control message from the client transport (e.g. JSON commands).

## Properties

### data

> **data**: `unknown`

Defined in: [types/audio.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/audio.ts#L24)

Message payload.

***

### timestamp

> **timestamp**: `number`

Defined in: [types/audio.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/audio.ts#L26)

Unix timestamp (ms) when the message was received.

***

### type

> **type**: `string`

Defined in: [types/audio.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/audio.ts#L22)

Message type identifier (application-defined).
