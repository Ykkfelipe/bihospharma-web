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
  npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || true
fi

echo "→ Restart PM2 (clean start)…"
pm2 delete bihos 2>/dev/null || true
sudo fuser -k 3000/tcp 2>/dev/null || true
sleep 1
pm2 start ecosystem.config.js --only bihos --update-env
pm2 restart bihos-watchdog --update-env 2>/dev/null || pm2 start ecosystem.config.js --only bihos-watchdog --update-env
pm2 save

echo "→ Smoke test…"
for i in 1 2 3 4 5; do
  if curl -sf -o /dev/null http://127.0.0.1:3000/; then
    echo "✓ App responding on :3000"
    exit 0
  fi
  sleep 2
done

echo "❌ App not responding — recent logs:"
pm2 logs bihos --lines 30 --nostream || true
exit 1
