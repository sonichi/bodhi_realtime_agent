[bodhi-realtime-agent](../index.md) / UIPayload

# Interface: UIPayload

Defined in: [types/conversation.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L82)

Structured UI payload for dual-channel delivery (voice + UI).

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\>

Defined in: [types/conversation.ts:88](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L88)

Type-specific data for rendering the UI element.

***

### requestId?

> `optional` **requestId**: `string`

Defined in: [types/conversation.ts:86](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L86)

Identifier for correlating UI responses back to the originating request.

***

### type

> **type**: `"choice"` \| `"confirmation"` \| `"status"` \| `"form"` \| `"image"`

Defined in: [types/conversation.ts:84](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L84)

The kind of UI element to render on the client.
