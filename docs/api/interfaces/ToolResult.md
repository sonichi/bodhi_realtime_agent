[bodhi-realtime-agent](../index.md) / ToolResult

# Interface: ToolResult

Defined in: [types/conversation.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L31)

The result of executing a tool, sent back to Gemini.

## Properties

### error?

> `optional` **error**: `string`

Defined in: [types/conversation.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L39)

Error message if execution failed.

***

### result

> **result**: `unknown`

Defined in: [types/conversation.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L37)

The successful return value (null when error is set).

***

### toolCallId

> **toolCallId**: `string`

Defined in: [types/conversation.ts:33](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L33)

Correlates back to the originating ToolCall.

***

### toolName

> **toolName**: `string`

Defined in: [types/conversation.ts:35](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L35)

Name of the tool that was executed.
