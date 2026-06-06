#!/usr/bin/env bash
# Post-rsync steps on EC2 (called by GitHub Actions or manually after rsync).
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
fi

APP_DIR="${APP_DIR:-$HOME/bihospharma-web}"
cd "$APP_DIR"

if [ ! -f .next/BUILD_ID ]; then
  echo "❌ Missing .next/BUILD_ID — build on CI first, then rsync."
  exit 1
fi

if [ "${SKIP_INSTALL:-}" != "1" ]; then
  echo "→ Installing production dependencies…"
  npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null \
    || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps

  echo "→ Prisma generate…"
  npx prisma generate --schema=./prisma/schema.prisma 2>/dev/null \
    || npx --yes prisma@5.22.0 generate --schema=./prisma/schema.prisma

  if [ -f .env.production ]; then
    sed -i 's|^DATABASE_URL=file:./prisma/prod.db|DATABASE_URL=file:./prod.db|' .env.production || true
    sed -i 's|^AUTH_URL=https://bihospharma.com/api/auth|AUTH_URL=https://bihospharma.com|' .env.production || true
    set -a
    # shellcheck disable=SC1091
    . ./.env.production
    set +a
  fi

  echo "→ Database schema…"
  bash scripts/prisma-migrate-deploy.sh
fi

restart_count_before="$(pm2 jlist 2>/dev/null | node -e "
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) process.exit(0);
  const apps = JSON.parse(input);
  const app = apps.find((entry) => entry.name === 'bihos');
  process.stdout.write(String(app?.pm2_env?.restart_time ?? 0));
" 2>/dev/null || echo 0)"

echo "→ Graceful PM2 reload (restart count before: ${restart_count_before})…"
if pm2 describe bihos >/dev/null 2>&1; then
  pm2 reload bihos --update-env --wait-ready --listen-timeout 20000 || {
    echo "⚠ reload failed — falling back to clean start"
    pm2 delete bihos 2>/dev/null || true
    pm2 start ecosystem.config.js --only bihos --update-env
  }
else
  pm2 start ecosystem.config.js --only bihos --update-env
fi

pm2 restart bihos-watchdog --update-env 2>/dev/null || pm2 start ecosystem.config.js --only bihos-watchdog --update-env
pm2 save

echo "→ Health verification…"
if bash scripts/verify-health.sh; then
  restart_count_after="$(pm2 jlist 2>/dev/null | node -e "
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf8').trim();
    if (!input) process.exit(0);
    const apps = JSON.parse(input);
    const app = apps.find((entry) => entry.name === 'bihos');
    process.stdout.write(String(app?.pm2_env?.restart_time ?? 0));
  " 2>/dev/null || echo 0)"
  echo "✓ Deploy restart complete (restart count after: ${restart_count_after})"
  exit 0
fi

echo "❌ App not healthy — recent logs:"
pm2 logs bihos --lines 30 --nostream || true
exit 1
