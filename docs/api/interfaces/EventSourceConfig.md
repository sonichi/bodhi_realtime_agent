[bodhi-realtime-agent](../index.md) / EventSourceConfig

# Interface: EventSourceConfig

Defined in: [types/agent.ts:116](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L116)

Defines a source of external events (e.g. a webhook listener, polling loop).
The framework manages its lifecycle via start/stop.

## Properties

### name

> **name**: `string`

Defined in: [types/agent.ts:118](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L118)

Human-readable name for logging and debugging.

## Methods

### start()

> **start**(`emit`, `signal`): `void`

Defined in: [types/agent.ts:120](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L120)

Begin emitting events. The signal is aborted when the session closes.

#### Parameters

##### emit

(`event`) => `void`

##### signal

`AbortSignal`

#### Returns

`void`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [types/agent.ts:122](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/agent.ts#L122)

Gracefully shut down this event source.

#### Returns

`Promise`\<`void`\>
