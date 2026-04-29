[bodhi-realtime-agent](../index.md) / IClientChannel

# Interface: IClientChannel

Defined in: [types/session-client.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L13)

Internal channel used by VoiceSession (send + buffering). Implemented by ClientSenderAdapter.

## Methods

### sendAudioToClient()

> **sendAudioToClient**(`data`): `void`

Defined in: [types/session-client.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L16)

#### Parameters

##### data

`Buffer`

#### Returns

`void`

***

### sendJsonToClient()

> **sendJsonToClient**(`message`): `void`

Defined in: [types/session-client.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L17)

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [types/session-client.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L14)

#### Returns

`Promise`\<`void`\>

***

### startBuffering()

> **startBuffering**(): `void`

Defined in: [types/session-client.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L18)

#### Returns

`void`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [types/session-client.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L15)

#### Returns

`Promise`\<`void`\>

***

### stopBuffering()

> **stopBuffering**(): `Buffer`\<`ArrayBufferLike`\>[]

Defined in: [types/session-client.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L19)

#### Returns

`Buffer`\<`ArrayBufferLike`\>[]
