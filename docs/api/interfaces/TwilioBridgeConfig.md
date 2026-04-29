[bodhi-realtime-agent](../index.md) / TwilioBridgeConfig

# Interface: TwilioBridgeConfig

Defined in: [telephony/twilio-bridge.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L23)

## Properties

### accountSid

> **accountSid**: `string`

Defined in: [telephony/twilio-bridge.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L25)

Twilio Account SID.

***

### authToken

> **authToken**: `string`

Defined in: [telephony/twilio-bridge.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L27)

Twilio Auth Token.

***

### fromNumber

> **fromNumber**: `string`

Defined in: [telephony/twilio-bridge.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L29)

Twilio phone number to call FROM (your Twilio number, E.164).

***

### machineDetection?

> `optional` **machineDetection**: `boolean`

Defined in: [telephony/twilio-bridge.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L39)

Enable answering machine detection (default: false).

***

### maxCallDuration?

> `optional` **maxCallDuration**: `number`

Defined in: [telephony/twilio-bridge.ts:35](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L35)

Maximum call duration in seconds (Twilio `timeLimit`, default: 1800).

***

### ringTimeout?

> `optional` **ringTimeout**: `number`

Defined in: [telephony/twilio-bridge.ts:37](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L37)

Ring timeout in seconds before no-answer (Twilio `timeout`, default: 30).

***

### webhookBaseUrl

> **webhookBaseUrl**: `string`

Defined in: [telephony/twilio-bridge.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L31)

Public base URL where Twilio sends webhooks (must be HTTPS in production).

***

### webhookPort

> **webhookPort**: `number`

Defined in: [telephony/twilio-bridge.ts:33](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/twilio-bridge.ts#L33)

Port for the webhook HTTP + Media Streams WS server.
