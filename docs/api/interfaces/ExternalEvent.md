[bodhi-realtime-agent](../index.md) / ExternalEvent

# Interface: ExternalEvent

Defined in: [types/agent.ts:126](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L126)

An event from an external system delivered to a service subagent.

## Properties

### data

> **data**: `Record`\<`string`, `unknown`\>

Defined in: [types/agent.ts:132](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L132)

Arbitrary event payload.

***

### priority?

> `optional` **priority**: [`NotificationPriority`](../type-aliases/NotificationPriority.md)

Defined in: [types/agent.ts:134](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L134)

Delivery priority — urgent events may interrupt the current turn.

***

### source

> **source**: `string`

Defined in: [types/agent.ts:128](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L128)

Originating system (e.g. "webhook", "database").

***

### type

> **type**: `string`

Defined in: [types/agent.ts:130](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L130)

Event type within that source (e.g. "order.created").
