[bodhi-realtime-agent](../index.md) / MultiClientTransport

# Class: MultiClientTransport

Defined in: [transport/multi-client-transport.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L46)

WebSocket server that manages multiple concurrent client connections.
Each connection can be associated with a VoiceSession.

## Constructors

### Constructor

> **new MultiClientTransport**(`port`, `callbacks`, `host?`): `MultiClientTransport`

Defined in: [transport/multi-client-transport.ts:51](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L51)

#### Parameters

##### port

`number`

##### callbacks

[`MultiClientTransportCallbacks`](../interfaces/MultiClientTransportCallbacks.md)

##### host?

`string` = `'0.0.0.0'`

#### Returns

`MultiClientTransport`

## Methods

### associateSession()

> **associateSession**(`ws`, `sessionId`): `void`

Defined in: [transport/multi-client-transport.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L153)

Associate a session with a WebSocket connection.

#### Parameters

##### ws

`WebSocket`

##### sessionId

`string`

#### Returns

`void`

***

### associateUser()

> **associateUser**(`ws`, `userId`): `void`

Defined in: [transport/multi-client-transport.ts:164](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L164)

Associate a user with a WebSocket connection.

#### Parameters

##### ws

`WebSocket`

##### userId

`string`

#### Returns

`void`

***

### attachToHttpServer()

> **attachToHttpServer**(`httpServer`, `wsPaths?`): `void`

Defined in: [transport/multi-client-transport.ts:91](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L91)

Attach to an existing HTTP server; handle WebSocket upgrade on the given path(s).
Call this instead of start() when you serve HTTP (e.g. /api) and WS on the same port.
Accepts both '/' and '/ws' so client works with same-origin (/) and reverse-proxy (/ws) setups.

#### Parameters

##### httpServer

`Server`

##### wsPaths?

`string` | `string`[]

#### Returns

`void`

***

### broadcast()

> **broadcast**(`message`): `void`

Defined in: [transport/multi-client-transport.ts:195](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L195)

Broadcast a message to all connected clients.

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### getConnectionContext()

> **getConnectionContext**(`ws`): [`ConnectionContext`](../interfaces/ConnectionContext.md) \| `null`

Defined in: [transport/multi-client-transport.ts:146](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L146)

Get connection context for a WebSocket.

#### Parameters

##### ws

`WebSocket`

#### Returns

[`ConnectionContext`](../interfaces/ConnectionContext.md) \| `null`

***

### getStats()

> **getStats**(): `object`

Defined in: [transport/multi-client-transport.ts:207](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L207)

Get statistics about active connections.

#### Returns

`object`

##### connectionsByUser

> **connectionsByUser**: `Record`\<`string`, `number`\>

##### totalConnections

> **totalConnections**: `number`

***

### sendAudioToClient()

> **sendAudioToClient**(`ws`, `data`): `void`

Defined in: [transport/multi-client-transport.ts:175](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L175)

Send audio data to a specific WebSocket connection.

#### Parameters

##### ws

`WebSocket`

##### data

`Buffer`

#### Returns

`void`

***

### sendJsonToClient()

> **sendJsonToClient**(`ws`, `message`): `void`

Defined in: [transport/multi-client-transport.ts:185](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L185)

Send a JSON message to a specific WebSocket connection.

#### Parameters

##### ws

`WebSocket`

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [transport/multi-client-transport.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L60)

Start the WebSocket server on its own port (standalone).

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [transport/multi-client-transport.ts:121](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L121)

Stop the WebSocket server and close all connections.

#### Returns

`Promise`\<`void`\>
