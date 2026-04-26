[bodhi-realtime-agent](../index.md) / TranscriptSink

# Interface: TranscriptSink

Defined in: [core/transcript-manager.ts:4](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L4)

Callbacks fired by TranscriptManager when transcript state changes.

## Methods

### addAssistantMessage()

> **addAssistantMessage**(`text`): `void`

Defined in: [core/transcript-manager.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L10)

Record a finalized assistant message in conversation context.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### addUserMessage()

> **addUserMessage**(`text`): `void`

Defined in: [core/transcript-manager.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L8)

Record a finalized user message in conversation context.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### sendToClient()

> **sendToClient**(`msg`): `void`

Defined in: [core/transcript-manager.ts:6](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L6)

Send a JSON message to the connected client (partial or final transcript).

#### Parameters

##### msg

`Record`\<`string`, `unknown`\>

#### Returns

`void`
