[bodhi-realtime-agent](../index.md) / SubagentContextSnapshot

# Interface: SubagentContextSnapshot

Defined in: [types/conversation.ts:68](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L68)

Everything a subagent needs to understand the current conversation state.
Built by ConversationContext and passed to the subagent runner.

## Properties

### agentInstructions

> **agentInstructions**: `string`

Defined in: [types/conversation.ts:78](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L78)

The subagent's own system instructions.

***

### conversationSummary

> **conversationSummary**: `string` \| `null`

Defined in: [types/conversation.ts:72](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L72)

Compressed summary of earlier conversation (null if no summarization has occurred).

***

### recentTurns

> **recentTurns**: [`ConversationItem`](ConversationItem.md)[]

Defined in: [types/conversation.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L74)

The most recent conversation items for immediate context.

***

### relevantMemoryFacts

> **relevantMemoryFacts**: [`MemoryFact`](MemoryFact.md)[]

Defined in: [types/conversation.ts:76](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L76)

User-specific memory facts relevant to the task.

***

### task

> **task**: [`SubagentTask`](SubagentTask.md)

Defined in: [types/conversation.ts:70](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/conversation.ts#L70)

The task the subagent should execute.
