# Quick Start

## Prerequisites

- Node.js 22+
- `pnpm` (recommended; repo uses pnpm lockfile)
- API key for your provider:
  - Gemini: `GEMINI_API_KEY`
  - OpenAI Realtime: `OPENAI_API_KEY`

## Install

```bash
pnpm install
```

## Start A Gemini Voice Agent

```bash
export GEMINI_API_KEY="your-gemini-key"
pnpm tsx examples/gemini-realtime-tools.ts
```

Server default: `ws://localhost:9900`.

## Start The Web Client

```bash
pnpm tsx examples/web-client.ts
```

Then open `http://localhost:8080`.

## OpenAI Realtime

Use the OpenAI example when you want native OpenAI Realtime audio:

```bash
export OPENAI_API_KEY="your-openai-key"
export GEMINI_API_KEY="your-gemini-key" # used by background subagents/image tools
pnpm tsx examples/openai-realtime-tools.ts
```

The same browser client works with both examples because the server sends a `session.config` message with the negotiated audio format.

## External TTS

To use a custom voice instead of native model audio:

```bash
export GEMINI_API_KEY="your-gemini-key"
export CARTESIA_API_KEY="your-cartesia-key"
pnpm tsx examples/cartesia-tts-demo.ts
```

See [External TTS](/advanced/tts) for provider wiring and lifecycle details.

## Docs site

```bash
pnpm docs:dev
```

Then open `http://localhost:5173/bodhi_realtime_agent/`.
