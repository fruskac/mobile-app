#!/usr/bin/env bash
set -euo pipefail

IS_SOURCED=0
if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
  IS_SOURCED=1
fi

fail() {
  echo "$@"
  if [ "$IS_SOURCED" -eq 1 ]; then
    return 1
  fi
  exit 1
}

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NVMRC_FILE="$ROOT_DIR/.nvmrc"

if [ ! -f "$NVMRC_FILE" ]; then
  fail "Missing .nvmrc. Cannot verify Node.js version."
fi

EXPECTED_RAW="$(tr -d '[:space:]' < "$NVMRC_FILE")"
EXPECTED="${EXPECTED_RAW#v}"

if [ -z "$EXPECTED" ]; then
  fail ".nvmrc is empty. Cannot verify Node.js version."
fi

get_current_node_version() {
  if ! command -v node >/dev/null 2>&1; then
    return 1
  fi

  local current
  current="$(node -p 'process.versions.node' 2>/dev/null || true)"
  current="${current#v}"
  if [ -z "$current" ]; then
    return 1
  fi

  printf "%s" "$current"
  return 0
}

matches_expected_version() {
  local current="$1"
  local expected="$2"

  if [[ "$expected" == *.* ]]; then
    [ "$current" = "$expected" ]
    return
  fi

  [ "${current%%.*}" = "$expected" ]
}

load_nvm_if_possible() {
  if command -v nvm >/dev/null 2>&1; then
    return 0
  fi

  local nvm_dir="${NVM_DIR:-$HOME/.nvm}"
  local -a candidates=(
    "$nvm_dir/nvm.sh"
    "/opt/homebrew/opt/nvm/nvm.sh"
    "/usr/local/opt/nvm/nvm.sh"
  )
  local candidate
  for candidate in "${candidates[@]}"; do
    if [ -s "$candidate" ]; then
      local had_e=0
      local had_u=0
      case $- in
        *e*) had_e=1 ;;
      esac
      case $- in
        *u*) had_u=1 ;;
      esac

      set +e
      set +u
      # shellcheck disable=SC1090
      . "$candidate" --no-use >/dev/null 2>&1
      if [ "$had_u" -eq 1 ]; then
        set -u
      fi
      if [ "$had_e" -eq 1 ]; then
        set -e
      fi
      if command -v nvm >/dev/null 2>&1; then
        return 0
      fi
    fi
  done

  return 1
}

activate_expected_node() {
  if ! load_nvm_if_possible; then
    return 1
  fi

  nvm use "$EXPECTED" >/dev/null 2>&1 || return 1
  return 0
}

CURRENT_NORMALIZED="$(get_current_node_version || true)"
if ! matches_expected_version "$CURRENT_NORMALIZED" "$EXPECTED"; then
  activate_expected_node || true
  CURRENT_NORMALIZED="$(get_current_node_version || true)"
fi

if ! matches_expected_version "$CURRENT_NORMALIZED" "$EXPECTED"; then
  echo "Wrong Node.js version for this repo."
  echo "Expected: v$EXPECTED (from .nvmrc)"
  if [ -n "$CURRENT_NORMALIZED" ]; then
    echo "Current:  v$CURRENT_NORMALIZED"
  else
    echo "Current:  not found in PATH"
  fi
  echo "Run: nvm use $EXPECTED"
  fail "Unable to activate required Node.js automatically."
fi
