# Fruskac Mobile App - Dev Setup (macOS)

This repository baseline is React Native `0.63.5`.
Use the exact toolchain below to keep iOS/Android builds stable on modern macOS.

## 1) Install nvm + Node

Install nvm:

```bash
brew install nvm
mkdir -p ~/.nvm
cat <<'EOF' >> ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && . "$(brew --prefix nvm)/etc/bash_completion.d/nvm"
EOF
source ~/.zshrc
```

Install/use Node:

```bash
nvm install -b 14.21.3
nvm use 14.21.3
node -v
```

Install Yarn Classic:

```bash
npm i -g yarn@1.22.19
yarn -v
```

## 2) Install JS dependencies

```bash
yarn install
```

`postinstall` automatically applies legacy compatibility patches (`jetify` + RN CLI patching).

## 3) iOS setup

Prereqs:
- Xcode 16+ (open once and accept license)
- CocoaPods

Install Pods:

```bash
brew install cocoapods
cd ios
pod install
cd ..
```

Run Metro:

```bash
yarn start:stable
```

Run iOS app:

```bash
yarn ios:stable "iPhone 16"
```

Use a different simulator:

```bash
yarn ios:stable "iPhone 16 Pro"
```

## 4) Android setup

Prereqs:
- Android Studio (SDK + platform-tools)
- JDK 8

Install JDK 8:

```bash
brew install --cask temurin8
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)
java -version
```

Set Android SDK env vars:

```bash
export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"
adb version
```

Install required Android SDK components:

```bash
sdkmanager --install "platform-tools" "platforms;android-28" "build-tools;28.0.3"
```

Run Android app:

```bash
yarn android:stable
```

If you need a clean local reset before re-running builds:

```bash
yarn clean:stable
yarn install
cd ios && pod install && cd ..
```

## 5) Toolchain reference (validated)

- Node: `14.21.3` (via `.nvmrc`)
- Yarn: `1.22.19`
- React Native: `0.63.5`
- React: `16.13.1`
- iOS deployment target: `12.0`
- Xcode: `16.x`
- CocoaPods: `1.12+`
- Java: `8`
- Android Gradle Plugin: `3.3.2`
- Gradle wrapper: `4.10.1`
- Android compile/target SDK: `28`

## 6) Known failure modes

- If Metro or run scripts behave oddly after dependency updates, run `yarn prepare:legacy`.
- If you get Metro `500`/`TransformError` or `Cannot find module ... metro/src/reactNativeTransformer.js`, you are almost certainly running the wrong Node version/process on port `8081`.
  Use:
```bash
nvm use 14.21.3
kill $(lsof -tiTCP:8081 -sTCP:LISTEN) 2>/dev/null || true
yarn start:stable
```
- If iOS fails with `libarclite` missing, run `yarn install && cd ios && pod install` to re-apply deployment-target patches.
- Mapbox native module is disabled in iOS Pods by default (for modern simulator stability). Current app behavior is safe fallback (`Map view unavailable on this build`) when Mapbox native view is unavailable.
- If you need to explicitly enable legacy iOS Mapbox pod for device testing:
```bash
cd ios
IOS_ENABLE_LEGACY_MAPBOX=1 pod install
cd ..
```
- If Watchman prints recrawl warnings:

```bash
watchman watch-del '/Users/nikolaarezina/Projects/mobile-app'
watchman watch-project '/Users/nikolaarezina/Projects/mobile-app'
```

## 7) Debug checklist

- Confirm Node is correct before every run: `node -v` must be `v14.21.3`.
- Keep one Metro process on `8081`; kill stale listeners before debugging runtime issues.
- Re-run `yarn install` and `cd ios && pod install` after dependency or podfile changes.
- For Android failures, check `android/gradle/wrapper/gradle-wrapper.properties` is `gradle-4.10.1-all.zip`.
- Use `yarn ios:stable "iPhone 16"` and `yarn android:stable` as first smoke tests after each change.
