[bodhi-realtime-agent](../index.md) / ToolDefinition

# Interface: ToolDefinition

Defined in: [types/tool.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L17)

Declares a tool that Gemini can invoke during a voice session.
The framework converts the Zod schema to a Gemini function declaration,
validates arguments at runtime, and routes execution based on the `execution` mode.

## Properties

### description

> **description**: `string`

Defined in: [types/tool.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L21)

Description shown to the model to guide tool selection.

***

### execution

> **execution**: [`ToolExecution`](../type-aliases/ToolExecution.md)

Defined in: [types/tool.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L25)

Whether this tool runs inline (blocking) or in the background (non-blocking).

***

### name

> **name**: `string`

Defined in: [types/tool.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L19)

Unique tool name (must match across declaration and execution).

***

### parameters

> **parameters**: `ZodType`

Defined in: [types/tool.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L23)

Zod schema used for both Gemini declaration and runtime argument validation.

***

### pendingMessage?

> `optional` **pendingMessage**: `string`

Defined in: [types/tool.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L27)

For background tools: message sent to Gemini immediately so it can acknowledge the request.

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [types/tool.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L29)

Execution timeout in milliseconds (default 30 000).

## Methods

### execute()

> **execute**(`args`, `ctx`): `Promise`\<`unknown`\>

Defined in: [types/tool.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/tool.ts#L31)

Execute the tool with validated arguments and an abort-aware context.

#### Parameters

##### args

`Record`\<`string`, `unknown`\>

##### ctx

[`ToolContext`](ToolContext.md)

#### Returns

`Promise`\<`unknown`\>
