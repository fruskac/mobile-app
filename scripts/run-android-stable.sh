#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

EXPECTED_NODE_VERSION="$(tr -d '[:space:]' < "$ROOT_DIR/.nvmrc")"
EXPECTED_NODE_VERSION="${EXPECTED_NODE_VERSION#v}"
DEFAULT_NVM_BIN="${HOME:-$ROOT_DIR}/.nvm/versions/node/v${EXPECTED_NODE_VERSION}/bin"
RESOLVED_NVM_BIN="${NVM_BIN:-}"
if [ -z "$RESOLVED_NVM_BIN" ] && [ -x "$DEFAULT_NVM_BIN/node" ]; then
  RESOLVED_NVM_BIN="$DEFAULT_NVM_BIN"
fi

if [ "${FRUSKAC_ANDROID_ENV_SANITIZED:-0}" != "1" ]; then
  CLEAN_PATH="$RESOLVED_NVM_BIN"
  if [ -n "$CLEAN_PATH" ]; then
    CLEAN_PATH="$CLEAN_PATH:"
  fi
  CLEAN_PATH="${CLEAN_PATH}/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

  exec env -i \
    HOME="${HOME:-$ROOT_DIR}" \
    USER="${USER:-}" \
    LOGNAME="${LOGNAME:-}" \
    SHELL="${SHELL:-/bin/bash}" \
    PATH="$CLEAN_PATH" \
    LANG="${LANG:-C.UTF-8}" \
    LC_ALL="${LC_ALL:-}" \
    TMPDIR="${TMPDIR:-/tmp}" \
    NVM_DIR="${NVM_DIR:-$HOME/.nvm}" \
    NVM_BIN="$RESOLVED_NVM_BIN" \
    JAVA_HOME="${JAVA_HOME:-}" \
    ANDROID_HOME="${ANDROID_HOME:-}" \
    ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-}" \
    ANDROID_AVD="${ANDROID_AVD:-}" \
    RCT_METRO_PORT="${RCT_METRO_PORT:-}" \
    FORCE_RESTART_METRO="${FORCE_RESTART_METRO:-}" \
    SKIP_ANDROID_METRO="${SKIP_ANDROID_METRO:-}" \
    FRUSKAC_ANDROID_ENV_SANITIZED=1 \
    bash "$0" "$@"
fi

. scripts/ensure-node-version.sh
node scripts/patch-react-redux-lifecycles.js >/dev/null
bash scripts/ensure-runtime-deps.sh

resolve_rn_cli() {
  if [ -f "node_modules/react-native/cli.js" ]; then
    printf "%s" "node_modules/react-native/cli.js"
    return 0
  fi
  if [ -f "node_modules/@react-native-community/cli/build/bin.js" ]; then
    printf "%s" "node_modules/@react-native-community/cli/build/bin.js"
    return 0
  fi
  return 1
}

export RCT_METRO_PORT="${RCT_METRO_PORT:-8081}"
export FORCE_RESTART_METRO="${FORCE_RESTART_METRO:-1}"
SKIP_ANDROID_METRO="${SKIP_ANDROID_METRO:-1}"
RESET_ANDROID_APP_STATE="${RESET_ANDROID_APP_STATE:-1}"

if [ "$SKIP_ANDROID_METRO" = "1" ]; then
  echo "Skipping Metro startup (Android debug bundle is embedded for stable run)."
else
  bash scripts/ensure-metro-running.sh
fi

if [ -f "android/app/src/main/assets/index.android.bundle" ] && rg -q "major:0,minor:52" android/app/src/main/assets/index.android.bundle; then
  echo "Removing stale android/app/src/main/assets/index.android.bundle (RN 0.52.x)."
  rm -f android/app/src/main/assets/index.android.bundle
fi

detect_android_sdk_root() {
  if [ -n "${ANDROID_SDK_ROOT:-}" ] && [ -d "${ANDROID_SDK_ROOT:-}" ]; then
    printf "%s" "$ANDROID_SDK_ROOT"
    return 0
  fi

  if [ -n "${ANDROID_HOME:-}" ] && [ -d "${ANDROID_HOME:-}" ]; then
    printf "%s" "$ANDROID_HOME"
    return 0
  fi

  local candidates=(
    "$HOME/Library/Android/sdk"
    "$HOME/Android/Sdk"
    "/Users/Shared/Library/Android/sdk"
  )

  local candidate
  for candidate in "${candidates[@]}"; do
    if [ -d "$candidate" ]; then
      printf "%s" "$candidate"
      return 0
    fi
  done

  return 1
}

if ! ANDROID_SDK_ROOT="$(detect_android_sdk_root)"; then
  echo "Android SDK not found."
  echo "Set ANDROID_SDK_ROOT (or ANDROID_HOME) to your SDK path."
  exit 1
fi

export ANDROID_SDK_ROOT
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/tools/bin:$PATH"

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found at $ANDROID_SDK_ROOT/platform-tools."
  echo "Set ANDROID_SDK_ROOT to your Android SDK path."
  exit 1
fi

