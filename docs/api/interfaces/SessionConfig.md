[bodhi-realtime-agent](../index.md) / SessionConfig

# Interface: SessionConfig

Defined in: [types/session.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L26)

Initial configuration for creating a session manager.

## Properties

### geminiModel?

> `optional` **geminiModel**: `string`

Defined in: [types/session.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L32)

Gemini model to use (e.g. "gemini-2.5-flash-live-001").

***

### initialAgent

> **initialAgent**: `string`

Defined in: [types/session.ts:34](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L34)

Name of the agent to activate when the session starts.

***

### sessionId

> **sessionId**: `string`

Defined in: [types/session.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L28)

Unique session identifier.

***

### userId

> **userId**: `string`

Defined in: [types/session.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/session.ts#L30)

User identifier for this session.
