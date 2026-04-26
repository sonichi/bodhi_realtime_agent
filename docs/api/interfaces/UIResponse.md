[bodhi-realtime-agent](../index.md) / UIResponse

# Interface: UIResponse

Defined in: [types/ui.ts:7](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/ui.ts#L7)

A UI response sent by the client in reply to a UIPayload request.
Correlates back to the original request via requestId.

## Properties

### formData?

> `optional` **formData**: `Record`\<`string`, `unknown`\>

Defined in: [types/ui.ts:13](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/ui.ts#L13)

Form field values (for 'form' payloads).

***

### requestId

> **requestId**: `string`

Defined in: [types/ui.ts:9](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/ui.ts#L9)

Matches the requestId from the originating UIPayload.

***

### selectedOptionId?

> `optional` **selectedOptionId**: `string`

Defined in: [types/ui.ts:11](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/ui.ts#L11)

The option the user selected (for 'choice' / 'confirmation' payloads).
