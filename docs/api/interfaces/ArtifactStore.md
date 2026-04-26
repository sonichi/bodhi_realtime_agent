[bodhi-realtime-agent](../index.md) / ArtifactStore

# Interface: ArtifactStore

Defined in: [types/workspace.ts:39](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L39)

Persistence interface for artifacts produced by agents/subagents (images, videos, docs, etc.).
Implementations are provided by the app (e.g. S3, GCS, local FS); framework only calls this interface.

## Methods

### saveArtifact()

> **saveArtifact**(`params`): `Promise`\<[`ArtifactRef`](ArtifactRef.md)\>

Defined in: [types/workspace.ts:41](https://github.com/randombet/bodhi_realtime_agent/blob/acfe82f88256070c04c99813c9d4cd45d05fb859/src/types/workspace.ts#L41)

Persist an artifact; returns a reference (id, optional url).

#### Parameters

##### params

[`SaveArtifactParams`](SaveArtifactParams.md)

#### Returns

`Promise`\<[`ArtifactRef`](ArtifactRef.md)\>
