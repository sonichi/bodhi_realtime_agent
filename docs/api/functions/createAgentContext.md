[bodhi-realtime-agent](../index.md) / createAgentContext

# Function: createAgentContext()

> **createAgentContext**(`options`): [`AgentContext`](../interfaces/AgentContext.md)

Defined in: [agent/agent-context.ts:66](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/agent-context.ts#L66)

Factory that builds an AgentContext object for agent lifecycle hooks.
Wires `injectSystemMessage` and `getRecentTurns` to the live ConversationContext.

## Parameters

### options

#### agentName

`string`

#### conversationContext

[`ConversationContext`](../classes/ConversationContext.md)

#### hooks

[`HooksManager`](../classes/HooksManager.md)

#### memoryFacts?

[`MemoryFact`](../interfaces/MemoryFact.md)[]

#### requestTransfer?

(`toAgent`) => `void`

#### sendAudioToClient?

(`data`) => `void`

#### sendJsonToClient?

(`message`) => `void`

#### sessionId

`string`

#### setExternalAudioHandler?

(`handler`) => `void`

#### stopBufferingAndDrain?

(`handler`) => `void`

## Returns

[`AgentContext`](../interfaces/AgentContext.md)
