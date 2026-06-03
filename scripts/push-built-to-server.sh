#!/usr/bin/env bash
# Sync a pre-built app to EC2 and restart PM2. Never runs npm run build on the server.
# Used by deploy.sh / deployb (Mac) and scripts/ci-deploy.sh (GitHub Actions).
set -euo pipefail

LOCAL_APP_DIR="${LOCAL_APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
SSH_TARGET="${SSH_TARGET:-bihos}"
EC2_APP_DIR="${EC2_APP_DIR:-/home/ec2-user/bihospharma-web}"
RSYNC_SSH="${RSYNC_SSH:-ssh}"

remote() {
  if [ "$RSYNC_SSH" = "ssh" ]; then
    ssh "$SSH_TARGET" "$@"
  else
    $RSYNC_SSH "$SSH_TARGET" "$@"
  fi
}

rsync_to_server() {
  rsync -az -e "$RSYNC_SSH" "$@"
}

echo "→ Syncing built output to ${SSH_TARGET}:~/bihospharma-web/"
cd "$LOCAL_APP_DIR"

npx prisma generate

rsync_to_server \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dev.db' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='public/uploads' \
  --exclude='remediation-log' \
  "$LOCAL_APP_DIR/" "${SSH_TARGET}:~/bihospharma-web/"

rsync_to_server \
  "$LOCAL_APP_DIR/node_modules/.prisma/" "${SSH_TARGET}:~/bihospharma-web/node_modules/.prisma/"

echo "→ Installing production deps on server (no build)…"
remote "cd ~/bihospharma-web && npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps"

echo "→ Generating Prisma client on server…"
remote "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd ~/bihospharma-web
  rm -f ~/package-lock.json ~/package.json 2>/dev/null || true
  prisma generate --schema=./prisma/schema.prisma 2>/dev/null || npx --yes prisma@5.22.0 generate --schema=./prisma/schema.prisma
"

echo "→ Applying database migrations on server…"
remote "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd $EC2_APP_DIR
  set -a && [ -f .env.production ] && . ./.env.production && set +a
  npx prisma migrate deploy 2>/dev/null || npx prisma db push 2>/dev/null || true
"

echo "→ Verifying server .env.production…"
remote "cd ~/bihospharma-web && touch .env.production && chmod 600 .env.production && \
  sed -i 's|^DATABASE_URL=file:./prisma/prod.db|DATABASE_URL=file:./prod.db|' .env.production && \
  sed -i 's|^AUTH_URL=https://bihospharma.com/api/auth|AUTH_URL=https://bihospharma.com|' .env.production && \
  if [ -f dev.db ] && [ ! -s prisma/prod.db ] 2>/dev/null; then cp dev.db prisma/prod.db; fi"

if [ -f "$LOCAL_APP_DIR/.env.local" ]; then
  echo "→ Ensuring server .env.production has chat vars (if missing)…"
  remote "touch ~/bihospharma-web/.env.production && chmod 600 ~/bihospharma-web/.env.production"
  for key in GROQ_API_KEY NEXT_PUBLIC_ENABLE_CHAT NEXT_PUBLIC_SITE_URL; do
    if grep -q "^${key}=" "$LOCAL_APP_DIR/.env.local" 2>/dev/null; then
      if ! remote "grep -q '^${key}=' ~/bihospharma-web/.env.production 2>/dev/null"; then
        grep "^${key}=" "$LOCAL_APP_DIR/.env.local" | remote "cat >> ~/bihospharma-web/.env.production"
      fi
    fi
  done
fi

echo "→ Restarting PM2…"
remote "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd $EC2_APP_DIR
  pm2 delete bihos 2>/dev/null || true
  sudo fuser -k 3000/tcp 2>/dev/null || true
  sleep 1
  set -a && [ -f .env.production ] && . ./.env.production && set +a
  pm2 start ecosystem.config.js --update-env
  pm2 restart bihos-watchdog --update-env 2>/dev/null || pm2 start ecosystem.config.js --only bihos-watchdog --update-env
  pm2 save
"

echo "✓ Server updated with pre-built artifacts."
