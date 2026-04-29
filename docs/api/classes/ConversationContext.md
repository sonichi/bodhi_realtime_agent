[bodhi-realtime-agent](../index.md) / ConversationContext

# Class: ConversationContext

Defined in: [core/conversation-context.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L24)

In-memory conversation timeline that tracks all messages, tool calls, and agent transfers.

Key concepts:
- **Items**: Append-only list of ConversationItems (user messages, assistant messages, tool events, transfers).
- **Checkpoint**: A cursor into the items list. `getItemsSinceCheckpoint()` returns only new items since the last checkpoint.
  Used by ConversationHistoryWriter and MemoryDistiller to process incremental batches.
- **Summary**: A compressed representation of older conversation turns. When set via `setSummary()`,
  items before the checkpoint are evicted (they're captured in the summary).
- **Token estimate**: Rough heuristic (`content.length / 4`) used to decide when to trigger summarization.

## Constructors

### Constructor

> **new ConversationContext**(): `ConversationContext`

#### Returns

`ConversationContext`

## Accessors

### items

#### Get Signature

> **get** **items**(): readonly [`ConversationItem`](../interfaces/ConversationItem.md)[]

Defined in: [core/conversation-context.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L29)

##### Returns

readonly [`ConversationItem`](../interfaces/ConversationItem.md)[]

***

### summary

#### Get Signature

> **get** **summary**(): `string` \| `null`

Defined in: [core/conversation-context.ts:33](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L33)

##### Returns

`string` \| `null`

***

### tokenEstimate

#### Get Signature

> **get** **tokenEstimate**(): `number`

Defined in: [core/conversation-context.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L38)

Rough token count estimate for all items + summary (content.length / 4).

##### Returns

`number`

## Methods

### addAgentTransfer()

> **addAgentTransfer**(`fromAgent`, `toAgent`): `void`

Defined in: [core/conversation-context.ts:73](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L73)

#### Parameters

##### fromAgent

`string`

##### toAgent

`string`

#### Returns

`void`

***

### addAssistantMessage()

> **addAssistantMessage**(`content`): `void`

Defined in: [core/conversation-context.ts:53](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L53)

#### Parameters

##### content

`string`

#### Returns

`void`

***

### addToolCall()

> **addToolCall**(`call`): `void`

Defined in: [core/conversation-context.ts:57](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L57)

#### Parameters

##### call

[`ToolCall`](../interfaces/ToolCall.md)

#### Returns

`void`

***

### addToolResult()

> **addToolResult**(`result`): `void`

Defined in: [core/conversation-context.ts:65](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L65)

#### Parameters

##### result

[`ToolResult`](../interfaces/ToolResult.md)

#### Returns

`void`

***

### addUserMessage()

> **addUserMessage**(`content`): `void`

Defined in: [core/conversation-context.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L49)

#### Parameters

##### content

`string`

#### Returns

`void`

***

### getItemsSinceCheckpoint()

> **getItemsSinceCheckpoint**(): [`ConversationItem`](../interfaces/ConversationItem.md)[]

Defined in: [core/conversation-context.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L82)

Return all items added since the last checkpoint (or all items if no checkpoint set).

#### Returns

[`ConversationItem`](../interfaces/ConversationItem.md)[]

***

### getSubagentContext()

> **getSubagentContext**(`task`, `agentInstructions`, `memoryFacts`, `recentTurnCount?`): [`SubagentContextSnapshot`](../interfaces/SubagentContextSnapshot.md)

Defined in: [core/conversation-context.ts:112](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L112)

Build a snapshot of conversation state for a subagent (summary + recent turns + memory).

#### Parameters

##### task

[`SubagentTask`](../interfaces/SubagentTask.md)

##### agentInstructions

`string`

##### memoryFacts

[`MemoryFact`](../interfaces/MemoryFact.md)[]

##### recentTurnCount?

`number` = `10`

#### Returns

[`SubagentContextSnapshot`](../interfaces/SubagentContextSnapshot.md)

***

### loadItems()

> **loadItems**(`items`): `void`

Defined in: [core/conversation-context.ts:96](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L96)

Load existing items (e.g. when resuming from persisted history).
Appends to the timeline and advances the checkpoint so these items are not
re-flushed by ConversationHistoryWriter.

#### Parameters

##### items

[`ConversationItem`](../interfaces/ConversationItem.md)[]

#### Returns

`void`

***

### markCheckpoint()

> **markCheckpoint**(): `void`

Defined in: [core/conversation-context.ts:87](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L87)

Advance the checkpoint cursor to the current end of the items list.

#### Returns

`void`

***

### setSummary()

> **setSummary**(`summary`): `void`

Defined in: [core/conversation-context.ts:104](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L104)

Store a compressed summary and evict all items before the current checkpoint.

#### Parameters

##### summary

`string`

#### Returns

`void`

***

### toReplayContent()

> **toReplayContent**(): [`ReplayItem`](../type-aliases/ReplayItem.md)[]

Defined in: [core/conversation-context.ts:129](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-context.ts#L129)

Format the conversation as provider-neutral ReplayItem[] for replay after reconnection.

#### Returns

[`ReplayItem`](../type-aliases/ReplayItem.md)[]
