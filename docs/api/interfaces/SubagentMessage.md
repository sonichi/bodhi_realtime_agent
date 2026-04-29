[bodhi-realtime-agent](../index.md) / SubagentMessage

# Interface: SubagentMessage

Defined in: [agent/subagent-session.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L46)

Message sent from a subagent to the user via the main voice agent.

## Properties

### action?

> `optional` **action**: `string`

Defined in: [agent/subagent-session.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L49)

***

### blocking?

> `optional` **blocking**: `boolean`

Defined in: [agent/subagent-session.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L50)

***

### text

> **text**: `string`

Defined in: [agent/subagent-session.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L48)

***

### type

> **type**: `"result"` \| `"progress"` \| `"question"` \| `"approval_request"`

Defined in: [agent/subagent-session.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L47)

***

### uiPayload?

> `optional` **uiPayload**: [`UIPayload`](UIPayload.md)

Defined in: [agent/subagent-session.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/agent/subagent-session.ts#L51)
