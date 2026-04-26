[bodhi-realtime-agent](../index.md) / ServerConfig

# Interface: ServerConfig

Defined in: [config/server-config.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L11)

## Properties

### apiKey

> **apiKey**: `string`

Defined in: [config/server-config.ts:19](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L19)

Gemini API key (required for gemini; also used for image/video subagents when provider is openai).

***

### auth

> **auth**: `object`

Defined in: [config/server-config.ts:31](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L31)

Authentication configuration

#### apiKey?

> `optional` **apiKey**: `string`

#### enabled

> **enabled**: `boolean`

#### jwtSecret?

> `optional` **jwtSecret**: `string`

#### method

> **method**: `"api_key"` \| `"jwt"` \| `"oauth"` \| `"supabase"` \| `"anonymous"`

#### oauth?

> `optional` **oauth**: `object`

##### oauth.clientId

> **clientId**: `string`

##### oauth.clientSecret

> **clientSecret**: `string`

##### oauth.tokenEndpoint

> **tokenEndpoint**: `string`

#### supabase?

> `optional` **supabase**: `object`

##### supabase.anonKey

> **anonKey**: `string`

##### supabase.serviceRoleKey?

> `optional` **serviceRoleKey**: `string`

Service role key for server-side Supabase client (history store, bypass RLS).

##### supabase.url

> **url**: `string`

***

### cleanupIntervalMs

> **cleanupIntervalMs**: `number`

Defined in: [config/server-config.ts:29](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L29)

Cleanup interval in milliseconds

***

### host

> **host**: `string`

Defined in: [config/server-config.ts:15](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L15)

WebSocket server host

***

### llmProvider

> **llmProvider**: [`LLMProvider`](../type-aliases/LLMProvider.md)

Defined in: [config/server-config.ts:17](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L17)

Which live voice transport to use (default: gemini).

***

### logging

> **logging**: `object`

Defined in: [config/server-config.ts:55](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L55)

Logging configuration

#### format

> **format**: `"text"` \| `"json"`

#### level

> **level**: `"error"` \| `"warn"` \| `"debug"` \| `"info"`

***

### maxSessionsPerUser

> **maxSessionsPerUser**: `number`

Defined in: [config/server-config.ts:23](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L23)

Maximum concurrent sessions per user

***

### maxTotalSessions

> **maxTotalSessions**: `number`

Defined in: [config/server-config.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L25)

Maximum total concurrent sessions

***

### openaiApiKey?

> `optional` **openaiApiKey**: `string`

Defined in: [config/server-config.ts:21](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L21)

OpenAI API key (required when llmProvider is openai).

***

### port

> **port**: `number`

Defined in: [config/server-config.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L13)

WebSocket server port

***

### rateLimiting

> **rateLimiting**: `object`

Defined in: [config/server-config.ts:49](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L49)

Rate limiting configuration

#### connectionsPerMinute

> **connectionsPerMinute**: `number`

#### enabled

> **enabled**: `boolean`

#### requestsPerMinute

> **requestsPerMinute**: `number`

***

### sessionTimeoutMs

> **sessionTimeoutMs**: `number`

Defined in: [config/server-config.ts:27](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L27)

Session idle timeout in milliseconds

***

### twilio?

> `optional` **twilio**: `object`

Defined in: [config/server-config.ts:60](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/config/server-config.ts#L60)

Twilio inbound phone call bridge (optional — disabled when absent).

#### defaultAgentProfile

> **defaultAgentProfile**: `string`

Fallback agent profile for inbound calls (default: standard).

#### inboundEnabled

> **inboundEnabled**: `boolean`

#### numberAgentProfiles

> **numberAgentProfiles**: `Record`\<`string`, `string`\>

Optional E.164 number -> agent profile map (digits only key).

#### webhookUrl

> **webhookUrl**: `string`

Public HTTPS URL (nginx/ngrok) used in TwiML so Twilio connects back to us.
