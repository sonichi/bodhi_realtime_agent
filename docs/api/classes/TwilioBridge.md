[bodhi-realtime-agent](../index.md) / TwilioBridge

# Class: TwilioBridge

Defined in: [telephony/twilio-bridge.ts:59](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L59)

## Constructors

### Constructor

> **new TwilioBridge**(`config`, `callbacks`): `TwilioBridge`

Defined in: [telephony/twilio-bridge.ts:67](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L67)

#### Parameters

##### config

[`TwilioBridgeConfig`](../interfaces/TwilioBridgeConfig.md)

##### callbacks

[`TwilioBridgeCallbacks`](../interfaces/TwilioBridgeCallbacks.md)

#### Returns

`TwilioBridge`

## Accessors

### currentState

#### Get Signature

> **get** **currentState**(): `BridgeState`

Defined in: [telephony/twilio-bridge.ts:204](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L204)

Current bridge state (for testing/inspection).

##### Returns

`BridgeState`

## Methods

### dial()

> **dial**(`toNumber`): `Promise`\<`string`\>

Defined in: [telephony/twilio-bridge.ts:119](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L119)

Initiate an outbound call to the given phone number.

#### Parameters

##### toNumber

`string`

#### Returns

`Promise`\<`string`\>

The Twilio CallSid.

***

### dispose()

> **dispose**(): `Promise`\<`void`\>

Defined in: [telephony/twilio-bridge.ts:173](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L173)

Clean up all resources (webhook server, call).

#### Returns

`Promise`\<`void`\>

***

### handleStatusCallback()

> **handleStatusCallback**(`callSid`, `callStatus`, `answeredBy?`): `void`

Defined in: [telephony/twilio-bridge.ts:182](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L182)

Handle a Twilio status callback.

#### Parameters

##### callSid

`string`

##### callStatus

`string`

##### answeredBy?

`string`

#### Returns

`void`

***

### hangup()

> **hangup**(): `Promise`\<`void`\>

Defined in: [telephony/twilio-bridge.ts:161](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L161)

Hang up the active call.

#### Returns

`Promise`\<`void`\>

***

### sendAudioToHuman()

> **sendAudioToHuman**(`pcm16kInput`): `void`

Defined in: [telephony/twilio-bridge.ts:153](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L153)

Send PCM L16 16kHz audio TO the human via Twilio Media Streams.
Converts to mulaw 8kHz before sending.

#### Parameters

##### pcm16kInput

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [telephony/twilio-bridge.ts:111](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L111)

Start the webhook server. Must be called before dial().

#### Returns

`Promise`\<`void`\>
