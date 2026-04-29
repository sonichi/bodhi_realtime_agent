[bodhi-realtime-agent](../index.md) / ReconnectState

# Interface: ReconnectState

Defined in: [types/transport.ts:166](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L166)

State provided to the transport for reconnection/recovery.

## Properties

### conversationHistory?

> `optional` **conversationHistory**: [`ReplayItem`](../type-aliases/ReplayItem.md)[]

Defined in: [types/transport.ts:168](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L168)

Full conversation replay for recovery — rich typed items, not text-only.

***

### pendingToolCalls?

> `optional` **pendingToolCalls**: [`TransportPendingToolCall`](TransportPendingToolCall.md)[]

Defined in: [types/transport.ts:170](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/transport.ts#L170)

In-flight tool calls to recover after reconnect.
