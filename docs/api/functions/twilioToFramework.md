[bodhi-realtime-agent](../index.md) / twilioToFramework

# Function: twilioToFramework()

> **twilioToFramework**(`mulawBase64`): `Buffer`

Defined in: [telephony/audio-codec.ts:114](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/audio-codec.ts#L114)

Convert Twilio mulaw 8kHz audio to framework PCM L16 16kHz.
Input: base64-encoded mulaw 8kHz buffer.
Output: Buffer of PCM L16 16kHz.

## Parameters

### mulawBase64

`string`

## Returns

`Buffer`
