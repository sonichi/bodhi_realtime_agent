[bodhi-realtime-agent](../index.md) / FrameworkHooks

# Interface: FrameworkHooks

Defined in: [types/hooks.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L11)

Optional lifecycle hooks for observability, logging, and metrics.
All hooks are synchronous and fire-and-forget — exceptions are caught and logged.
Register hooks via VoiceSessionConfig or HooksManager.register().

## Methods

### onAgentTransfer()?

> `optional` **onAgentTransfer**(`event`): `void`

Defined in: [types/hooks.ts:58](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L58)

Fires after an agent transfer completes (reconnection included).

#### Parameters

##### event

###### fromAgent

`string`

###### reconnectMs

`number`

###### sessionId

`string`

###### toAgent

`string`

#### Returns

`void`

***

### onError()?

> `optional` **onError**(`event`): `void`

Defined in: [types/hooks.ts:99](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L99)

Fires on any framework error. Use for centralized error logging/alerting.

#### Parameters

##### event

###### component

`string`

###### error

`Error`

###### sessionId?

`string`

###### severity

`"error"` \| `"warn"` \| `"fatal"`

#### Returns

`void`

***

### onMemoryExtraction()?

> `optional` **onMemoryExtraction**(`event`): `void`

Defined in: [types/hooks.ts:81](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L81)

Fires after the memory distiller extracts facts from conversation.

#### Parameters

##### event

###### durationMs

`number`

###### factsExtracted

`number`

###### userId

`string`

#### Returns

`void`

***

### onRealtimeLLMUsage()?

> `optional` **onRealtimeLLMUsage**(`event`): `void`

Defined in: [types/hooks.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L74)

Fires when a realtime LLM transport reports provider usage (tokens or duration).

#### Parameters

##### event

###### agentName

`string`

###### sessionId

`string`

###### usage

[`RealtimeLLMUsageEvent`](RealtimeLLMUsageEvent.md)

#### Returns

`void`

***

### onSessionEnd()?

> `optional` **onSessionEnd**(`event`): `void`

Defined in: [types/hooks.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L20)

Fires when the session transitions to CLOSED.

#### Parameters

##### event

###### durationMs

`number`

###### reason

`string`

###### sessionId

`string`

#### Returns

`void`

***

### onSessionStart()?

> `optional` **onSessionStart**(`event`): `void`

Defined in: [types/hooks.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L13)

Fires when the Gemini connection becomes ACTIVE for the first time.

#### Parameters

##### event

###### agentName

`string`

###### sessionId

`string`

###### userId

`string`

#### Returns

`void`

***

### onSubagentStep()?

> `optional` **onSubagentStep**(`event`): `void`

Defined in: [types/hooks.ts:66](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L66)

Fires after each step of a background subagent's LLM execution.

#### Parameters

##### event

###### stepNumber

`number`

###### subagentName

`string`

###### tokensUsed

`number`

###### toolCalls

`string`[]

#### Returns

`void`

***

### onToolCall()?

> `optional` **onToolCall**(`event`): `void`

Defined in: [types/hooks.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L41)

Fires when Gemini requests a tool invocation (before execution).

#### Parameters

##### event

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

#### Returns

`void`

***

### onToolResult()?

> `optional` **onToolResult**(`event`): `void`

Defined in: [types/hooks.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L50)

Fires after a tool completes, is cancelled, or errors.

#### Parameters

##### event

###### durationMs

`number`

###### error?

`string`

###### status

`"completed"` \| `"cancelled"` \| `"error"`

###### toolCallId

`string`

#### Returns

`void`

***

### onTTSSynthesis()?

> `optional` **onTTSSynthesis**(`event`): `void`

Defined in: [types/hooks.ts:88](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L88)

Fires after each TTS synthesis request completes.

#### Parameters

##### event

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

#### Returns

`void`

***

### onTurnLatency()?

> `optional` **onTurnLatency**(`event`): `void`

Defined in: [types/hooks.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/hooks.ts#L27)

Fires at the end of each turn with segment-level latency breakdown.

#### Parameters

##### event

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

#### Returns

`void`
