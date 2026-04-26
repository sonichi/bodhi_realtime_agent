[bodhi-realtime-agent](../index.md) / TranscriptManager

# Class: TranscriptManager

Defined in: [core/transcript-manager.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L21)

Manages input/output transcription buffering, deduplication, and flushing.

Extracted from VoiceSession to isolate transcript accumulation from session
orchestration. Callers feed in transcription events; the manager buffers,
deduplicates across tool-call boundaries, and flushes finalized text to
the provided sink.

## Constructors

### Constructor

> **new TranscriptManager**(`sink`): `TranscriptManager`

Defined in: [core/transcript-manager.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L34)

#### Parameters

##### sink

[`TranscriptSink`](../interfaces/TranscriptSink.md)

#### Returns

`TranscriptManager`

## Properties

### onInputFinalized()?

> `optional` **onInputFinalized**: (`text`) => `void`

Defined in: [core/transcript-manager.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L32)

Optional callback fired when user input is finalized (committed as a non-partial message).
Triggers from both `flushInput()` and the input-flushing section of `flush()`.
Used by VoiceSession to relay finalized user text to interactive subagent sessions.

#### Parameters

##### text

`string`

#### Returns

`void`

## Methods

### correctInput()

> **correctInput**(`text`): `void`

Defined in: [core/transcript-manager.ts:57](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L57)

Replace the current input buffer with an authoritative transcript
(e.g. from Gemini's built-in inputAudioTranscription).
Sends a corrected partial to the client so the UI updates.
No-op if the correction is empty.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### flush()

> **flush**(): `void`

Defined in: [core/transcript-manager.ts:128](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L128)

Flush all transcript buffers — finalize user and assistant messages.

#### Returns

`void`

***

### flushInput()

> **flushInput**(): `void`

Defined in: [core/transcript-manager.ts:112](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L112)

Flush only the input transcript buffer — finalize as a user message and
send a non-partial transcript to the client. Used before tool calls so
the user utterance appears in context before tool results.

#### Returns

`void`

***

### handleInput()

> **handleInput**(`text`): `void`

Defined in: [core/transcript-manager.ts:70](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L70)

Accumulate incoming user speech transcription and emit a partial transcript.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### handleInputPartial()

> **handleInputPartial**(`text`): `void`

Defined in: [core/transcript-manager.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L40)

Handle a partial/interim transcript from a streaming STT provider.
 Sends to client for live display but does NOT accumulate in inputBuffer.
 The streaming provider manages its own partial state — each partial
 replaces the previous one on the client.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### handleOutput()

> **handleOutput**(`text`): `void`

Defined in: [core/transcript-manager.ts:83](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L83)

Accumulate incoming model speech transcription and emit a partial transcript.

#### Parameters

##### text

`string`

#### Returns

`void`

***

### saveOutputPrefix()

> **saveOutputPrefix**(): `void`

Defined in: [core/transcript-manager.ts:100](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/transcript-manager.ts#L100)

Save current output buffer as prefix and reset buffer.
Called before tool execution so post-tool transcription can be deduplicated.

#### Returns

`void`
