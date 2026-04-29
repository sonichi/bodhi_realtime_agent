[bodhi-realtime-agent](../index.md) / SaveArtifactParams

# Interface: SaveArtifactParams

Defined in: [types/workspace.ts:4](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L4)

Parameters for saving an artifact produced by an agent or tool.

## Properties

### agentName?

> `optional` **agentName**: `string`

Defined in: [types/workspace.ts:10](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L10)

Name of the agent that produced the artifact.

***

### content

> **content**: `Buffer`\<`ArrayBufferLike`\> \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [types/workspace.ts:16](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L16)

Raw bytes.

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [types/workspace.ts:18](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L18)

Optional metadata (filename, dimensions, etc.).

***

### mimeType

> **mimeType**: `string`

Defined in: [types/workspace.ts:14](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L14)

MIME type (e.g. image/png, application/pdf).

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [types/workspace.ts:6](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L6)

Session that produced the artifact (injected by session.workspace when omitted).

***

### toolCallId?

> `optional` **toolCallId**: `string`

Defined in: [types/workspace.ts:12](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L12)

Tool call that produced the artifact (for correlation).

***

### userId?

> `optional` **userId**: `string`

Defined in: [types/workspace.ts:8](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L8)

User context (injected by session.workspace when omitted).
