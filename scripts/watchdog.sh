#!/usr/bin/env bash
# Health watchdog: restart PM2 when the app is down, restart only — no server-side build.
# Safe to run from cron or the PM2 watchdog daemon (flock prevents overlap).
set -euo pipefail

APP_DIR="${APP_DIR:-/home/ec2-user/bihospharma-web}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3000/_health}"
LOG_FILE="${LOG_FILE:-$APP_DIR/logs/watchdog.log}"
LOCK_FILE="${LOCK_FILE:-/tmp/bihos-watchdog.lock}"
MAX_RESTART_ATTEMPTS="${MAX_RESTART_ATTEMPTS:-3}"
REBUILD_ON_FAILURE="${REBUILD_ON_FAILURE:-false}"

mkdir -p "$(dirname "$LOG_FILE")"

log() {
  echo "[$(date -Iseconds)] $*" | tee -a "$LOG_FILE"
}

load_env() {
  export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    # shellcheck disable=SC1091
    . "$NVM_DIR/nvm.sh"
  fi
  cd "$APP_DIR"
  if [ -f .env.production ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env.production
    set +a
  fi
}

check_health() {
  curl -sf --max-time 5 "$HEALTH_URL" >/dev/null 2>&1
}

pm2_status() {
  pm2 jlist 2>/dev/null | node -e "
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) process.exit(1);
    const apps = JSON.parse(input);
    const app = apps.find((entry) => entry.name === 'bihos');
    if (!app) process.exit(1);
    process.stdout.write(app.pm2_env.status || 'unknown');
  " 2>/dev/null || echo "missing"
}

restart_app() {
  local attempt=$1
  log "Restart attempt ${attempt}/${MAX_RESTART_ATTEMPTS}"

  sudo fuser -k 3000/tcp 2>/dev/null || true
  sleep 1

  local status
  status="$(pm2_status)"
  if [ "$status" = "online" ] || [ "$status" = "launching" ]; then
    pm2 restart bihos --update-env >>"$LOG_FILE" 2>&1 || true
  else
    pm2 delete bihos 2>/dev/null || true
    pm2 start ecosystem.config.js --only bihos --update-env >>"$LOG_FILE" 2>&1
  fi

  pm2 save >>"$LOG_FILE" 2>&1 || true
  sleep 8
}

rebuild_app() {
  log "Restart attempts failed — server-side rebuild is disabled by default (can crash EC2)"
  log "Run deployb from your Mac to build locally and push to the server"
  if [ "$REBUILD_ON_FAILURE" != "true" ]; then
    return 1
  fi
  log "REBUILD_ON_FAILURE=true — running emergency rebuild on server"
  npm run build >>"$LOG_FILE" 2>&1
  npx prisma generate >>"$LOG_FILE" 2>&1
  bash scripts/prisma-migrate-deploy.sh >>"$LOG_FILE" 2>&1
  pm2 restart bihos --update-env >>"$LOG_FILE" 2>&1 || pm2 start ecosystem.config.js --only bihos --update-env >>"$LOG_FILE" 2>&1
  pm2 save >>"$LOG_FILE" 2>&1 || true
  sleep 12
}

exec 200>"$LOCK_FILE"
if ! flock -n 200; then
  log "Another watchdog run is in progress — skipping"
  exit 0
fi

if check_health; then
  exit 0
fi

log "Health check FAILED for $HEALTH_URL"
load_env

for attempt in $(seq 1 "$MAX_RESTART_ATTEMPTS"); do
  restart_app "$attempt"
  if check_health; then
    log "Recovery successful after restart"
    exit 0
  fi
done

if [ "$REBUILD_ON_FAILURE" = "true" ]; then
  rebuild_app
  if check_health; then
    log "Recovery successful after rebuild"
    exit 0
  fi
fi

log "CRITICAL: watchdog could not restore the app — run deployb from your Mac"
exit 1
