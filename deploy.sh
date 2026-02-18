#!/usr/bin/env bash
# deploy.sh — build locally, rsync to EC2, restart PM2
# Usage: ./deploy.sh
set -euo pipefail

EC2_HOST="bihos"
EC2_APP_DIR="$HOME/bihospharma-web"
LOCAL_APP_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- 1. Build locally ---
echo "→ Building locally…"
cd "$LOCAL_APP_DIR"
npm run build

# --- 2. Sync built output + source to EC2 ---
echo "→ Syncing to EC2…"
rsync -az --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  "$LOCAL_APP_DIR/" "$EC2_HOST:~/bihospharma-web/"

# --- 3. Install production deps on server (fast — no build) ---
echo "→ Installing production deps on server…"
ssh "$EC2_HOST" "cd $EC2_APP_DIR && npm ci --omit=dev --prefer-offline --no-audit 2>/dev/null || npm install --omit=dev --prefer-offline --no-audit"

# --- 4. Restart PM2 ---
echo "→ Restarting PM2…"
ssh "$EC2_HOST" "
  export NVM_DIR=\"\$HOME/.nvm\"
  [ -s \"\$NVM_DIR/nvm.sh\" ] && . \"\$NVM_DIR/nvm.sh\"
  cd $EC2_APP_DIR
  pm2 restart bihos --update-env || pm2 start npm --name bihos -- start -- -p 3000
  pm2 save
"

echo "✓ Deploy complete."
