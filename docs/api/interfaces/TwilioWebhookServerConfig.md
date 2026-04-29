[bodhi-realtime-agent](../index.md) / TwilioWebhookServerConfig

# Interface: TwilioWebhookServerConfig

Defined in: [telephony/twilio-webhook-server.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L20)

## Properties

### authToken

> **authToken**: `string`

Defined in: [telephony/twilio-webhook-server.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L24)

Twilio Auth Token for signature validation (future use).

***

### onMediaReceived()

> **onMediaReceived**: (`base64Audio`) => `void`

Defined in: [telephony/twilio-webhook-server.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L28)

Called when audio media is received from the human.

#### Parameters

##### base64Audio

`string`

#### Returns

`void`

***

### onStatusCallback()?

> `optional` **onStatusCallback**: (`callSid`, `callStatus`, `answeredBy?`) => `void`

Defined in: [telephony/twilio-webhook-server.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L34)

Optional: called on Twilio status callbacks.

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

### onStreamStarted()

> **onStreamStarted**: (`streamSid`, `callSid`) => `void`

Defined in: [telephony/twilio-webhook-server.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L30)

Called when the Media Stream starts.

#### Parameters

##### streamSid

`string`

##### callSid

`string`

#### Returns

`void`

***

### onStreamStopped()

> **onStreamStopped**: () => `void`

Defined in: [telephony/twilio-webhook-server.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L32)

Called when the Media Stream stops.

#### Returns

`void`

***

### port

> **port**: `number`

Defined in: [telephony/twilio-webhook-server.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L22)

Port to listen on.

***

### wsAuthToken

> **wsAuthToken**: `string`

Defined in: [telephony/twilio-webhook-server.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L26)

Per-call nonce token for WS auth.
