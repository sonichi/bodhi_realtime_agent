[bodhi-realtime-agent](../index.md) / ArtifactRef

# Interface: ArtifactRef

Defined in: [types/workspace.ts:22](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L22)

Reference returned after saving an artifact; may include a URL for serving.

## Properties

### id

> **id**: `string`

Defined in: [types/workspace.ts:24](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L24)

Opaque identifier (store- or app-generated).

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: [types/workspace.ts:32](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L32)

Optional metadata.

***

### mimeType

> **mimeType**: `string`

Defined in: [types/workspace.ts:30](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L30)

MIME type.

***

### sessionId

> **sessionId**: `string`

Defined in: [types/workspace.ts:26](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L26)

Session that owns the artifact.

***

### url?

> `optional` **url**: `string`

Defined in: [types/workspace.ts:28](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L28)

Optional URL for direct access (if the store provides one).
