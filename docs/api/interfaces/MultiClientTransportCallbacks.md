[bodhi-realtime-agent](../index.md) / MultiClientTransportCallbacks

# Interface: MultiClientTransportCallbacks

Defined in: [transport/multi-client-transport.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L25)

## Methods

### onAudioFromClient()?

> `optional` **onAudioFromClient**(`ws`, `data`, `context`): `void`

Defined in: [transport/multi-client-transport.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L31)

Called when binary audio data is received from a client

#### Parameters

##### ws

`WebSocket`

##### data

`Buffer`

##### context

[`ConnectionContext`](ConnectionContext.md)

#### Returns

`void`

***

### onConnection()?

> `optional` **onConnection**(`ws`, `context`): `void` \| `Promise`\<`void`\>

Defined in: [transport/multi-client-transport.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L27)

Called when a new WebSocket connection is established

#### Parameters

##### ws

`WebSocket`

##### context

[`ConnectionContext`](ConnectionContext.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onDisconnection()?

> `optional` **onDisconnection**(`ws`, `context`): `void` \| `Promise`\<`void`\>

Defined in: [transport/multi-client-transport.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L29)

Called when a WebSocket connection is closed

#### Parameters

##### ws

`WebSocket`

##### context

[`ConnectionContext`](ConnectionContext.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onError()?

> `optional` **onError**(`ws`, `error`, `context`): `void`

Defined in: [transport/multi-client-transport.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L39)

Called when a WebSocket error occurs

#### Parameters

##### ws

`WebSocket`

##### error

`Error`

##### context

[`ConnectionContext`](ConnectionContext.md)

#### Returns

`void`

***

### onJsonFromClient()?

> `optional` **onJsonFromClient**(`ws`, `message`, `context`): `void`

Defined in: [transport/multi-client-transport.ts:33](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/multi-client-transport.ts#L33)

Called when a JSON message is received from a client

#### Parameters

##### ws

`WebSocket`

##### message

`Record`\<`string`, `unknown`\>

##### context

[`ConnectionContext`](ConnectionContext.md)

#### Returns

`void`
