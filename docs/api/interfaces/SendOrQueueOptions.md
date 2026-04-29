[bodhi-realtime-agent](../index.md) / SendOrQueueOptions

# Interface: SendOrQueueOptions

Defined in: [core/background-notification-queue.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L9)

Options for sendOrQueue.

## Properties

### priority?

> `optional` **priority**: `QueuePriority`

Defined in: [core/background-notification-queue.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L11)

Delivery priority. 'high' attempts immediate delivery or front-of-queue. Default: 'normal'.
