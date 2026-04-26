[bodhi-realtime-agent](../index.md) / decodeMulawToPcm

# Function: decodeMulawToPcm()

> **decodeMulawToPcm**(`mulawBuf`): `Buffer`

Defined in: [telephony/audio-codec.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/audio-codec.ts#L52)

Decode a mulaw buffer to PCM L16 (16-bit signed LE).
Output has 2x the byte length of input (1 mulaw byte → 2 PCM bytes).

## Parameters

### mulawBuf

`Buffer`

## Returns

`Buffer`
