# Telephony

Telephony support bridges the framework's realtime PCM audio with Twilio phone calls. It covers two flows:

- **Outbound human transfer:** a browser user starts with the AI agent, asks for a human, and the framework dials a phone number.
- **Inbound phone bridge:** a caller dials a Twilio number and is connected to an already running `VoiceSession`.

## Components

| Component | Purpose |
|-----------|---------|
| `TwilioBridge` | Owns outbound call lifecycle and bridges audio between the session and Twilio. |
| `TwilioWebhookServer` | Serves TwiML, Media Streams WebSocket upgrades, and status callbacks. |
| `frameworkToTwilio()` | Converts framework PCM L16 16 kHz audio to Twilio mulaw 8 kHz. |
| `twilioToFramework()` | Converts Twilio mulaw 8 kHz audio to framework PCM L16 16 kHz. |
| `MainAgent.audioMode: 'external'` | Lets an agent bypass the LLM transport and own the live audio path. |

## Outbound Human Transfer

The outbound flow is implemented by `examples/twilio-demo.ts` and `examples/lib/twilio-human-agent.ts`.

```
Browser user
  -> AI main agent
  -> transfer_to_agent("human_agent")
  -> TwilioBridge dials human
  -> browser audio <-> Twilio phone audio
  -> human hangs up
  -> main AI agent resumes
```

During the human segment, the active agent uses `audioMode: 'external'`. `VoiceSession` stops forwarding client audio to the LLM transport and sends mic frames to the external audio handler instead. The human agent can request a transfer back to the AI when Twilio reports a terminal status.

Run the demo:

```bash
export GEMINI_API_KEY="your-gemini-key"
export TWILIO_ACCOUNT_SID="ACxxxxxxxx"
export TWILIO_AUTH_TOKEN="xxxxxxxx"
export TWILIO_FROM_NUMBER="+1xxxxxxxxxx"
export HUMAN_AGENT_PHONE="+1xxxxxxxxxx"
export TWILIO_WEBHOOK_URL="https://xxxx.ngrok-free.app"
pnpm tsx examples/twilio-demo.ts
```

Start a public tunnel for local development:

```bash
ngrok http 8766
```

Use the HTTPS forwarding URL as `TWILIO_WEBHOOK_URL`.

## Outbound Bridge Code Shape

```typescript
import { TwilioBridge } from 'bodhi-realtime-agent';

const bridge = new TwilioBridge(
  {
    accountSid: process.env.TWILIO_ACCOUNT_SID!,
    authToken: process.env.TWILIO_AUTH_TOKEN!,
    fromNumber: process.env.TWILIO_FROM_NUMBER!,
    webhookBaseUrl: process.env.TWILIO_WEBHOOK_URL!,
    webhookPort: 8766,
  },
  {
    onCallConnected: (callSid) => console.log('connected', callSid),
    onCallEnded: (_callSid, reason) => requestTransferBack(reason),
    onAudioFromHuman: (pcm16k) => agentContext.sendAudioToClient(pcm16k),
    onError: (error) => console.error(error),
  },
);

await bridge.start();
await bridge.dial(process.env.HUMAN_AGENT_PHONE!);
```

`sendAudioToHuman()` accepts framework PCM audio and converts it to Twilio's mulaw stream format.

## Inbound Phone Bridge

The inbound bridge is a standalone protocol translator in `examples/twilio-inbound-bridge.ts`. It accepts Twilio webhooks, opens a WebSocket connection to an existing `VoiceSession`, and relays audio both directions.

```bash
# Terminal 1: run any agent server
pnpm tsx examples/gemini-realtime-tools.ts

# Terminal 2: run the bridge
export TWILIO_WEBHOOK_URL="https://xxxx.ngrok-free.app"
export AGENT_WS_URL="ws://localhost:9900"
pnpm tsx examples/twilio-inbound-bridge.ts

# Terminal 3: expose the bridge to Twilio
ngrok http 8766
```

Configure the Twilio phone number:

| Twilio setting | Value |
|----------------|-------|
| A call comes in | `https://xxxx.ngrok-free.app/voice` |
| Method | `POST` |
| Status callback URL | `https://xxxx.ngrok-free.app/status` |
| Status callback events | `initiated`, `ringing`, `answered`, `completed` |

## Audio Format

Twilio Media Streams use mulaw 8 kHz mono. The framework client and model path use PCM L16. The codec helpers handle both directions:

| Direction | Helper |
|-----------|--------|
| Framework/client PCM -> Twilio | `frameworkToTwilio()` |
| Twilio -> framework/client PCM | `twilioToFramework()` |

The outbound bridge converts internally. The inbound bridge uses the helpers directly while relaying frames between Twilio and the agent WebSocket.

## Operational Notes

- Twilio webhooks must be reachable over public HTTPS.
- Trial Twilio accounts can call only verified numbers.
- Status callbacks are required for reliable cleanup when a call ends before a media stream starts.
- The bundled inbound bridge gates to one active call at a time.
- Keep AI and human audio ownership explicit: use `audioMode: 'external'` only for agents that really own the media path.
