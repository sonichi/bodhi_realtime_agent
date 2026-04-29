# Introduction

Bodhi Realtime Agent Framework is a TypeScript framework for real-time voice agents with:

- Gemini Live and OpenAI Realtime transports
- multi-agent routing and transfers
- inline/background tools
- background and interactive subagents
- pluggable STT and TTS providers
- multimodal JSON, file, image, and artifact flows
- Twilio telephony bridges for outbound human transfer and inbound calls
- multi-user session management, memory, hooks, and observability

## What Changed In This Branch

The current branch expands the framework from a local single-session voice demo into a broader realtime runtime:

- **Provider coverage:** `GeminiLiveTransport` and `OpenAIRealtimeTransport` share the same `LLMTransport` contract, including text-mode response support for external TTS.
- **Speech providers:** `CartesiaTTSProvider`, `ElevenLabsTTSProvider`, `GeminiBatchSTTProvider`, and `ElevenLabsSTTProvider` can be attached at the `VoiceSession` level.
- **Telephony:** `TwilioBridge`, `TwilioWebhookServer`, and audio-codec helpers bridge framework PCM audio with Twilio Media Streams.
- **Production server primitives:** `MultiClientTransport`, `MultiUserSessionManager`, and `loadConfig()` support multi-user deployments.
- **Examples:** the `examples/` directory now includes Gemini, OpenAI, Cartesia TTS, Twilio, OpenClaw, and browser clients.

## Read Next

- [Quick Start](/guide/quickstart)
- [Running Examples](/guide/running-examples)
- [Transport](/guide/transport)
- [External TTS](/advanced/tts)
- [Telephony](/advanced/telephony)
