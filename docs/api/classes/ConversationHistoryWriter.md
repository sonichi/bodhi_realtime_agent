[bodhi-realtime-agent](../index.md) / ConversationHistoryWriter

# Class: ConversationHistoryWriter

Defined in: [core/conversation-history-writer.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-history-writer.ts#L17)

EventBus-driven writer that persists conversation items to a ConversationHistoryStore.

Subscribes to session lifecycle events and flushes incremental batches of conversation
items (since the last checkpoint) to the store. Tracks session analytics counters
and writes a final SessionReport on session close.

Call `dispose()` to unsubscribe from all events.

## Constructors

### Constructor

> **new ConversationHistoryWriter**(`sessionId`, `userId`, `initialAgentName`, `eventBus`, `conversationContext`, `store`): `ConversationHistoryWriter`

Defined in: [core/conversation-history-writer.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-history-writer.ts#L27)

#### Parameters

##### sessionId

`string`

##### userId

`string`

##### initialAgentName

`string`

##### eventBus

[`IEventBus`](../interfaces/IEventBus.md)

##### conversationContext

[`ConversationContext`](ConversationContext.md)

##### store

[`ConversationHistoryStore`](../interfaces/ConversationHistoryStore.md)

#### Returns

`ConversationHistoryWriter`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [core/conversation-history-writer.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/conversation-history-writer.ts#L60)

#### Returns

`void`
