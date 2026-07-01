#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/Users/c8/workspace/ai-education-intelligence"
CODEX_BIN="/Applications/Codex.app/Contents/Resources/codex"
LOG_DIR="$REPO_DIR/logs"
RUN_DATE="$(TZ=Asia/Shanghai date +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/weekly-codex-$RUN_DATE.log"

mkdir -p "$LOG_DIR"
cd "$REPO_DIR"

{
  echo "[$(date '+%Y-%m-%d %H:%M:%S %z')] start weekly update, Asia/Shanghai date: $RUN_DATE"

  if [ ! -x "$CODEX_BIN" ]; then
    echo "Codex CLI not found: $CODEX_BIN"
    exit 1
  fi

  if [ -n "$(git status --porcelain)" ]; then
    echo "Working tree is dirty. Stop to avoid overwriting local changes."
    git status --short
    exit 1
  fi

  "$CODEX_BIN" exec \
    --search \
    --ask-for-approval never \
    --sandbox danger-full-access \
    -C "$REPO_DIR" \
    "$(cat .codex/weekly-task.md)

本次执行日期：$RUN_DATE（Asia/Shanghai）。

请更新本周公开资料，重点补充最近一周的政策、专家观点、文献和报道；更新 docs/data.json、records/weekly/$RUN_DATE.md 以及相关索引文档；保持 GitHub Pages 多页结构可用；完成 JSON 校验后提交并推送。"

  echo "[$(date '+%Y-%m-%d %H:%M:%S %z')] finished weekly update"
} >> "$LOG_FILE" 2>&1