java_major_from_bin() {
  local java_bin="$1"
  local version_raw=""

  if [ ! -x "$java_bin" ]; then
    return 1
  fi

  version_raw="$("$java_bin" -version 2>&1 | awk -F'"' '/version/ {print $2; exit}')"
  if [ -z "$version_raw" ]; then
    return 1
  fi

  if [[ "$version_raw" == 1.* ]]; then
    printf "%s" "${version_raw#1.}" | cut -d. -f1
  else
    printf "%s" "$version_raw" | cut -d. -f1
  fi
}

ensure_java_11_plus() {
  local selected_java_home="${JAVA_HOME:-}"
  local current_major=""
  local candidate=""
  local detected_java_home=""
  local -a candidates=(
    "/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home"
    "/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home"
    "/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home"
    "/Library/Java/JavaVirtualMachines/temurin-11.jdk/Contents/Home"
    "/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home"
  )

  if [ -n "$selected_java_home" ]; then
    current_major="$(java_major_from_bin "$selected_java_home/bin/java" || true)"
  elif command -v java >/dev/null 2>&1; then
    current_major="$(java_major_from_bin "$(command -v java)" || true)"
  fi

  if [ -n "$current_major" ] && [ "$current_major" -ge 11 ]; then
    return 0
  fi

  if [ -x "/usr/libexec/java_home" ]; then
    detected_java_home="$(/usr/libexec/java_home -v "11+" 2>/dev/null || true)"
    if [ -n "$detected_java_home" ]; then
      candidates=("$detected_java_home" "${candidates[@]}")
    fi
  fi

  for candidate in "${candidates[@]}"; do
    current_major="$(java_major_from_bin "$candidate/bin/java" || true)"
    if [ -n "$current_major" ] && [ "$current_major" -ge 11 ]; then
      export JAVA_HOME="$candidate"
      export PATH="$JAVA_HOME/bin:$PATH"
      return 0
    fi
  done

  echo "Java 11+ is required for Android build (current java is too old or missing)."
  echo "Install JDK 11+ and set JAVA_HOME before running this script."
  echo "Examples:"
  echo "  brew install openjdk@11"
  echo "  export JAVA_HOME=\"/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home\""
  exit 1
}

ensure_java_11_plus

connected_devices_count() {
  adb devices | awk 'NR > 1 && $2 == "device" {count++} END {print count+0}'
}

detect_min_sdk_version() {
  local min_sdk
  min_sdk="$(awk '/minSdkVersion[[:space:]]+[0-9]+/ {print $2; exit}' android/app/build.gradle 2>/dev/null | tr -cd '0-9' || true)"
  if [ -z "$min_sdk" ]; then
    min_sdk="23"
  fi
  printf "%s" "$min_sdk"
}

connected_compatible_devices_count() {
  local min_sdk="$1"
  local serial api count=0

  while IFS= read -r serial; do
    [ -n "$serial" ] || continue
    api="$(adb -s "$serial" shell getprop ro.build.version.sdk 2>/dev/null | tr -d '\r' | tr -d '\n' || true)"
    if [[ "$api" =~ ^[0-9]+$ ]] && [ "$api" -ge "$min_sdk" ]; then
      count=$((count + 1))
    fi
  done < <(adb devices | awk 'NR > 1 && $2 == "device" {print $1}')

  printf "%s" "$count"
}

print_connected_devices_api_levels() {
  local serial api
  while IFS= read -r serial; do
    [ -n "$serial" ] || continue
    api="$(adb -s "$serial" shell getprop ro.build.version.sdk 2>/dev/null | tr -d '\r' | tr -d '\n' || true)"
    if [[ "$api" =~ ^[0-9]+$ ]]; then
      echo "  - $serial (API $api)"
    else
      echo "  - $serial (API unknown)"
    fi
  done < <(adb devices | awk 'NR > 1 && $2 == "device" {print $1}')
}

infer_avd_api_level() {
  local avd_name="$1"
  local api=""
  local avd_config="$HOME/.android/avd/${avd_name}.avd/config.ini"

  if [[ "$avd_name" =~ [Aa]pi([0-9]+) ]]; then
    api="${BASH_REMATCH[1]}"
  fi

  if [ -z "$api" ] && [ -f "$avd_config" ]; then
    api="$(sed -n 's@.*android-\([0-9][0-9]*\).*@\1@p' "$avd_config" | head -n 1 || true)"
  fi

  if [ -n "$api" ]; then
    printf "%s" "$api"
    return 0
  fi
  return 1
}

pick_compatible_avd() {
  local min_sdk="$1"
  local avd_name avd_api
  local best_name=""
  local best_api=0

  while IFS= read -r avd_name; do
    [ -n "$avd_name" ] || continue
    avd_api="$(infer_avd_api_level "$avd_name" || true)"
    if [ -n "$avd_api" ] && [ "$avd_api" -ge "$min_sdk" ] && [ "$avd_api" -gt "$best_api" ]; then
      best_name="$avd_name"
      best_api="$avd_api"
    fi
  done < <(emulator -list-avds 2>/dev/null || true)

  if [ -n "$best_name" ]; then
    printf "%s" "$best_name"
    return 0
  fi
  return 1
}

