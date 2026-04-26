[bodhi-realtime-agent](../index.md) / SessionRecord

# Interface: SessionRecord

Defined in: [types/history.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L7)

Metadata for a single voice session, stored by ConversationHistoryStore.

## Extended by

- [`SessionReport`](SessionReport.md)

## Properties

### analytics?

> `optional` **analytics**: [`SessionAnalytics`](SessionAnalytics.md)

Defined in: [types/history.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L26)

Aggregated session statistics.

***

### disconnectReason?

> `optional` **disconnectReason**: `"transfer"` \| `"error"` \| `"user_hangup"` \| `"timeout"` \| `"go_away"`

Defined in: [types/history.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L22)

***

### durationMs?

> `optional` **durationMs**: `number`

Defined in: [types/history.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L21)

Total session duration in milliseconds.

***

### endedAt?

> `optional` **endedAt**: `number`

Defined in: [types/history.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L19)

Unix timestamp (ms) when the session ended.

***

### finalAgentName?

> `optional` **finalAgentName**: `string`

Defined in: [types/history.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L14)

Agent that was active when the session ended.

***

### id

> **id**: `string`

Defined in: [types/history.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L9)

Unique session identifier.

***

### initialAgentName

> **initialAgentName**: `string`

Defined in: [types/history.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L12)

Agent that was active when the session started.

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [types/history.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L28)

Application-specific metadata.

***

### startedAt

> **startedAt**: `number`

Defined in: [types/history.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L17)

Unix timestamp (ms) when the session started.

***

### status

> **status**: `"error"` \| `"active"` \| `"ended"`

Defined in: [types/history.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L15)

***

### transcript?

> `optional` **transcript**: `string`

Defined in: [types/history.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L24)

Full text transcript of the session (optional).

***

### userId

> **userId**: `string`

Defined in: [types/history.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/history.ts#L10)
