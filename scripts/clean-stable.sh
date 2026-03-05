#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

. scripts/ensure-node-version.sh
watchman watch-del-all >/dev/null 2>&1 || true

PORT="${RCT_METRO_PORT:-8081}"
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
  kill "$PID" >/dev/null 2>&1 || true
  sleep 0.5
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
    kill -9 "$PID" >/dev/null 2>&1 || true
  fi
fi

rm -rf "$ROOT_DIR/ios/build" "$ROOT_DIR/android/.gradle" "$ROOT_DIR/android/app/build"
rm -rf "${TMPDIR:-/tmp}"/metro-* "${TMPDIR:-/tmp}"/haste-map-* >/dev/null 2>&1 || true

node scripts/patch-react-redux-lifecycles.js >/dev/null

echo "Project caches/build artifacts cleaned."
echo "Run: yarn install && (cd ios && pod install)"
