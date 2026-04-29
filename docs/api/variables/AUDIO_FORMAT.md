[bodhi-realtime-agent](../index.md) / AUDIO\_FORMAT

# Variable: AUDIO\_FORMAT

> `const` **AUDIO\_FORMAT**: `object`

Defined in: [types/audio.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/audio.ts#L7)

PCM 16-bit signed little-endian, 16 kHz mono — Gemini Live API's native audio format.
All audio buffers and transport operations assume this format.

## Type Declaration

### bitDepth

> `readonly` **bitDepth**: `16` = `16`

### bytesPerSample

> `readonly` **bytesPerSample**: `2` = `2`

### bytesPerSecond

> `readonly` **bytesPerSecond**: `32000` = `32000`

16000 samples/s * 2 bytes/sample = 32 000 bytes/s

### channels

> `readonly` **channels**: `1` = `1`

### sampleRate

> `readonly` **sampleRate**: `16000` = `16000`
