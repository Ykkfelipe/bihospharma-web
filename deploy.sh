#!/usr/bin/env bash
set -euo pipefail

# --- ensure Node 20 is used ---
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  if command -v node >/dev/null 2>&1 && node -v | grep -q '^v20\.'; then
    echo "→ Node v20 already available; skipping nvm install"
  else
    nvm install 20 || true
    nvm use 20 || true
  fi
else
  echo "→ nvm not installed; assuming system node is v20 or higher"
fi

APP_DIR="$HOME/bihospharma-web"
cd "$APP_DIR"

echo "→ Pulling latest code…"
git fetch origin main
git reset --hard origin/main

echo "→ Installing deps…"
npm ci --prefer-offline --no-audit

echo "→ Building…"
npm run build

echo "→ Restarting PM2…"
pm2 restart bihos --update-env || pm2 start npm --name bihos -- start -- -p 3000
pm2 save

echo "✓ Deploy complete."
