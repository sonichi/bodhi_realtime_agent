[bodhi-realtime-agent](../index.md) / ToolExecutor

# Class: ToolExecutor

Defined in: [tools/tool-executor.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L24)

Executes inline tool calls requested by Gemini.

For each tool call: validates arguments via Zod, creates an AbortController,
fires onToolCall/onToolResult hooks, publishes EventBus events, and enforces timeouts.
Multiple tool calls can run concurrently — each is tracked in the `pending` map.

## Constructors

### Constructor

> **new ToolExecutor**(`hooks`, `eventBus`, `sessionId`, `agentName`, `sendJsonToClient?`, `setDirective?`): `ToolExecutor`

Defined in: [tools/tool-executor.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L28)

#### Parameters

##### hooks

[`HooksManager`](HooksManager.md)

##### eventBus

[`IEventBus`](../interfaces/IEventBus.md)

##### sessionId

`string`

##### agentName

`string`

##### sendJsonToClient?

(`message`) => `void`

##### setDirective?

(`key`, `value`, `scope?`) => `void`

#### Returns

`ToolExecutor`

## Accessors

### pendingCount

#### Get Signature

> **get** **pendingCount**(): `number`

Defined in: [tools/tool-executor.ts:182](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L182)

##### Returns

`number`

## Methods

### cancel()

> **cancel**(`toolCallIds`): `void`

Defined in: [tools/tool-executor.ts:159](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L159)

Abort one or more pending tool executions and fire cancellation hooks/events.

#### Parameters

##### toolCallIds

`string`[]

#### Returns

`void`

***

### handleToolCall()

> **handleToolCall**(`call`): `Promise`\<[`ToolResult`](../interfaces/ToolResult.md)\>

Defined in: [tools/tool-executor.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L44)

Execute a tool call: validate args, run with timeout, fire hooks, return result.

#### Parameters

##### call

[`ToolCall`](../interfaces/ToolCall.md)

#### Returns

`Promise`\<[`ToolResult`](../interfaces/ToolResult.md)\>

***

### register()

> **register**(`tools`): `void`

Defined in: [tools/tool-executor.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/tools/tool-executor.ts#L37)

#### Parameters

##### tools

[`ToolDefinition`](../interfaces/ToolDefinition.md)[]

#### Returns

`void`
