[bodhi-realtime-agent](../index.md) / BackgroundNotificationQueue

# Class: BackgroundNotificationQueue

Defined in: [core/background-notification-queue.ts:25](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L25)

Queues background tool completion notifications when the LLM is actively
generating audio, and flushes them one-at-a-time at turn boundaries.

Extracted from VoiceSession to isolate the queuing/delivery concern.
On transports without messageTruncation (Gemini), the model silently absorbs
client content while generating — notifications must be held until the model
finishes its current turn. On transports with messageTruncation (OpenAI),
high-priority messages can be delivered immediately (the transport handles
response cancellation internally).

## Constructors

### Constructor

> **new BackgroundNotificationQueue**(`sendContent`, `log`, `messageTruncation?`): `BackgroundNotificationQueue`

Defined in: [core/background-notification-queue.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L30)

#### Parameters

##### sendContent

(`turns`, `turnComplete`) => `void`

##### log

(`msg`) => `void`

##### messageTruncation?

`boolean` = `false`

#### Returns

`BackgroundNotificationQueue`

## Methods

### clear()

> **clear**(): `void`

Defined in: [core/background-notification-queue.ts:98](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L98)

Drop all queued notifications (used on session close).

#### Returns

`void`

***

### markAudioReceived()

> **markAudioReceived**(): `void`

Defined in: [core/background-notification-queue.ts:69](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L69)

Mark that the first audio chunk has been received this turn.

#### Returns

`void`

***

### markInterrupted()

> **markInterrupted**(): `void`

Defined in: [core/background-notification-queue.ts:74](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L74)

Mark that the current turn was interrupted by the user.

#### Returns

`void`

***

### onTurnComplete()

> **onTurnComplete**(): `void`

Defined in: [core/background-notification-queue.ts:82](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L82)

Handle turn completion: reset audio/interruption flags and flush one
queued notification (unless the turn was interrupted).

#### Returns

`void`

***

### resetAudio()

> **resetAudio**(): `void`

Defined in: [core/background-notification-queue.ts:93](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L93)

Reset audio flag without flushing (used when starting a new greeting).

#### Returns

`void`

***

### sendOrQueue()

> **sendOrQueue**(`turns`, `turnComplete`, `options?`): `void`

Defined in: [core/background-notification-queue.ts:44](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/core/background-notification-queue.ts#L44)

Send a notification immediately if the model is idle, or queue it if
the model is currently generating audio.

High-priority messages attempt immediate delivery when the transport
supports message truncation (OpenAI). On non-truncation transports (Gemini),
high-priority messages are queued at the front of the queue.

#### Parameters

##### turns

`Turn`[]

##### turnComplete

`boolean`

##### options?

[`SendOrQueueOptions`](../interfaces/SendOrQueueOptions.md)

#### Returns

`void`
