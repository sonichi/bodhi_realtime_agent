[bodhi-realtime-agent](../index.md) / SessionClientSender

# Interface: SessionClientSender

Defined in: [types/session-client.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L7)

Contract for sending data to one client. The server owns the socket and implements this;
VoiceSession sends audio and JSON through it. Input is fed via feedAudioFromClient / feedJsonFromClient.

## Methods

### sendAudio()

> **sendAudio**(`data`): `void`

Defined in: [types/session-client.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L8)

#### Parameters

##### data

`Buffer`

#### Returns

`void`

***

### sendJson()

> **sendJson**(`message`): `void`

Defined in: [types/session-client.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session-client.ts#L9)

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`
