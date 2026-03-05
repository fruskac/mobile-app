#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

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

export BABEL_DISABLE_CACHE=1
if [[ "${NODE_OPTIONS:-}" != *"--max-old-space-size="* ]]; then
  export NODE_OPTIONS="${NODE_OPTIONS:+$NODE_OPTIONS }--max-old-space-size=4096"
fi
PORT="${RCT_METRO_PORT:-8081}"
FORCE_RESTART_METRO="${FORCE_RESTART_METRO:-1}"
EXPECTED_NODE_VERSION="$(tr -d '[:space:]' < "$ROOT_DIR/.nvmrc")"
EXPECTED_NODE_VERSION="${EXPECTED_NODE_VERSION#v}"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"

  if [ "$FORCE_RESTART_METRO" = "1" ]; then
    echo "Restarting Metro on port $PORT (PID $PID)..."
    kill "$PID" >/dev/null 2>&1 || true
    sleep 0.5
    if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
      kill -9 "$PID" >/dev/null 2>&1 || true
      sleep 0.5
    fi
  fi

  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
  else
    PID=""
  fi

  if [ -z "$PID" ]; then
    if ! RN_CLI_PATH="$(resolve_rn_cli)"; then
      echo "React Native CLI not found. Run yarn install first."
      exit 1
    fi
    exec node "$RN_CLI_PATH" start --host 127.0.0.1 --port "$PORT" --reset-cache --no-interactive
  fi

  NODE_BIN="$(lsof -a -p "$PID" -d txt -Fn 2>/dev/null | sed -n 's/^n//p' | awk '/\/node$/ {print; exit}')"
  RUNNING_NODE_VERSION=""

  if [ -n "$NODE_BIN" ] && [ -x "$NODE_BIN" ]; then
    RUNNING_NODE_VERSION="$("$NODE_BIN" -p 'process.versions.node' 2>/dev/null || true)"
    RUNNING_NODE_VERSION="${RUNNING_NODE_VERSION#v}"
  fi

  if [ -n "$RUNNING_NODE_VERSION" ] && [ "$RUNNING_NODE_VERSION" != "$EXPECTED_NODE_VERSION" ]; then
    echo "Port $PORT is occupied by Metro/process running Node v$RUNNING_NODE_VERSION."
    echo "This repo requires Node v$EXPECTED_NODE_VERSION from .nvmrc."
    echo "Stop it: kill $PID"
    echo "Then run: nvm use $EXPECTED_NODE_VERSION && yarn start:stable"
    exit 1
  fi

  echo "Metro (or another process) is already listening on port $PORT (PID $PID)."
  echo "Detected Node version is compatible with .nvmrc. Reusing existing process."
  exit 0
fi

if ! RN_CLI_PATH="$(resolve_rn_cli)"; then
  echo "React Native CLI not found. Run yarn install first."
  exit 1
fi

exec node "$RN_CLI_PATH" start --host 127.0.0.1 --port "$PORT" --reset-cache --no-interactive
