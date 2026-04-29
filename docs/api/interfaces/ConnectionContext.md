[bodhi-realtime-agent](../index.md) / ConnectionContext

# Interface: ConnectionContext

Defined in: [transport/multi-client-transport.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L15)

## Properties

### connectedAt

> **connectedAt**: `number`

Defined in: [transport/multi-client-transport.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L19)

***

### lastActivityAt

> **lastActivityAt**: `number`

Defined in: [transport/multi-client-transport.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L20)

***

### request?

> `optional` **request**: `IncomingMessage`

Defined in: [transport/multi-client-transport.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L22)

HTTP upgrade request (for auth to read URL query, e.g. ?userId=).

***

### sessionId

> **sessionId**: `string` \| `null`

Defined in: [transport/multi-client-transport.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L17)

***

### userId

> **userId**: `string` \| `null`

Defined in: [transport/multi-client-transport.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L18)

***

### webSocketId

> **webSocketId**: `string`

Defined in: [transport/multi-client-transport.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L16)
