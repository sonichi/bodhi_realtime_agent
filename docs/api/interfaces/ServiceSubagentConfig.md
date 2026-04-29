[bodhi-realtime-agent](../index.md) / ServiceSubagentConfig

# Interface: ServiceSubagentConfig

Defined in: [types/agent.ts:103](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L103)

Configuration for a service subagent that reacts to external events
(e.g. webhooks, database changes) and can proactively notify the user.

## Properties

### agent

> **agent**: [`SubagentConfig`](SubagentConfig.md)

Defined in: [types/agent.ts:105](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L105)

The subagent to invoke when an event matches.

***

### eventSources

> **eventSources**: [`EventSourceConfig`](EventSourceConfig.md)[]

Defined in: [types/agent.ts:107](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L107)

Event sources that feed into this service subagent.

## Methods

### shouldInvoke()?

> `optional` **shouldInvoke**(`event`): `boolean`

Defined in: [types/agent.ts:109](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L109)

Optional filter — return true to invoke the subagent for a given event.

#### Parameters

##### event

[`ExternalEvent`](ExternalEvent.md)

#### Returns

`boolean`
