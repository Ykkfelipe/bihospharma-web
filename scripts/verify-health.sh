#!/usr/bin/env bash
# Wait for app health (used after deploy/restart). Exits 0 when healthy.
set -euo pipefail

HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/_health}"
ATTEMPTS="${HEALTH_ATTEMPTS:-30}"
SLEEP_SECONDS="${HEALTH_SLEEP_SECONDS:-2}"

for i in $(seq 1 "$ATTEMPTS"); do
  response="$(curl -sf --max-time 5 "$HEALTH_URL" 2>/dev/null || true)"
  if [ -n "$response" ]; then
    if echo "$response" | node -e "
      const fs = require('fs');
      const input = fs.readFileSync(0, 'utf8').trim();
      if (!input) process.exit(1);
      let data;
      try { data = JSON.parse(input); } catch { process.exit(1); }
      if (data.status === 'ok' && data.ready !== false) process.exit(0);
      process.exit(1);
    " 2>/dev/null; then
      echo "✓ Health check passed (${HEALTH_URL})"
      exit 0
    fi
  fi
  echo "… waiting for health (${i}/${ATTEMPTS})"
  sleep "$SLEEP_SECONDS"
done

echo "❌ Health check failed after ${ATTEMPTS} attempts (${HEALTH_URL})"
exit 1
