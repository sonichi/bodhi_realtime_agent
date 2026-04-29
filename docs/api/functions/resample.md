[bodhi-realtime-agent](../index.md) / resample

# Function: resample()

> **resample**(`pcmBuf`, `fromRate`, `toRate`): `Buffer`

Defined in: [telephony/audio-codec.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/telephony/audio-codec.ts#L82)

Resample PCM L16 audio between sample rates using linear interpolation.
Input and output are Buffers of 16-bit signed LE samples.

## Parameters

### pcmBuf

`Buffer`

### fromRate

`number`

### toRate

`number`

## Returns

`Buffer`
