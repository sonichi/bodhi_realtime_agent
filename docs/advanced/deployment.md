# Deployment

This guide covers deploying the framework in production: configuration, multi-user session ownership, WebSocket routing, error handling, graceful shutdown, and optional telephony ingress.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | For Gemini | Google Gemini API key |
| `OPENAI_API_KEY` | For OpenAI | OpenAI API key |
| `LLM_PROVIDER` | No | `gemini` or `openai` for server-level defaults |
| `PORT` | No | WebSocket server port (default: 9900) |
| `HOST` | No | Bind host (default: `0.0.0.0`) |
| `MAX_SESSIONS_PER_USER` | No | Per-user session cap for `MultiUserSessionManager` |
| `MAX_TOTAL_SESSIONS` | No | Total active session cap |
| `SESSION_TIMEOUT_MS` | No | Idle timeout before cleanup |
| `TWILIO_INBOUND_ENABLED` | No | Enables Twilio inbound bridge config when `true` |
| `TWILIO_WEBHOOK_URL` | For Twilio | Public HTTPS URL used by Twilio webhooks |

```bash
# .env - set the key for your chosen provider
GOOGLE_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
LLM_PROVIDER=gemini
HOST=0.0.0.0
PORT=9900
```

::: warning
Never commit API keys to version control. Use environment variables or a secrets manager.
:::

## Graceful Shutdown

Always close sessions cleanly to release resources:

```typescript
const session = new VoiceSession({ /* config */ });
await session.start();

const shutdown = async (signal: string) => {
  console.log(`Received ${signal}, shutting down...`);
  await session.close('server_shutdown');
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
```

The `close()` method:
1. Notifies the active agent via `onExit`
2. Triggers memory extraction (if configured)
3. Saves session checkpoint (if configured)
4. Disconnects from the LLM provider
5. Closes the client WebSocket server

## Error Handling

Use the `onError` hook for centralized error handling:

```typescript
const session = new VoiceSession({
  hooks: {
    onError: (e) => {
      console.error(`[${e.severity}] [${e.component}] ${e.error.message}`);

      if (e.severity === 'fatal') {
        // Session is unrecoverable — close and restart
        session.close('fatal_error').then(() => process.exit(1));
      }
    },
  },
});
```

### Error Severities

| Severity | Action |
|----------|--------|
| `warn` | Log and continue |
| `error` | Log, alert, continue with degraded functionality |
| `fatal` | Log, alert, close session and restart |

## Configuration Loader

`loadConfig()` centralizes server configuration from environment variables and validates production controls:

```typescript
import { loadConfig, validateConfig } from 'bodhi-realtime-agent';

const config = loadConfig();
validateConfig(config);
```

It includes provider choice, API keys, auth placeholders, rate limits, session limits, logging, and optional Twilio inbound settings.

## Session Management

For production deployments handling multiple concurrent users, create one `VoiceSession` per user connection and track it through `MultiUserSessionManager`:

```typescript
import {
  MultiUserSessionManager,
  VoiceSession,
} from 'bodhi-realtime-agent';

const sessions = new MultiUserSessionManager({
  maxSessionsPerUser: 5,
  maxTotalSessions: 1000,
  sessionTimeoutMs: 30 * 60 * 1000,
});

async function createUserSession(userId: string) {
  const session = await sessions.createSession(userId, {
    apiKey: process.env.GEMINI_API_KEY!,
    agents: [mainAgent],
    initialAgent: 'main',
    model,
    clientSender,
  });

  await session.start();
  return session;
}
```

Call `updateActivity(sessionId)` when a client sends input. Call `closeSession(sessionId, reason)` when a client disconnects or auth expires. The manager also cleans idle sessions on an interval.

## Multi-Client WebSocket Routing

Use `MultiClientTransport` when a single server owns the WebSocket listener and routes messages to many sessions:

```typescript
import { MultiClientTransport } from 'bodhi-realtime-agent';

const clientTransport = new MultiClientTransport(config.port, {
  async onConnection(ws, context) {
    const userId = authenticate(ws, context.request);
    const session = await createUserSession(userId);
    clientTransport.bindConnection(ws, session.getSessionId(), userId);
    session.notifyClientConnected();
  },
  onAudioFromClient(_ws, data, context) {
    sessions.getSession(context.sessionId!)?.feedAudioFromClient(data);
    sessions.updateActivity(context.sessionId!);
  },
  onJsonFromClient(_ws, message, context) {
    sessions.getSession(context.sessionId!)?.feedJsonFromClient(message);
    sessions.updateActivity(context.sessionId!);
  },
  async onDisconnection(_ws, context) {
    if (context.sessionId) {
      await sessions.closeSession(context.sessionId, 'client_disconnect');
    }
  },
});

await clientTransport.start();
```

## Health Checks

Monitor session health using hooks and the session state:

```typescript
// Check session state
const state = session.sessionManager.state; // 'ACTIVE', 'RECONNECTING', etc.

// Track active sessions
hooks: {
  onSessionStart: () => metrics.gauge('active_sessions', sessions.size),
  onSessionEnd: () => metrics.gauge('active_sessions', sessions.size),
}
```

For `MultiUserSessionManager`, prefer `getStats()` for health endpoints:

```typescript
app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    sessions: sessions.getStats(),
  });
});
```

## Telephony Ingress

Twilio integrations need a public HTTPS webhook URL and a WebSocket path that Twilio can reach. The built-in examples use ngrok locally:

```bash
ngrok http 8766
TWILIO_WEBHOOK_URL=https://xxxx.ngrok-free.app
TWILIO_WEBHOOK_PORT=8766
```

Use [Telephony](/advanced/telephony) for outbound human transfer and inbound phone-call bridge setup.

## GitHub Pages Deployment

The documentation site can be deployed to GitHub Pages. See the GitHub Actions workflow in `.github/workflows/docs.yml` for automated deployment on push to `main`.

```yaml
# .github/workflows/docs.yml
name: Deploy docs
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install -g pnpm && pnpm install
      - run: pnpm docs:build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - uses: actions/deploy-pages@v4
```
