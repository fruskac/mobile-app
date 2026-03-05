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

if [ "${FRUSKAC_IOS_ENV_SANITIZED:-0}" != "1" ]; then
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
    RCT_METRO_PORT="${RCT_METRO_PORT:-}" \
    FRUSKAC_IOS_ENV_SANITIZED=1 \
    bash "$0" "$@"
fi

. scripts/ensure-node-version.sh
node scripts/patch-react-redux-lifecycles.js >/dev/null
bash scripts/ensure-runtime-deps.sh

ensure_ios_codegen_artifacts() {
  local legacy_codegen_cpp="$ROOT_DIR/ios/build/generated/ios/FBReactNativeSpecJSI-generated.cpp"
  local codegen_podspec_json="$ROOT_DIR/ios/build/generated/ios/ReactCodegen.podspec.json"
  local codegen_podspec="$ROOT_DIR/ios/build/generated/ios/ReactCodegen.podspec"
  local app_dependency_provider="$ROOT_DIR/ios/build/generated/ios/RCTAppDependencyProvider.mm"
  local codegen_podspec_nested="$ROOT_DIR/ios/build/generated/ios/ReactCodegen/ReactCodegen.podspec"
  local app_dependency_provider_nested="$ROOT_DIR/ios/build/generated/ios/ReactAppDependencyProvider/RCTAppDependencyProvider.mm"

  has_any_artifact() {
    for artifact in "$@"; do
      if [ -f "$artifact" ]; then
        return 0
      fi
    done
    return 1
  }

  # RN <= 0.76 generated FBReactNativeSpecJSI-generated.cpp.
  # RN >= 0.77 generates ReactCodegen podspec + dependency provider files.
  if [ -f "$legacy_codegen_cpp" ] || { has_any_artifact "$codegen_podspec_json" "$codegen_podspec" "$codegen_podspec_nested" && has_any_artifact "$app_dependency_provider" "$app_dependency_provider_nested"; }; then
    return 0
  fi

  echo "Missing iOS RN codegen artifacts. Running pod install to regenerate..."
  (
    cd ios
    pod install
  )

  if [ ! -f "$legacy_codegen_cpp" ] && { ! has_any_artifact "$codegen_podspec_json" "$codegen_podspec" "$codegen_podspec_nested" || ! has_any_artifact "$app_dependency_provider" "$app_dependency_provider_nested"; }; then
    echo "iOS codegen artifacts are still missing after pod install:"
    echo "  legacy: $legacy_codegen_cpp"
    echo "  rn>=0.77: $codegen_podspec_json"
    echo "  rn>=0.79: $codegen_podspec"
    echo "  rn>=0.83: $codegen_podspec_nested"
    echo "  rn>=0.77: $app_dependency_provider"
    echo "  rn>=0.83: $app_dependency_provider_nested"
    echo "Run: yarn clean:stable && (cd ios && pod install)"
    exit 1
  fi
}

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

sync_xcode_node_binary() {
  local node_path="$1"
  local local_env="$ROOT_DIR/ios/.xcode.env.local"
  local desired_line="export NODE_BINARY=$node_path"

  if [ ! -f "$local_env" ] || ! grep -qxF "$desired_line" "$local_env"; then
    printf "%s\n" "$desired_line" > "$local_env"
    echo "Updated ios/.xcode.env.local NODE_BINARY to current runtime node."
  fi
}

PORT="${RCT_METRO_PORT:-8081}"
FORCE_RESTART_METRO="${FORCE_RESTART_METRO:-0}"
bash scripts/ensure-metro-running.sh
ensure_ios_codegen_artifacts

if [ -f "ios/main.jsbundle" ] && rg -q "major:0,minor:52" ios/main.jsbundle; then
  echo "Removing stale ios/main.jsbundle (RN 0.52.x)."
  rm -f ios/main.jsbundle
fi

# Ensure Xcode script phases use the real Node binary, not Yarn temp shims.
export NODE_BINARY
NODE_BINARY="$(node -p 'process.execPath')"
sync_xcode_node_binary "$NODE_BINARY"
export FORCE_BUNDLING="${FORCE_BUNDLING:-1}"

SIMULATOR="${SIMULATOR:-iPhone 16}"
if [ "$#" -gt 0 ]; then
  SIMULATOR="$1"
  shift
fi

if ! RN_CLI_PATH="$(resolve_rn_cli)"; then
  echo "React Native CLI not found. Run yarn install first."
  exit 1
fi

exec node "$RN_CLI_PATH" run-ios --simulator "$SIMULATOR" --no-packager --verbose "$@"
