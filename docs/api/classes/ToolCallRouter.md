[bodhi-realtime-agent](../index.md) / ToolCallRouter

# Class: ToolCallRouter

Defined in: [core/tool-call-router.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L37)

Routes tool calls from the LLM to the correct execution path:
inline execution, background subagent handoff, or agent transfer.

Extracted from VoiceSession to reduce its line count and isolate
tool call routing as a self-contained concern.

## Constructors

### Constructor

> **new ToolCallRouter**(`deps`): `ToolCallRouter`

Defined in: [core/tool-call-router.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L40)

#### Parameters

##### deps

[`ToolCallRouterDeps`](../interfaces/ToolCallRouterDeps.md)

#### Returns

`ToolCallRouter`

## Accessors

### toolExecutor

#### Set Signature

> **set** **toolExecutor**(`executor`): `void`

Defined in: [core/tool-call-router.ts:45](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L45)

Update the tool executor (e.g. after an agent transfer).

##### Parameters

###### executor

[`ToolExecutor`](ToolExecutor.md)

##### Returns

`void`

## Methods

### handleToolCallCancellation()

> **handleToolCallCancellation**(`ids`): `void`

Defined in: [core/tool-call-router.ts:98](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L98)

Abort one or more pending tool executions and subagents.

#### Parameters

##### ids

`string`[]

#### Returns

`void`

***

### handleToolCalls()

> **handleToolCalls**(`calls`): `void`

Defined in: [core/tool-call-router.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/tool-call-router.ts#L50)

Dispatch incoming tool calls to the appropriate handler.

#### Parameters

##### calls

`object`[]

#### Returns

`void`
