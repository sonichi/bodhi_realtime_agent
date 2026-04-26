[bodhi-realtime-agent](../index.md) / ConversationItem

# Interface: ConversationItem

Defined in: [types/conversation.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L9)

A single entry in the conversation timeline (message, tool call, or agent transfer).

## Properties

### content

> **content**: `string`

Defined in: [types/conversation.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L13)

The textual content (or JSON-serialized data for tool_call/tool_result).

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [types/conversation.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L17)

Optional application-specific metadata.

***

### role

> **role**: [`ConversationItemRole`](../type-aliases/ConversationItemRole.md)

Defined in: [types/conversation.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L11)

Who produced this item.

***

### timestamp

> **timestamp**: `number`

Defined in: [types/conversation.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L15)

Unix timestamp in milliseconds when this item was created.
