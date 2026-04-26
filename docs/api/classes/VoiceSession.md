[bodhi-realtime-agent](../index.md) / VoiceSession

# Class: VoiceSession

Defined in: [core/voice-session.ts:137](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L137)

Top-level integration hub that wires all framework components together.

Manages the full lifecycle of a real-time voice session:
- **Audio fast-path**: Client audio → LLM (and back) without touching the EventBus.
- **Tool routing**: Inline tools execute synchronously; background tools hand off to subagents.
- **Agent transfers**: Intercepts `transfer_to_agent` tool calls and delegates to AgentRouter.
- **Reconnection**: Handles GoAway signals and unexpected disconnects via session resumption.
- **Conversation tracking**: Transcriptions populate ConversationContext automatically.

## Example

```ts
const session = new VoiceSession({
  sessionId: 'session_1',
  userId: 'user_1',
  apiKey: process.env.GOOGLE_API_KEY,
  agents: [mainAgent, expertAgent],
  initialAgent: 'main',
  port: 9900,
  model: google('gemini-2.5-flash'),
});
await session.start();
```

## Constructors

### Constructor

> **new VoiceSession**(`config`): `VoiceSession`

Defined in: [core/voice-session.ts:184](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L184)

#### Parameters

##### config

[`VoiceSessionConfig`](../interfaces/VoiceSessionConfig.md)

#### Returns

`VoiceSession`

## Properties

### conversationContext

> `readonly` **conversationContext**: [`ConversationContext`](ConversationContext.md)

Defined in: [core/voice-session.ts:140](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L140)

***

### eventBus

> `readonly` **eventBus**: [`EventBus`](EventBus.md)

Defined in: [core/voice-session.ts:138](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L138)

***

### hooks

> `readonly` **hooks**: [`HooksManager`](HooksManager.md)

Defined in: [core/voice-session.ts:141](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L141)

***

### sessionManager

> `readonly` **sessionManager**: [`SessionManager`](SessionManager.md)

Defined in: [core/voice-session.ts:139](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L139)

## Accessors

### workspace

#### Get Signature

> **get** **workspace**(): `object`

Defined in: [core/voice-session.ts:605](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L605)

Workspace API for persisting artifacts (images, videos, docs, etc.) produced by agents/tools.
When no artifactStore is configured, saveArtifact returns null without persisting.

##### Returns

`object`

###### saveArtifact()

> **saveArtifact**(`params`): `Promise`\<[`ArtifactRef`](../interfaces/ArtifactRef.md) \| `null`\>

###### Parameters

###### params

[`SaveArtifactParams`](../interfaces/SaveArtifactParams.md)

###### Returns

`Promise`\<[`ArtifactRef`](../interfaces/ArtifactRef.md) \| `null`\>

## Methods

### close()

> **close**(`_reason?`): `Promise`\<`void`\>

Defined in: [core/voice-session.ts:625](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L625)

Gracefully shut down: disconnect Gemini, stop the WebSocket server, transition to CLOSED.

#### Parameters

##### \_reason?

`string` = `'normal'`

#### Returns

`Promise`\<`void`\>

***

### feedAudioFromClient()

> **feedAudioFromClient**(`data`): `void`

Defined in: [core/voice-session.ts:1236](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L1236)

Feed client audio into the session (LLM + STT). Used when the server owns the socket (multi-user).

#### Parameters

##### data

`Buffer`

#### Returns

`void`

***

### feedJsonFromClient()

> **feedJsonFromClient**(`message`): `void`

Defined in: [core/voice-session.ts:1241](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L1241)

Feed client JSON (text_input, file_upload, etc.) into the session. Used when the server owns the socket.

#### Parameters

##### message

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### getSessionId()

> **getSessionId**(): `string`

Defined in: [core/voice-session.ts:1256](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L1256)

Session ID for logging and multi-user association.

#### Returns

`string`

***

### notifyBackground()

> **notifyBackground**(`text`, `options?`): `void`

Defined in: [core/voice-session.ts:534](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L534)

Queue a short spoken update for the user.
Delivered immediately when possible, otherwise after the current turn.

#### Parameters

##### text

`string`

##### options?

###### label?

`"SUBAGENT UPDATE"` \| `"SUBAGENT QUESTION"`

###### priority?

`"normal"` \| `"high"`

#### Returns

`void`

***

### notifyClientConnected()

> **notifyClientConnected**(): `void`

Defined in: [core/voice-session.ts:1246](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L1246)

Notify the session that the client connected. Used when the server owns the socket (multi-user).

#### Returns

`void`

***

### notifyClientDisconnected()

> **notifyClientDisconnected**(): `void`

Defined in: [core/voice-session.ts:1251](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L1251)

Notify the session that the client disconnected. Used when the server owns the socket (multi-user).

#### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [core/voice-session.ts:547](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L547)

Start the client WebSocket server and connect to the LLM transport.

#### Returns

`Promise`\<`void`\>

***

### transfer()

> **transfer**(`toAgent`): `Promise`\<`void`\>

Defined in: [core/voice-session.ts:666](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/voice-session.ts#L666)

Transfer the active session to a different agent (reconnects with new config).

#### Parameters

##### toAgent

`string`

#### Returns

`Promise`\<`void`\>
