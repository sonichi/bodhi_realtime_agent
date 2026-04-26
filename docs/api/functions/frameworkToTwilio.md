[bodhi-realtime-agent](../index.md) / frameworkToTwilio

# Function: frameworkToTwilio()

> **frameworkToTwilio**(`pcmInput`, `inputRate?`): `string`

Defined in: [telephony/audio-codec.ts:128](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/audio-codec.ts#L128)

Convert framework PCM audio to Twilio mulaw 8kHz.
Input: Buffer of PCM L16 (or base64 string) at the given sample rate.
Output: base64-encoded mulaw 8kHz buffer.

## Parameters

### pcmInput

PCM L16 buffer or base64-encoded PCM string

`string` | `Buffer`\<`ArrayBufferLike`\>

### inputRate?

`number` = `16000`

Sample rate of the input in Hz (default: 16000)

## Returns

`string`
