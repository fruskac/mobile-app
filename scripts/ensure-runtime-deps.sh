#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNTIME_HELPER="$ROOT_DIR/node_modules/@babel/runtime/helpers/interopRequireDefault.js"
EXPECTED_NODE_VERSION="$(tr -d '[:space:]' < "$ROOT_DIR/.nvmrc" 2>/dev/null || true)"
EXPECTED_NODE_VERSION="${EXPECTED_NODE_VERSION#v}"
if [ -z "$EXPECTED_NODE_VERSION" ]; then
  EXPECTED_NODE_VERSION="18"
fi

if [ -f "$RUNTIME_HELPER" ]; then
  exit 0
fi

echo "Missing runtime dependency: @babel/runtime"
echo "Expected helper file: $RUNTIME_HELPER"
echo "This causes Metro error: Unable to resolve module @babel/runtime/helpers/interopRequireDefault."
echo ""
echo "Run:"
echo "  nvm use $EXPECTED_NODE_VERSION"
echo "  yarn install"
echo "  yarn clean:stable"
echo "  yarn start:stable"
exit 1
