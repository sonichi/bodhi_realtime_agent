[bodhi-realtime-agent](../index.md) / HooksManager

# Class: HooksManager

Defined in: [core/hooks.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L9)

Manages registered lifecycle hooks and exposes them as getter accessors.
Zero-overhead pattern: callers check `if (hooks.onX) hooks.onX(event)`.

## Constructors

### Constructor

> **new HooksManager**(): `HooksManager`

#### Returns

`HooksManager`

## Accessors

### onAgentTransfer

#### Get Signature

> **get** **onAgentTransfer**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L32)

##### Returns

(`event`) => `void`

Fires after an agent transfer completes (reconnection included).

##### Parameters

###### event

###### fromAgent

`string`

###### reconnectMs

`number`

###### sessionId

`string`

###### toAgent

`string`

##### Returns

`void`

`undefined`

***

### onError

#### Get Signature

> **get** **onError**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L47)

##### Returns

(`event`) => `void`

Fires on any framework error. Use for centralized error logging/alerting.

##### Parameters

###### event

###### component

`string`

###### error

`Error`

###### sessionId?

`string`

###### severity

`"error"` \| `"warn"` \| `"fatal"`

##### Returns

`void`

`undefined`

***

### onMemoryExtraction

#### Get Signature

> **get** **onMemoryExtraction**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L41)

##### Returns

(`event`) => `void`

Fires after the memory distiller extracts facts from conversation.

##### Parameters

###### event

###### durationMs

`number`

###### factsExtracted

`number`

###### userId

`string`

##### Returns

`void`

`undefined`

***

### onRealtimeLLMUsage

#### Get Signature

> **get** **onRealtimeLLMUsage**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L38)

##### Returns

(`event`) => `void`

Fires when a realtime LLM transport reports provider usage (tokens or duration).

##### Parameters

###### event

###### agentName

`string`

###### sessionId

`string`

###### usage

[`RealtimeLLMUsageEvent`](../interfaces/RealtimeLLMUsageEvent.md)

##### Returns

`void`

`undefined`

***

### onSessionEnd

#### Get Signature

> **get** **onSessionEnd**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L20)

##### Returns

(`event`) => `void`

Fires when the session transitions to CLOSED.

##### Parameters

###### event

###### durationMs

`number`

###### reason

`string`

###### sessionId

`string`

##### Returns

`void`

`undefined`

***

### onSessionStart

#### Get Signature

> **get** **onSessionStart**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L17)

##### Returns

(`event`) => `void`

Fires when the Gemini connection becomes ACTIVE for the first time.

##### Parameters

###### event

###### agentName

`string`

###### sessionId

`string`

###### userId

`string`

##### Returns

`void`

`undefined`

***

### onSubagentStep

#### Get Signature

> **get** **onSubagentStep**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:35](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L35)

##### Returns

(`event`) => `void`

Fires after each step of a background subagent's LLM execution.

##### Parameters

###### event

###### stepNumber

`number`

###### subagentName

`string`

###### tokensUsed

`number`

###### toolCalls

`string`[]

##### Returns

`void`

`undefined`

***

### onToolCall

#### Get Signature

> **get** **onToolCall**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L26)

##### Returns

(`event`) => `void`

Fires when Gemini requests a tool invocation (before execution).

##### Parameters

###### event

###### agentName

`string`

###### execution

[`ToolExecution`](../type-aliases/ToolExecution.md)

###### sessionId

`string`

###### toolCallId

`string`

###### toolName

`string`

##### Returns

`void`

`undefined`

***

### onToolResult

#### Get Signature

> **get** **onToolResult**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L29)

##### Returns

(`event`) => `void`

Fires after a tool completes, is cancelled, or errors.

##### Parameters

###### event

###### durationMs

`number`

###### error?

`string`

###### status

`"completed"` \| `"cancelled"` \| `"error"`

###### toolCallId

`string`

##### Returns

`void`

`undefined`

***

### onTTSSynthesis

#### Get Signature

> **get** **onTTSSynthesis**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L44)

##### Returns

(`event`) => `void`

Fires after each TTS synthesis request completes.

##### Parameters

###### event

###### audioMs

`number`

###### durationMs

`number`

###### provider

`string`

###### requestId

`number`

###### sessionId

`string`

###### textLength

`number`

###### ttfbMs

`number`

##### Returns

`void`

`undefined`

***

### onTurnLatency

#### Get Signature

> **get** **onTurnLatency**(): (`event`) => `void` \| `undefined`

Defined in: [core/hooks.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L23)

##### Returns

(`event`) => `void`

Fires at the end of each turn with segment-level latency breakdown.

##### Parameters

###### event

###### segments

\{ `backendToClientMs?`: `number`; `backendToGeminiMs?`: `number`; `clientToBackendMs?`: `number`; `geminiProcessingMs?`: `number`; `geminiToBackendMs?`: `number`; `totalE2EMs`: `number`; \}

###### segments.backendToClientMs?

`number`

###### segments.backendToGeminiMs?

`number`

###### segments.clientToBackendMs?

`number`

###### segments.geminiProcessingMs?

`number`

###### segments.geminiToBackendMs?

`number`

###### segments.totalE2EMs

`number`

###### sessionId

`string`

###### turnId

`string`

##### Returns

`void`

`undefined`

## Methods

### register()

> **register**(`hooks`): `void`

Defined in: [core/hooks.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/hooks.ts#L13)

Register (or overwrite) hook callbacks. Merges with any previously registered hooks.

#### Parameters

##### hooks

[`FrameworkHooks`](../interfaces/FrameworkHooks.md)

#### Returns

`void`
