[bodhi-realtime-agent](../index.md) / createAskUserTool

# Function: createAskUserTool()

> **createAskUserTool**(`session`, `maxInputRetries`): `Tool`\<`ZodObject`\<\{ `options`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{ `description`: `ZodString`; `id`: `ZodString`; `label`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>, `"many"`\>\>; `question`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `options?`: `object`[]; `question`: `string`; \}, \{ `options?`: `object`[]; `question`: `string`; \}\>, \{ `error?`: `undefined`; `userResponse`: `string`; \} \| \{ `error`: `string`; `userResponse?`: `undefined`; \}\> & `object`

Defined in: [agent/subagent-runner.ts:80](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-runner.ts#L80)

Create an AI SDK `tool()` that lets the subagent ask the user a question
and wait for a response via the interactive SubagentSession.

Supports optional structured `options` with stable IDs for dual-channel
delivery (voice + UI buttons). When options are present, a `uiPayload`
is included so the client can render clickable buttons.

## Parameters

### session

[`SubagentSession`](../interfaces/SubagentSession.md)

### maxInputRetries

`number`

## Returns

`Tool`\<`ZodObject`\<\{ `options`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{ `description`: `ZodString`; `id`: `ZodString`; `label`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}, \{ `description`: `string`; `id`: `string`; `label`: `string`; \}\>, `"many"`\>\>; `question`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `options?`: `object`[]; `question`: `string`; \}, \{ `options?`: `object`[]; `question`: `string`; \}\>, \{ `error?`: `undefined`; `userResponse`: `string`; \} \| \{ `error`: `string`; `userResponse?`: `undefined`; \}\> & `object`
