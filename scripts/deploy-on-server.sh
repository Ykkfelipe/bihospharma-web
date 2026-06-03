#!/usr/bin/env bash
# EMERGENCY ONLY — builds on the server and can crash a small EC2 instance.
# Normal deploys: run deployb from your Mac (builds locally, pushes to EC2).
# Usage: ALLOW_SERVER_BUILD=true bash scripts/deploy-on-server.sh
set -euo pipefail

if [ "${ALLOW_SERVER_BUILD:-false}" != "true" ]; then
  echo "❌ Server-side builds are disabled (they can crash EC2)."
  echo "   Use deployb from your Mac instead:  ./deployb"
  echo "   Emergency only: ALLOW_SERVER_BUILD=true bash scripts/deploy-on-server.sh"
  exit 1
fi

APP_DIR="${APP_DIR:-/home/ec2-user/bihospharma-web}"
BRANCH="${DEPLOY_BRANCH:-main}"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
fi

echo "⚠ EMERGENCY server-side deploy from $APP_DIR (branch: $BRANCH)"
cd "$APP_DIR"

if [ -d .git ]; then
  git fetch origin "$BRANCH"
  git reset --hard "origin/$BRANCH"
fi

if [ -f .env.production ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env.production
  set +a
fi

export NEXTAUTH_URL="${NEXTAUTH_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_ENABLE_CHAT="${NEXT_PUBLIC_ENABLE_CHAT:-true}"

echo "→ Installing production dependencies"
npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null \
  || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps

echo "→ Building application ON SERVER (emergency only)"
npm run build

echo "→ Generating Prisma client"
npx prisma generate --schema=./prisma/schema.prisma 2>/dev/null \
  || npx --yes prisma@5.22.0 generate --schema=./prisma/schema.prisma

echo "→ Applying database migrations"
npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || true

touch .env.production
chmod 600 .env.production
sed -i 's|^DATABASE_URL=file:./prisma/prod.db|DATABASE_URL=file:./prod.db|' .env.production || true
sed -i 's|^AUTH_URL=https://bihospharma.com/api/auth|AUTH_URL=https://bihospharma.com|' .env.production || true

mkdir -p logs

pm2 delete bihos 2>/dev/null || true
sudo fuser -k 3000/tcp 2>/dev/null || true
sleep 1

set -a
# shellcheck disable=SC1091
. ./.env.production
set +a

pm2 start ecosystem.config.js --update-env
pm2 save

for i in $(seq 1 15); do
  if curl -sf --max-time 5 http://127.0.0.1:3000/_health >/dev/null; then
    echo "✓ Emergency deploy complete — app is healthy"
    exit 0
  fi
  sleep 2
done

echo "⚠ Deploy finished but health check did not pass"
exit 1
