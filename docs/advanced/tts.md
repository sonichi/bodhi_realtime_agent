# External TTS

External TTS lets the realtime LLM produce text while a dedicated speech provider synthesizes the audio heard by the user. Use it when you need a specific voice, lower synthesis latency from a TTS vendor, word timing, or provider-specific voice controls.

## Built-In Providers

| Provider | Class | Notes |
|----------|-------|-------|
| Cartesia | `CartesiaTTSProvider` | Uses Cartesia Sonic WebSocket streaming, sentence buffering, speed, emotion, and voice ID controls. |
| ElevenLabs | `ElevenLabsTTSProvider` | Uses ElevenLabs stream-input WebSocket API, sentence buffering, voice settings, language code, and backpressure. |

Both implement the provider-agnostic `TTSProvider` interface.

## Session Flow

```
Client mic
  -> VoiceSession
  -> LLMTransport in text response mode
  -> TTSProvider.synthesize(text, requestId)
  -> TTSProvider.onAudio(base64Pcm, durationMs, requestId)
  -> VoiceSession
  -> client speaker
```

When `ttsProvider` is set:

1. `VoiceSession` configures the LLM transport for text-mode responses.
2. The provider receives the preferred output audio format with `configure()`.
3. Text deltas from the LLM are streamed into `synthesize()`.
4. Audio chunks from the provider are sent to the client.
5. `requestId` filters stale chunks after interruption or cancellation.
6. Turn completion waits until both the LLM text stream and TTS audio stream finish.

## Cartesia Example

```typescript
import { google } from '@ai-sdk/google';
import {
  CartesiaTTSProvider,
  GeminiBatchSTTProvider,
  VoiceSession,
} from 'bodhi-realtime-agent';

const ttsProvider = new CartesiaTTSProvider({
  apiKey: process.env.CARTESIA_API_KEY!,
  voiceId: process.env.CARTESIA_VOICE_ID!,
  modelId: 'sonic-2',
  speed: 'normal',
  emotion: ['friendly'],
  language: 'en',
});

const session = new VoiceSession({
  sessionId: 'session_1',
  userId: 'user_1',
  apiKey: process.env.GEMINI_API_KEY!,
  agents: [mainAgent],
  initialAgent: 'main',
  model: google('gemini-2.5-flash'),
  geminiModel: 'gemini-2.5-flash-native-audio-preview-12-2025',
  ttsProvider,
  sttProvider: new GeminiBatchSTTProvider({
    apiKey: process.env.GEMINI_API_KEY!,
    model: 'gemini-3-flash-preview',
  }),
  port: 9900,
});

await session.start();
```

Run the bundled demo:

```bash
export GEMINI_API_KEY="your-gemini-key"
export CARTESIA_API_KEY="your-cartesia-key"
export CARTESIA_VOICE_ID="your-cartesia-voice-id"
pnpm tsx examples/cartesia-tts-demo.ts
```

## ElevenLabs Example

```typescript
import { ElevenLabsTTSProvider } from 'bodhi-realtime-agent';

const ttsProvider = new ElevenLabsTTSProvider({
  apiKey: process.env.ELEVENLABS_API_KEY!,
  voiceId: process.env.ELEVENLABS_VOICE_ID!,
  modelId: 'eleven_flash_v2_5',
  stability: 0.5,
  similarityBoost: 0.75,
  languageCode: 'en',
});
```

Pass the provider as `VoiceSessionConfig.ttsProvider`.

## Audio Format Negotiation

The realtime transport advertises the output format preferred by the browser path. The TTS provider can accept it or return the closest supported PCM format:

```typescript
const actual = provider.configure({
  sampleRate: transport.audioFormat.outputSampleRate,
  bitDepth: 16,
  channels: 1,
  encoding: 'pcm',
});
```

If the provider's actual sample rate differs from the client format, `VoiceSession` resamples the PCM chunks before sending them to the client.

## Barge-In And Cancellation

When the user interrupts:

- `VoiceSession` calls `ttsProvider.cancel()`
- pending request IDs are invalidated
- late provider audio is ignored
- the client receives `turn.interrupted`

Providers should clear local sentence buffers and stop or reset their streaming WebSocket as quickly as possible.

## Observability

Attach `hooks.onTTSSynthesis` to measure synthesis latency:

```typescript
hooks: {
  onTTSSynthesis: (event) => {
    console.log(event.provider, event.textLength, event.ttfbMs, event.durationMs);
  },
}
```

Use `hooks.onError` for provider errors. Fatal TTS errors close the session; non-fatal errors are reported and the session continues where possible.
