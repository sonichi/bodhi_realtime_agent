[bodhi-realtime-agent](../index.md) / QueuedNotification

# Interface: QueuedNotification

Defined in: [types/notification.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L10)

A notification produced by a service subagent, queued for delivery to the user.
Urgent notifications may interrupt the current turn; normal ones wait for a natural pause.

## Properties

### event

> **event**: [`ExternalEvent`](ExternalEvent.md)

Defined in: [types/notification.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L18)

The external event that triggered the notification.

***

### priority

> **priority**: [`NotificationPriority`](../type-aliases/NotificationPriority.md)

Defined in: [types/notification.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L14)

Delivery urgency.

***

### queuedAt

> **queuedAt**: `number`

Defined in: [types/notification.ts:20](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L20)

Unix timestamp (ms) when this notification was queued.

***

### result

> **result**: [`SubagentResult`](SubagentResult.md)

Defined in: [types/notification.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L16)

Full subagent output that produced this notification.

***

### text

> **text**: `string`

Defined in: [types/notification.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/notification.ts#L12)

Human-readable notification text to speak/display.
