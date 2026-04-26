[bodhi-realtime-agent](../index.md) / ToolCall

# Interface: ToolCall

Defined in: [types/conversation.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L21)

A tool invocation request from the model.

## Properties

### args

> **args**: `Record`\<`string`, `unknown`\>

Defined in: [types/conversation.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L27)

Parsed arguments for the tool.

***

### toolCallId

> **toolCallId**: `string`

Defined in: [types/conversation.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L23)

Unique ID assigned by Gemini for correlating call → result.

***

### toolName

> **toolName**: `string`

Defined in: [types/conversation.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L25)

Name of the tool being invoked.
