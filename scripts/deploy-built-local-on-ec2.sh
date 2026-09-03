#!/usr/bin/env bash
# Self-hosted runner deploy: build in the GitHub runner workspace, copy the
# compiled app into the live EC2 app directory, then restart PM2.
set -euo pipefail

LOCAL_APP_DIR="${LOCAL_APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
APP_DIR="${APP_DIR:-/home/ec2-user/bihospharma-web}"

if [ ! -f "$LOCAL_APP_DIR/.next/BUILD_ID" ]; then
  echo "❌ Missing .next/BUILD_ID — run npm run build before deploy."
  exit 1
fi

if [ ! -d "$APP_DIR" ]; then
  echo "→ Creating app directory: $APP_DIR"
  mkdir -p "$APP_DIR"
fi

echo "→ Pre-deploy backup on server…"
APP_DIR="$APP_DIR" bash "$LOCAL_APP_DIR/scripts/pre-deploy-backup.sh" || true

echo "→ Syncing built workspace to live app directory…"
rsync -az --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dev.db' \
  --exclude='prod.db' \
  --exclude='*.db' \
  --exclude='*.db-journal' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='public/uploads' \
  --exclude='remediation-log' \
  --exclude='.deploy-backups' \
  "$LOCAL_APP_DIR/" "$APP_DIR/"

cd "$APP_DIR"

echo "→ Installing production dependencies…"
npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null \
  || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps

echo "→ Generating Prisma client…"
npx prisma generate --schema=./prisma/schema.prisma 2>/dev/null \
  || npx --yes prisma@5.22.0 generate --schema=./prisma/schema.prisma

echo "→ Verifying server .env.production…"
touch .env.production
chmod 600 .env.production
sed -i 's|^DATABASE_URL=file:./prisma/prod.db|DATABASE_URL=file:./prod.db|' .env.production || true
sed -i 's|^AUTH_URL=https://bihospharma.com/api/auth|AUTH_URL=https://bihospharma.com|' .env.production || true

echo "→ Applying database migrations…"
bash scripts/prisma-migrate-deploy.sh

echo "→ Restarting PM2…"
chmod +x scripts/deploy-on-ec2.sh
SKIP_INSTALL=1 APP_DIR="$APP_DIR" bash scripts/deploy-on-ec2.sh

echo "✓ Self-hosted deploy complete."
