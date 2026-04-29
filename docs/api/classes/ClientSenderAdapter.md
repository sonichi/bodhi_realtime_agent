[bodhi-realtime-agent](../index.md) / ClientSenderAdapter

# Class: ClientSenderAdapter

Defined in: [transport/client-sender-adapter.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L12)

Adapts a SessionClientSender (e.g. multi-user WebSocket) to the IClientChannel
interface expected by VoiceSession. Used when the server owns the client connection
and feeds input explicitly via feedAudioFromClient / feedJsonFromClient.

## Implements

- [`IClientChannel`](../interfaces/IClientChannel.md)

## Constructors

### Constructor

> **new ClientSenderAdapter**(`sender`): `ClientSenderAdapter`

Defined in: [transport/client-sender-adapter.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L17)

#### Parameters

##### sender

[`SessionClientSender`](../interfaces/SessionClientSender.md)

#### Returns

`ClientSenderAdapter`

## Methods

### sendAudioToClient()

> **sendAudioToClient**(`data`): `void`

Defined in: [transport/client-sender-adapter.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L30)

#### Parameters

##### data

`Buffer`

#### Returns

`void`

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`sendAudioToClient`](../interfaces/IClientChannel.md#sendaudiotoclient)

***

### sendJsonToClient()

> **sendJsonToClient**(`message`): `void`

Defined in: [transport/client-sender-adapter.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L38)

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`sendJsonToClient`](../interfaces/IClientChannel.md#sendjsontoclient)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [transport/client-sender-adapter.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L21)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`start`](../interfaces/IClientChannel.md#start)

***

### startBuffering()

> **startBuffering**(): `void`

Defined in: [transport/client-sender-adapter.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L42)

#### Returns

`void`

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`startBuffering`](../interfaces/IClientChannel.md#startbuffering)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [transport/client-sender-adapter.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L25)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`stop`](../interfaces/IClientChannel.md#stop)

***

### stopBuffering()

> **stopBuffering**(): `Buffer`\<`ArrayBufferLike`\>[]

Defined in: [transport/client-sender-adapter.ts:47](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/client-sender-adapter.ts#L47)

#### Returns

`Buffer`\<`ArrayBufferLike`\>[]

#### Implementation of

[`IClientChannel`](../interfaces/IClientChannel.md).[`stopBuffering`](../interfaces/IClientChannel.md#stopbuffering)
