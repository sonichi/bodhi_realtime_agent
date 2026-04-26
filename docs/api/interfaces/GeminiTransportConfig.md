[bodhi-realtime-agent](../index.md) / GeminiTransportConfig

# Interface: GeminiTransportConfig

Defined in: [transport/gemini-live-transport.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L34)

Configuration for connecting to the Gemini Live API.

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [transport/gemini-live-transport.ts:36](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L36)

Google API key for authentication.

***

### compressionConfig?

> `optional` **compressionConfig**: `object`

Defined in: [transport/gemini-live-transport.ts:48](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L48)

Context window compression settings (trigger and target token counts).

#### targetTokens

> **targetTokens**: `number`

#### triggerTokens

> **triggerTokens**: `number`

***

### connectTimeoutMs?

> `optional` **connectTimeoutMs**: `number`

Defined in: [transport/gemini-live-transport.ts:54](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L54)

Timeout in ms for connect() to receive setupComplete (default: 30000).

***

### googleSearch?

> `optional` **googleSearch**: `boolean`

Defined in: [transport/gemini-live-transport.ts:50](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L50)

Enable Gemini's built-in Google Search grounding.

***

### inputAudioTranscription?

> `optional` **inputAudioTranscription**: `boolean`

Defined in: [transport/gemini-live-transport.ts:52](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L52)

Enable server-side transcription of user audio input (default: true).

***

### model?

> `optional` **model**: `string`

Defined in: [transport/gemini-live-transport.ts:38](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L38)

Gemini model name (default: "gemini-live-2.5-flash-preview").

***

### reconnectTimeoutMs?

> `optional` **reconnectTimeoutMs**: `number`

Defined in: [transport/gemini-live-transport.ts:56](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L56)

Timeout in ms for the overall reconnect operation (default: 45000).

***

### resumptionHandle?

> `optional` **resumptionHandle**: `string`

Defined in: [transport/gemini-live-transport.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L44)

Opaque handle from a previous session, used to resume an existing Gemini session.

***

### speechConfig?

> `optional` **speechConfig**: `object`

Defined in: [transport/gemini-live-transport.ts:46](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L46)

Voice configuration for Gemini's speech synthesis.

#### voiceName?

> `optional` **voiceName**: `string`

***

### systemInstruction?

> `optional` **systemInstruction**: `string`

Defined in: [transport/gemini-live-transport.ts:40](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L40)

System instruction sent to the model at connection time.

***

### tools?

> `optional` **tools**: [`ToolDefinition`](ToolDefinition.md)[]

Defined in: [transport/gemini-live-transport.ts:42](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/transport/gemini-live-transport.ts#L42)

Tool definitions to register with the model (converted to Gemini function declarations).
