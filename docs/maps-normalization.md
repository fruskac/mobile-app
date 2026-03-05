# Maps Normalization Plan (Draft)

## Goal
One maps data pipeline, two outputs:
- Web: PMTiles
- Mobile: MBTiles

Mobile and web should consume a shared domain model and a shared registry of map packages.

## Current State (mobile)
- Map SDK: `@mapbox/react-native-mapbox-gl`
- Offline: Mapbox offline packs in `src/sagas/cacheMapSaga.js`
- Map screen: `src/routes/Map/Map.js`

## Target Architecture
### 1) Data Pipeline
1. Source data + styling in `fruskac/map`.
2. Build produces:
   - `*.pmtiles` for web
   - `*.mbtiles` for mobile
3. Style JSON + sprites/fonts packaged alongside tiles.

### 2) Registry (Payload)
Collection: `map_packages`

Suggested fields:
- `id`
- `version` (semver or numeric)
- `platform` (`ios` | `android` | `web`)
- `locale` (`sr` | `en`)
- `format` (`mbtiles` | `pmtiles`)
- `remoteUrl`
- `sizeBytes`, `checksum`
- `bounds`, `minZoom`, `maxZoom`
- `styleUrl` (optional)

Mobile flow:
1. App calls `getLatestMapPackage(platform, locale)`.
2. If version differs from local, download.
3. Swap package via `MapProvider.setOfflinePackage`.

### 3) Shared Domain Types
Added in `src/maps/types.ts`:
- `POI`, `Track`, `LayerConfig`, `OfflinePackage`, `ViewState`

### 4) Map Provider Interface
Added in `src/maps/provider.ts`:
- `init()`
- `setStyle(styleUrl | styleJson)`
- `setOfflinePackage(localPath | remoteUrl)`
- `setCamera(viewState)`
- `onPressFeature(handler)`

### 5) Map SDK Adapter
Added stub adapter in `src/maps/mapbox/`.
This will bridge current Mapbox usage to the shared `MapProvider` interface.

## Port Plan for fruskac/map + fruskac/map-controller
### fruskac/map
- Becomes the canonical build pipeline for tiles + style JSON.
- Outputs:
  - `PMTiles` for web
  - `MBTiles` for mobile
- Publishes metadata into `map_packages` registry.

### fruskac/map-controller
- Becomes the shared runtime layer for:
  - view state management
  - feature/POI interactions
  - package version checks
- Implemented against `MapProvider` so it works on mobile and web.

## Extraction Plan
1. Stabilize `src/maps` types + provider interface in this repo.
2. Move `src/maps` into a shared workspace package later.
3. Replace direct Mapbox usage with the provider adapter.

## Milestones
1. Scaffolding in this repo (done).
2. Implement Payload client when schema is confirmed.
3. Implement adapter against Mapbox GL (mobile).
4. Extract to shared package and adopt in web.
