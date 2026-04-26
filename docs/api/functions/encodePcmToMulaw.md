[bodhi-realtime-agent](../index.md) / encodePcmToMulaw

# Function: encodePcmToMulaw()

> **encodePcmToMulaw**(`pcmBuf`): `Buffer`

Defined in: [telephony/audio-codec.ts:65](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/audio-codec.ts#L65)

Encode a PCM L16 buffer (16-bit signed LE) to mulaw.
Output has half the byte length of input (2 PCM bytes → 1 mulaw byte).

## Parameters

### pcmBuf

`Buffer`

## Returns

`Buffer`
