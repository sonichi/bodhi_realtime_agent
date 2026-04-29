[bodhi-realtime-agent](../index.md) / RealtimeLLMUsageEvent

# Interface: RealtimeLLMUsageEvent

Defined in: [types/transport.ts:232](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L232)

Normalized usage from Gemini Live or OpenAI Realtime transports.
Carries provider-reported billable units only (no USD estimation).

## Properties

### durationSeconds?

> `optional` **durationSeconds**: `number`

Defined in: [types/transport.ts:241](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L241)

Present when `unit === 'duration_seconds'` (e.g. some transcription billing).

***

### inputTokens?

> `optional` **inputTokens**: `number`

Defined in: [types/transport.ts:237](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L237)

***

### kind

> **kind**: [`RealtimeUsageKind`](../type-aliases/RealtimeUsageKind.md)

Defined in: [types/transport.ts:234](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L234)

***

### modalityBreakdown?

> `optional` **modalityBreakdown**: [`RealtimeUsageModalityBreakdown`](RealtimeUsageModalityBreakdown.md)

Defined in: [types/transport.ts:242](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L242)

***

### outputTokens?

> `optional` **outputTokens**: `number`

Defined in: [types/transport.ts:238](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L238)

***

### phase

> **phase**: [`RealtimeUsagePhase`](../type-aliases/RealtimeUsagePhase.md)

Defined in: [types/transport.ts:235](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L235)

***

### provider

> **provider**: [`RealtimeUsageProvider`](../type-aliases/RealtimeUsageProvider.md)

Defined in: [types/transport.ts:233](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L233)

***

### providerRaw?

> `optional` **providerRaw**: `unknown`

Defined in: [types/transport.ts:246](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L246)

Opaque provider payload for exact downstream reconciliation.

***

### providerResponseId?

> `optional` **providerResponseId**: `string`

Defined in: [types/transport.ts:244](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L244)

OpenAI response id when `kind === 'response'`.

***

### totalTokens?

> `optional` **totalTokens**: `number`

Defined in: [types/transport.ts:239](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L239)

***

### unit

> **unit**: [`RealtimeUsageUnit`](../type-aliases/RealtimeUsageUnit.md)

Defined in: [types/transport.ts:236](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L236)
