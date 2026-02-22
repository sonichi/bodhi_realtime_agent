# Hello World — Multi-Agent Voice Assistant

A minimal example showing four key features of the Bodhi Realtime Agent Framework.

## Features

| Feature | How It Works |
|---------|-------------|
| **Voice pacing** | `speechSpeed()` behavior preset auto-generates the `set_speech_speed` tool; directives are reinforced every turn |
| **Agent transfer** | `transfer_to_agent` disconnects from Gemini and reconnects with the math expert's config |
| **Google Search** | `googleSearch: true` enables grounded web search via Gemini |
| **Image generation** | `generate_image` calls Gemini's image model and pushes base64 to the client |

## Running

```bash
# From the repository root:
pnpm install
GEMINI_API_KEY=your_key pnpm tsx examples/hello_world/agent.ts
```

Connect a WebSocket audio client to `ws://localhost:9900` sending PCM 16-bit 16kHz mono audio.

## Things to Try

| Say this | What happens |
|----------|-------------|
| "Speak slower please" | Calls `set_speech_speed` → pacing directive injected |
| "I need help with math" | Transfers to math expert agent |
| "Take me back" | Math expert transfers back to main |
| "What is the weather today?" | Google Search grounding |
| "Draw me a cat in a spacesuit" | Image generated and sent to client |
