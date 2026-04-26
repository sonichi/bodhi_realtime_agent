[bodhi-realtime-agent](../index.md) / TwilioWebhookServer

# Class: TwilioWebhookServer

Defined in: [telephony/twilio-webhook-server.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L41)

## Constructors

### Constructor

> **new TwilioWebhookServer**(`config`): `TwilioWebhookServer`

Defined in: [telephony/twilio-webhook-server.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L46)

#### Parameters

##### config

[`TwilioWebhookServerConfig`](../interfaces/TwilioWebhookServerConfig.md)

#### Returns

`TwilioWebhookServer`

## Methods

### sendMedia()

> **sendMedia**(`mulawBase64`, `streamSid?`): `void`

Defined in: [telephony/twilio-webhook-server.ts:83](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L83)

Send mulaw audio to Twilio via the active Media Stream.

#### Parameters

##### mulawBase64

`string`

##### streamSid?

`string`

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [telephony/twilio-webhook-server.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L49)

Start the HTTP + WebSocket server.

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [telephony/twilio-webhook-server.ts:63](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-webhook-server.ts#L63)

Stop the server and close all connections.

#### Returns

`Promise`\<`void`\>
