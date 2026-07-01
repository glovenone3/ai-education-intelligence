#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/Users/c8/workspace/ai-education-intelligence"
STATE_DIR="$HOME/.codex/ai-education-weekly"
LAST_RUN_FILE="$STATE_DIR/last-run-date"
LOCK_DIR="$STATE_DIR/lock"
LOG_DIR="$REPO_DIR/logs"

mkdir -p "$STATE_DIR" "$LOG_DIR"

SHANGHAI_DATE="$(TZ=Asia/Shanghai date +%Y-%m-%d)"
SHANGHAI_WEEKDAY="$(TZ=Asia/Shanghai date +%w)"
SHANGHAI_HOUR="$(TZ=Asia/Shanghai date +%H)"

if [ "$SHANGHAI_WEEKDAY" != "1" ] || [ "$SHANGHAI_HOUR" != "09" ]; then
  exit 0
fi

if [ -f "$LAST_RUN_FILE" ] && [ "$(cat "$LAST_RUN_FILE")" = "$SHANGHAI_DATE" ]; then
  exit 0
fi

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  exit 0
fi

cleanup() {
  rmdir "$LOCK_DIR" 2>/dev/null || true
}
trap cleanup EXIT

if "$REPO_DIR/scripts/run_weekly_codex_update.sh"; then
  printf '%s\n' "$SHANGHAI_DATE" > "$LAST_RUN_FILE"
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S %z')] weekly update failed" >> "$LOG_DIR/weekly-codex-$SHANGHAI_DATE.log"
  exit 1
fi
