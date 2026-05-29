#!/usr/bin/env bash
# deploy.sh — build locally, rsync to EC2, restart PM2
# Usage: ./deploy.sh
set -euo pipefail

EC2_HOST="bihos"
EC2_APP_DIR="/home/ec2-user/bihospharma-web"
LOCAL_APP_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- 1. Build locally ---
echo "→ Building locally…"
cd "$LOCAL_APP_DIR"
set -a
if [ -f .env.production ]; then
  # shellcheck disable=SC1091
  . ./.env.production
elif [ -f .env.local ]; then
  # shellcheck disable=SC1091
  . ./.env.local
fi
export NEXTAUTH_URL="${NEXTAUTH_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_ENABLE_CHAT="${NEXT_PUBLIC_ENABLE_CHAT:-true}"
set +a
npm run build

# --- 2. Sync built output + source to EC2 ---
echo "→ Generating Prisma client locally..."
npx prisma generate

echo "→ Syncing to EC2…"
rsync -az \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dev.db' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='public/uploads' \
  --exclude='remediation-log' \
  "$LOCAL_APP_DIR/" "$EC2_HOST:~/bihospharma-web/"

# Sync the pre-generated Prisma client separately
rsync -az \
  "$LOCAL_APP_DIR/node_modules/.prisma/" "$EC2_HOST:~/bihospharma-web/node_modules/.prisma/"

# --- 3. Install production deps on server (fast — no build) ---
echo "→ Installing production deps on server…"
ssh "$EC2_HOST" "cd ~/bihospharma-web && npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps"

# --- 3b. Generate Prisma client on server ---
echo "→ Generating Prisma client on server…"
ssh "$EC2_HOST" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd ~/bihospharma-web
  rm -f ~/package-lock.json ~/package.json 2>/dev/null || true
  prisma generate --schema=./prisma/schema.prisma 2>/dev/null || npx --yes prisma@5.22.0 generate --schema=./prisma/schema.prisma
  echo 'Prisma client generated'
"

# --- 3c. Apply DB schema on server ---
echo "→ Applying database migrations on server…"
ssh "$EC2_HOST" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd $EC2_APP_DIR
  set -a && [ -f .env.production ] && . ./.env.production && set +a
  npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || true
"

# --- 3d. Fix common production env mistakes (paths, auth URL) ---
echo "→ Verifying server .env.production…"
ssh "$EC2_HOST" "cd ~/bihospharma-web && touch .env.production && chmod 600 .env.production && \
  sed -i 's|^DATABASE_URL=file:./prisma/prod.db|DATABASE_URL=file:./prod.db|' .env.production && \
  sed -i 's|^AUTH_URL=https://bihospharma.com/api/auth|AUTH_URL=https://bihospharma.com|' .env.production && \
  if [ -f dev.db ] && [ ! -s prisma/prod.db ] 2>/dev/null; then cp dev.db prisma/prod.db; fi"

# --- 3e. Sync missing chat secrets to server .env.production (never committed to git) ---
if [ -f .env.local ]; then
  echo "→ Ensuring server .env.production has chat vars (if missing)…"
  ssh "$EC2_HOST" "touch ~/bihospharma-web/.env.production && chmod 600 ~/bihospharma-web/.env.production"
  for key in GROQ_API_KEY NEXT_PUBLIC_ENABLE_CHAT NEXT_PUBLIC_SITE_URL; do
    if grep -q "^${key}=" .env.local 2>/dev/null; then
      if ! ssh "$EC2_HOST" "grep -q '^${key}=' ~/bihospharma-web/.env.production 2>/dev/null"; then
        grep "^${key}=" .env.local | ssh "$EC2_HOST" "cat >> ~/bihospharma-web/.env.production"
      fi
    fi
  done
fi

# --- 4. Restart PM2 ---
echo "→ Restarting PM2…"
ssh "$EC2_HOST" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd $EC2_APP_DIR
  
  # Stop and delete old process, kill any orphan node processes on port 3000
  pm2 delete bihos 2>/dev/null || true
  sudo fuser -k 3000/tcp 2>/dev/null || true
  sleep 1
  
  # Start using ecosystem config for proper graceful shutdown support
  set -a && [ -f .env.production ] && . ./.env.production && set +a
  pm2 start ecosystem.config.js --update-env
  pm2 save
"

echo "✓ Deploy complete."
