[bodhi-realtime-agent](../index.md) / AgentRouter

# Class: AgentRouter

Defined in: [agent/agent-router.ts:68](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L68)

Manages agent lifecycle: transfers between MainAgents and handoffs to background subagents.

**Transfer flow** (agent → agent):
  onExit → agent.exit event → TRANSFERRING → buffer audio → disconnect →
  reconnect with new agent config → replay context + buffered audio →
  ACTIVE → onEnter → agent.enter event → agent.transfer event

**Handoff flow** (background tool → subagent):
  Create AbortController → build context snapshot → agent.handoff event →
  runSubagent() async → return SubagentResult

## Constructors

### Constructor

> **new AgentRouter**(`sessionManager`, `eventBus`, `hooks`, `conversationContext`, `transport`, `clientTransport`, `model`, `getInstructionSuffix?`, `extraTools?`, `subagentCallbacks?`, `externalAudioCallbacks?`): `AgentRouter`

Defined in: [agent/agent-router.ts:75](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L75)

#### Parameters

##### sessionManager

[`SessionManager`](SessionManager.md)

##### eventBus

[`IEventBus`](../interfaces/IEventBus.md)

##### hooks

[`HooksManager`](HooksManager.md)

##### conversationContext

[`ConversationContext`](ConversationContext.md)

##### transport

[`LLMTransport`](../interfaces/LLMTransport.md)

##### clientTransport

[`IClientChannel`](../interfaces/IClientChannel.md)

##### model

`LanguageModelV1`

##### getInstructionSuffix?

() => `string`

##### extraTools?

[`ToolDefinition`](../interfaces/ToolDefinition.md)[] = `[]`

##### subagentCallbacks?

[`SubagentEventCallbacks`](../interfaces/SubagentEventCallbacks.md)

##### externalAudioCallbacks?

`ExternalAudioCallbacks`

#### Returns

`AgentRouter`

## Properties

### responseModality?

> `optional` **responseModality**: `"text"` \| `"audio"`

Defined in: [agent/agent-router.ts:73](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L73)

Response modality to include in transfer SessionUpdate (set by VoiceSession for TTS).

## Accessors

### activeAgent

#### Get Signature

> **get** **activeAgent**(): [`MainAgent`](../interfaces/MainAgent.md)

Defined in: [agent/agent-router.ts:103](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L103)

##### Returns

[`MainAgent`](../interfaces/MainAgent.md)

***

### activeSubagentCount

#### Get Signature

> **get** **activeSubagentCount**(): `number`

Defined in: [agent/agent-router.ts:345](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L345)

##### Returns

`number`

## Methods

### cancelSubagent()

> **cancelSubagent**(`toolCallId`): `void`

Defined in: [agent/agent-router.ts:336](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L336)

Abort a running background subagent by its originating tool call ID.

#### Parameters

##### toolCallId

`string`

#### Returns

`void`

***

### findSessionByRequestId()

> **findSessionByRequestId**(`requestId`): [`SubagentSession`](../interfaces/SubagentSession.md) \| `null`

Defined in: [agent/agent-router.ts:231](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L231)

Find the SubagentSession that has a pending UI request with the given requestId.

#### Parameters

##### requestId

`string`

#### Returns

[`SubagentSession`](../interfaces/SubagentSession.md) \| `null`

***

### getSubagentSession()

> **getSubagentSession**(`toolCallId`): [`SubagentSession`](../interfaces/SubagentSession.md) \| `null`

Defined in: [agent/agent-router.ts:226](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L226)

Look up the SubagentSession for an active interactive subagent, or null.

#### Parameters

##### toolCallId

`string`

#### Returns

[`SubagentSession`](../interfaces/SubagentSession.md) \| `null`

***

### handoff()

> **handoff**(`toolCall`, `subagentConfig`, `externalSignal?`): `Promise`\<[`SubagentResult`](../interfaces/SubagentResult.md)\>

Defined in: [agent/agent-router.ts:243](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L243)

Spawn a background subagent to handle a tool call asynchronously.

#### Parameters

##### toolCall

[`ToolCall`](../interfaces/ToolCall.md)

##### subagentConfig

[`SubagentConfig`](../interfaces/SubagentConfig.md)

##### externalSignal?

`AbortSignal`

#### Returns

`Promise`\<[`SubagentResult`](../interfaces/SubagentResult.md)\>

***

### registerAgents()

> **registerAgents**(`agents`): `void`

Defined in: [agent/agent-router.ts:89](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L89)

#### Parameters

##### agents

[`MainAgent`](../interfaces/MainAgent.md)[]

#### Returns

`void`

***

### setInitialAgent()

> **setInitialAgent**(`agentName`): `void`

Defined in: [agent/agent-router.ts:95](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L95)

#### Parameters

##### agentName

`string`

#### Returns

`void`

***

### transfer()

> **transfer**(`toAgentName`): `Promise`\<`void`\>

Defined in: [agent/agent-router.ts:115](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-router.ts#L115)

Transfer the active LLM session to a different agent.
Uses transport.transferSession() — the transport decides whether to
apply in-place (OpenAI session.update) or reconnect-based (Gemini).

#### Parameters

##### toAgentName

`string`

#### Returns

`Promise`\<`void`\>
