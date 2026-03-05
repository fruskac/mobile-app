# Fruskac Mobile: Agent Guide

## Project Purpose
Fruskac is a React Native mobile app (Android + iOS) for map-centric content (locations, markers, navigation, offline-friendly behavior). The current production-oriented baseline is focused on stability over feature churn.

## Current Baseline
- React Native: `0.84.1`
- React: `19.2.3`
- Node engine target: `>=22.11.0`
- App version: `2.0.0`
- iOS/Android stable scripts:
  - `yarn start:stable`
  - `yarn ios:stable`
  - `yarn android:stable`

## What Was Stabilized Recently
- Offline/airplane map fallback behavior (WebView/HTML fallback path).
- Marker rendering fallback so markers show as icons when available, with safe fallback when not.
- iOS location permission flow fixed using `@react-native-community/geolocation`.
- Location recenter button (`◎`) integrated with fallback map and native location updates.
- iOS release install flow validated on physical iPhone.
- `NSLocationWhenInUseUsageDescription` set in Info.plist.

## Map and Location Implementation Notes
Primary files:
- `src/routes/Map/Map.js`
- `src/maps/offlineConfig.js`
- `src/maps/mapboxSafe.js`
- `src/App.js`
- `src/config/env.ts`

Important behavior:
- Map can run in fallback mode when native map path is unavailable.
- Location is requested through `@react-native-community/geolocation`.
- Fallback WebView communicates with RN via `postMessage` for location requests/recenter.

## Secrets and Tokens Policy
- Never hardcode provider tokens (Mapbox, API keys) in source.
- Use environment-driven configuration.
- `src/App.js` reads Mapbox token from `ENV.MAPBOX_ACCESS_TOKEN`.
- If token is missing, app should fail gracefully (fallback map still usable).

## Build and Release Workflow
Preferred release flow:
1. Ensure clean diff for intended files only.
2. Validate smoke tests:
   - iOS device/simulator (Release where relevant)
   - Android stable run
3. Commit with clear release/fix scope.
4. Tag semver release.
5. Push branch + tag.

For physical iPhone release deploy (no Metro dependency):
- `FORCE_BUNDLING=1 npx react-native run-ios --device "<Device Name>" --mode Release --no-packager --extra-params "-allowProvisioningUpdates -allowProvisioningDeviceRegistration"`

## Repo Hygiene Rules
- Do not commit generated native artifacts:
  - `ios/Pods/`
  - `ios/main.jsbundle`
  - `android/app/src/main/assets/index.android.bundle`
- Keep `ios/Podfile.lock` committed.
- Avoid committing local signing noise from Xcode unless intentionally changing project signing.

## High-Risk Areas
- Legacy map stack (`@mapbox/react-native-mapbox-gl`) and old navigation stack can regress easily.
- iOS provisioning/signing changes can break physical-device deploys.
- WebView fallback HTML logic in `Map.js` is large and sensitive to small JS changes.

## Change Strategy for Future Agents
- Prefer incremental, reversible edits.
- Keep feature behavior unchanged unless explicitly requested.
- Prioritize runtime stability and releaseability over refactor breadth.
- If touching map/location code, always verify:
  - user location prompt appears on iOS
  - recenter action works
  - markers are visible in fallback mode
  - app launches without Metro in Release mode
