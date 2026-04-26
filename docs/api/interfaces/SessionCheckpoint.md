[bodhi-realtime-agent](../index.md) / SessionCheckpoint

# Interface: SessionCheckpoint

Defined in: [types/session.ts:59](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L59)

A serializable snapshot of the entire session state.
Used by SessionStore for persistence and crash recovery.

## Properties

### activeAgent

> **activeAgent**: `string`

Defined in: [types/session.ts:63](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L63)

Name of the currently active agent.

***

### conversationItems

> **conversationItems**: [`ConversationItem`](ConversationItem.md)[]

Defined in: [types/session.ts:67](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L67)

Full conversation history at checkpoint time.

***

### conversationSummary

> **conversationSummary**: `string` \| `null`

Defined in: [types/session.ts:69](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L69)

Compressed conversation summary (null if not yet summarized).

***

### pendingToolCalls

> **pendingToolCalls**: [`PendingToolCall`](PendingToolCall.md)[]

Defined in: [types/session.ts:71](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L71)

Tool calls that were still in flight when the checkpoint was taken.

***

### resumptionHandle

> **resumptionHandle**: `string` \| `null`

Defined in: [types/session.ts:65](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L65)

Last known Gemini resumption handle.

***

### sessionId

> **sessionId**: `string`

Defined in: [types/session.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L60)

***

### timestamp

> **timestamp**: `number`

Defined in: [types/session.ts:73](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L73)

Unix timestamp in milliseconds.

***

### userId

> **userId**: `string`

Defined in: [types/session.ts:61](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L61)
