#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${RCT_METRO_PORT:-8081}"
METRO_LOG="${TMPDIR:-/tmp}/fruskac-metro.log"
FORCE_RESTART_METRO="${FORCE_RESTART_METRO:-0}"
METRO_SANITY_CHECK="${METRO_SANITY_CHECK:-1}"

stop_stale_repo_metros() {
  local lines
  if command -v rg >/dev/null 2>&1; then
    lines="$(ps -eo pid=,command= | rg -n --no-heading "${ROOT_DIR}/node_modules/(react-native/local-cli/cli\\.js|react-native/cli\\.js|@react-native-community/cli/build/bin\\.js) start" -S || true)"
  else
    lines="$(ps -eo pid=,command= | grep -En "${ROOT_DIR}/node_modules/(react-native/local-cli/cli\\.js|react-native/cli\\.js|@react-native-community/cli/build/bin\\.js) start" || true)"
  fi
  if [ -z "$lines" ]; then
    return 0
  fi

  while IFS= read -r row; do
    [ -z "$row" ] && continue
    local cmd pid cmd_port
    cmd="${row#*:}"
    pid="$(printf "%s" "$cmd" | awk '{print $1}')"
    cmd_port="$(printf "%s" "$cmd" | sed -n 's/.*--port[[:space:]]\{1,\}\([0-9][0-9]*\).*/\1/p')"
    [ -n "$cmd_port" ] || cmd_port="8081"

    if [ "$cmd_port" != "$PORT" ] && [ -n "$pid" ]; then
      echo "Stopping stale Metro on port $cmd_port (PID $pid)..."
      kill "$pid" >/dev/null 2>&1 || true
    fi
  done <<<"$lines"
}

is_metro_healthy() {
  local status
  status="$(curl -fsS "http://127.0.0.1:${PORT}/status" 2>/dev/null || true)"
  [ "$status" = "packager-status:running" ]
}

reset_metro_caches() {
  watchman watch-del-all >/dev/null 2>&1 || true
  rm -rf "${TMPDIR:-/tmp}"/metro-* "${TMPDIR:-/tmp}"/haste-map-* >/dev/null 2>&1 || true
}

is_metro_bundle_sane() {
  local bundle_url
  local bundle_tmp
  local marker
  bundle_url="http://127.0.0.1:${PORT}/index.bundle?platform=android&dev=true&lazy=true&minify=false&modulesOnly=false&runModule=true"
  bundle_tmp="${TMPDIR:-/tmp}/fruskac-metro-sanity-${PORT}.bundle"

  if ! curl -fsS --max-time 45 "$bundle_url" -o "$bundle_tmp" 2>/dev/null; then
    rm -f "$bundle_tmp" >/dev/null 2>&1 || true
    return 1
  fi

  local -a markers=(
    "NativePlatformConstantsAndroid.js"
    "src/components/Menu/Menu.js"
    "src/routes/Map/Map.js"
  )
  local rc=0
  for marker in "${markers[@]}"; do
    if command -v rg >/dev/null 2>&1; then
      if ! rg -q "$marker" "$bundle_tmp"; then
        rc=1
        break
      fi
    else
      if ! grep -q "$marker" "$bundle_tmp"; then
        rc=1
        break
      fi
    fi
  done
  rm -f "$bundle_tmp" >/dev/null 2>&1 || true
  return "$rc"
}

start_metro_daemon() {
  local pid_file="${TMPDIR:-/tmp}/fruskac-metro.pid"

  if command -v setsid >/dev/null 2>&1; then
    nohup setsid bash scripts/start-metro-stable.sh >"$METRO_LOG" 2>&1 </dev/null &
  else
    nohup bash scripts/start-metro-stable.sh >"$METRO_LOG" 2>&1 </dev/null &
  fi

  echo "$!" >"$pid_file"
}

wait_for_metro() {
  local attempts=40
  local sleep_seconds=1
  local i
  for i in $(seq 1 "$attempts"); do
    if is_metro_healthy; then
      return 0
    fi
    sleep "$sleep_seconds"
  done
  return 1
}

stop_stale_repo_metros

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"

  if [ "$FORCE_RESTART_METRO" = "1" ]; then
    echo "Restarting Metro on port $PORT (PID $PID)..."
    kill "$PID" >/dev/null 2>&1 || true
    for _ in $(seq 1 20); do
      if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
        break
      fi
      sleep 0.2
    done
    if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
      kill -9 "$PID" >/dev/null 2>&1 || true
      sleep 0.5
    fi
    reset_metro_caches
  elif is_metro_healthy; then
    if [ "$METRO_SANITY_CHECK" = "1" ] && ! is_metro_bundle_sane; then
      echo "Metro is healthy on port $PORT, but bundle sanity check failed. Restarting..."
      kill "$PID" >/dev/null 2>&1 || true
      for _ in $(seq 1 20); do
        if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
          break
        fi
        sleep 0.2
      done
      if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
        PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
        kill -9 "$PID" >/dev/null 2>&1 || true
        sleep 0.5
      fi
      reset_metro_caches
    else
      exit 0
    fi
  else
    echo "Port $PORT is occupied by PID $PID, but Metro health check failed."
    echo "Stop it: kill $PID"
    exit 1
  fi
fi

if [ "$FORCE_RESTART_METRO" = "1" ]; then
  reset_metro_caches
fi

echo "Starting Metro on port $PORT..."
start_metro_daemon

if ! wait_for_metro; then
  echo "Metro failed to become healthy on port $PORT."
  echo "Last Metro log lines:"
  tail -n 40 "$METRO_LOG" || true
  exit 1
fi

if [ "$METRO_SANITY_CHECK" = "1" ] && ! is_metro_bundle_sane; then
  echo "Metro is running, but Android bundle sanity check failed. Restarting once..."
  PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1 || true)"
  if [ -n "$PID" ]; then
    kill "$PID" >/dev/null 2>&1 || true
    sleep 0.5
    if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
      PID="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN | head -n 1)"
      kill -9 "$PID" >/dev/null 2>&1 || true
      sleep 0.5
    fi
  fi

  reset_metro_caches
  start_metro_daemon
  if ! wait_for_metro || ! is_metro_bundle_sane; then
    echo "Metro sanity check failed after restart."
    echo "Last Metro log lines:"
    tail -n 40 "$METRO_LOG" || true
    exit 1
  fi
fi

if ! lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Metro health check passed but no process is listening on port $PORT."
  echo "Last Metro log lines:"
  tail -n 40 "$METRO_LOG" || true
  exit 1
fi
