[bodhi-realtime-agent](../index.md) / TwilioBridgeCallbacks

# Interface: TwilioBridgeCallbacks

Defined in: [telephony/twilio-bridge.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L42)

## Properties

### onAudioFromHuman()

> **onAudioFromHuman**: (`pcm16kBuffer`) => `void`

Defined in: [telephony/twilio-bridge.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L48)

Called with PCM L16 16kHz audio FROM the human (ready for client).

#### Parameters

##### pcm16kBuffer

`Buffer`

#### Returns

`void`

***

### onCallConnected()

> **onCallConnected**: (`callSid`) => `void`

Defined in: [telephony/twilio-bridge.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L44)

Called when Twilio connects and audio bridge is ready.

#### Parameters

##### callSid

`string`

#### Returns

`void`

***

### onCallEnded()

> **onCallEnded**: (`callSid`, `reason`) => `void`

Defined in: [telephony/twilio-bridge.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L46)

Called when the human hangs up or call ends.

#### Parameters

##### callSid

`string`

##### reason

`string`

#### Returns

`void`

***

### onError()

> **onError**: (`error`) => `void`

Defined in: [telephony/twilio-bridge.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L50)

Called on error (call failed, network issue).

#### Parameters

##### error

`Error`

#### Returns

`void`
