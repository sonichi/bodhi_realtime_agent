[bodhi-realtime-agent](../index.md) / SessionReport

# Interface: SessionReport

Defined in: [types/history.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L42)

A full session report including conversation items and pending tool state.

## Extends

- [`SessionRecord`](SessionRecord.md)

## Properties

### analytics?

> `optional` **analytics**: [`SessionAnalytics`](SessionAnalytics.md)

Defined in: [types/history.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L26)

Aggregated session statistics.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`analytics`](SessionRecord.md#analytics)

***

### disconnectReason?

> `optional` **disconnectReason**: `"transfer"` \| `"error"` \| `"user_hangup"` \| `"timeout"` \| `"go_away"`

Defined in: [types/history.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L22)

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`disconnectReason`](SessionRecord.md#disconnectreason)

***

### durationMs?

> `optional` **durationMs**: `number`

Defined in: [types/history.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L21)

Total session duration in milliseconds.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`durationMs`](SessionRecord.md#durationms)

***

### endedAt?

> `optional` **endedAt**: `number`

Defined in: [types/history.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L19)

Unix timestamp (ms) when the session ended.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`endedAt`](SessionRecord.md#endedat)

***

### finalAgentName?

> `optional` **finalAgentName**: `string`

Defined in: [types/history.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L14)

Agent that was active when the session ended.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`finalAgentName`](SessionRecord.md#finalagentname)

***

### id

> **id**: `string`

Defined in: [types/history.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L9)

Unique session identifier.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`id`](SessionRecord.md#id)

***

### initialAgentName

> **initialAgentName**: `string`

Defined in: [types/history.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L12)

Agent that was active when the session started.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`initialAgentName`](SessionRecord.md#initialagentname)

***

### items

> **items**: [`ConversationItem`](ConversationItem.md)[]

Defined in: [types/history.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L44)

Complete conversation timeline.

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [types/history.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L28)

Application-specific metadata.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`metadata`](SessionRecord.md#metadata)

***

### pendingToolCalls

> **pendingToolCalls**: [`PendingToolCall`](PendingToolCall.md)[]

Defined in: [types/history.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L46)

Tool calls that were still running when the session ended.

***

### startedAt

> **startedAt**: `number`

Defined in: [types/history.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L17)

Unix timestamp (ms) when the session started.

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`startedAt`](SessionRecord.md#startedat)

***

### status

> **status**: `"error"` \| `"active"` \| `"ended"`

Defined in: [types/history.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L15)

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`status`](SessionRecord.md#status)

***

### transcript?

> `optional` **transcript**: `string`

Defined in: [types/history.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L24)

Full text transcript of the session (optional).

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`transcript`](SessionRecord.md#transcript)

***

### userId

> **userId**: `string`

Defined in: [types/history.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L10)

#### Inherited from

[`SessionRecord`](SessionRecord.md).[`userId`](SessionRecord.md#userid)
