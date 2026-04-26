[bodhi-realtime-agent](../index.md) / TransportToolResult

# Interface: TransportToolResult

Defined in: [types/transport.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L153)

Tool result sent back to the transport.

## Properties

### id

> **id**: `string`

Defined in: [types/transport.ts:154](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L154)

***

### name

> **name**: `string`

Defined in: [types/transport.ts:155](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L155)

***

### result

> **result**: `unknown`

Defined in: [types/transport.ts:156](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L156)

***

### scheduling?

> `optional` **scheduling**: `"immediate"` \| `"when_idle"` \| `"interrupt"` \| `"silent"`

Defined in: [types/transport.ts:162](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L162)

Delivery scheduling hint. The transport owns actual timing.
 'immediate': send result now (inline tools)
 'when_idle': wait for model to finish speaking (background tools)
 'interrupt': interrupt current response and deliver immediately
 'silent':    send result without triggering a new response