wait_for_boot_completed() {
  local timeout_seconds=180
  local elapsed=0
  local sleep_step=2
  local boot_completed=""

  adb wait-for-device >/dev/null 2>&1 || true

  while [ "$elapsed" -lt "$timeout_seconds" ]; do
    boot_completed="$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' | tr -d '\n' || true)"
    if [ "$boot_completed" = "1" ]; then
      return 0
    fi
    sleep "$sleep_step"
    elapsed=$((elapsed + sleep_step))
  done

  return 1
}

is_metro_healthy() {
  local status
  status="$(curl -fsS "http://127.0.0.1:${RCT_METRO_PORT}/status" 2>/dev/null || true)"
  [ "$status" = "packager-status:running" ]
}

MIN_SDK_VERSION="$(detect_min_sdk_version)"
CONNECTED_COUNT="$(connected_devices_count)"
COMPATIBLE_COUNT="$(connected_compatible_devices_count "$MIN_SDK_VERSION")"

if [ "$CONNECTED_COUNT" -gt 0 ] && [ "$COMPATIBLE_COUNT" -eq 0 ]; then
  echo "Connected Android device(s) do not satisfy app minSdkVersion ($MIN_SDK_VERSION)."
  echo "Connected devices:"
  print_connected_devices_api_levels
  echo "Start a device/emulator with API >= $MIN_SDK_VERSION and rerun."
  echo "Example:"
  echo "  ANDROID_AVD=fruskacApi29PlayArm64 yarn android:stable"
  exit 1
fi

if [ "$CONNECTED_COUNT" -eq 0 ]; then
  if ! command -v emulator >/dev/null 2>&1; then
    echo "No Android device/emulator is connected and 'emulator' binary is missing."
    echo "Start an emulator manually from Android Studio Device Manager, then rerun."
    exit 1
  fi

  AVD_NAME="${ANDROID_AVD:-}"
  if [ -z "$AVD_NAME" ]; then
    AVD_NAME="$(pick_compatible_avd "$MIN_SDK_VERSION" || true)"
  fi

  if [ -z "$AVD_NAME" ]; then
    echo "No compatible Android Virtual Device found for minSdkVersion $MIN_SDK_VERSION."
    echo "Create/start an AVD with API >= $MIN_SDK_VERSION, or set ANDROID_AVD explicitly."
    echo "Available AVDs:"
    emulator -list-avds 2>/dev/null | sed 's/^/  - /' || true
    exit 1
  fi

  AVD_API="$(infer_avd_api_level "$AVD_NAME" || true)"
  if [ -n "$AVD_API" ] && [ "$AVD_API" -lt "$MIN_SDK_VERSION" ]; then
    echo "Selected AVD '$AVD_NAME' is API $AVD_API, but app minSdkVersion is $MIN_SDK_VERSION."
    echo "Set ANDROID_AVD to an emulator with API >= $MIN_SDK_VERSION."
    exit 1
  fi

  EMULATOR_LOG="${TMPDIR:-/tmp}/fruskac-android-emulator.log"
  echo "No connected Android device detected. Starting emulator '$AVD_NAME'..."
  nohup emulator -avd "$AVD_NAME" -netdelay none -netspeed full >"$EMULATOR_LOG" 2>&1 </dev/null &

  echo "Waiting for emulator to boot..."
  if ! wait_for_boot_completed; then
    echo "Emulator did not boot within timeout."
    echo "Check emulator log: $EMULATOR_LOG"
    adb devices -l || true
    exit 1
  fi
fi

if [ "$SKIP_ANDROID_METRO" != "1" ]; then
  adb reverse --remove "tcp:${RCT_METRO_PORT}" >/dev/null 2>&1 || true
  adb reverse "tcp:${RCT_METRO_PORT}" "tcp:${RCT_METRO_PORT}" >/dev/null 2>&1 || true
fi

if ! RN_CLI_PATH="$(resolve_rn_cli)"; then
  echo "React Native CLI not found. Run yarn install first."
  exit 1
fi

if [ "$RESET_ANDROID_APP_STATE" = "1" ]; then
  adb shell pm clear com.fruskac >/dev/null 2>&1 || true
fi

set +e
node "$RN_CLI_PATH" run-android --no-packager --port "$RCT_METRO_PORT" "$@"
RUN_ANDROID_EXIT_CODE=$?
set -e

if [ "$RUN_ANDROID_EXIT_CODE" -ne 0 ]; then
  exit "$RUN_ANDROID_EXIT_CODE"
fi

if [ "$SKIP_ANDROID_METRO" != "1" ] && ! is_metro_healthy; then
  echo "Metro is not reachable after Android launch. Restarting Metro and relaunching app..."
  FORCE_RESTART_METRO=1 bash scripts/ensure-metro-running.sh
  adb reverse --remove "tcp:${RCT_METRO_PORT}" >/dev/null 2>&1 || true
  adb reverse "tcp:${RCT_METRO_PORT}" "tcp:${RCT_METRO_PORT}" >/dev/null 2>&1 || true
  adb shell am start -n com.fruskac/.MainActivity >/dev/null 2>&1 || true
fi
