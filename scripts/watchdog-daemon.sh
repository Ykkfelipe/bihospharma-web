#!/usr/bin/env bash
# Long-running watchdog loop managed by PM2.
set -euo pipefail

APP_DIR="${APP_DIR:-/home/ec2-user/bihospharma-web}"
INTERVAL_SECONDS="${WATCHDOG_INTERVAL_SECONDS:-60}"

cd "$APP_DIR"

echo "[watchdog-daemon] Starting (interval=${INTERVAL_SECONDS}s)"

while true; do
  if ! "$APP_DIR/scripts/watchdog.sh"; then
    echo "[watchdog-daemon] Recovery attempt failed; will retry in ${INTERVAL_SECONDS}s"
  fi
  sleep "$INTERVAL_SECONDS"
done
