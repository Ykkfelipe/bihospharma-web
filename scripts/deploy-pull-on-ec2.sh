#!/usr/bin/env bash
# Run ON the EC2 server when GitHub Actions cannot SSH in (security group blocks port 22).
# From your phone/laptop: ssh bihos 'bash ~/bihospharma-web/scripts/deploy-pull-on-ec2.sh'
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

cd ~/bihospharma-web

echo "→ Pulling main…"
git fetch origin main
git reset --hard origin/main

echo "→ Building on server (slower than CI; needs ~2GB free RAM)…"
set -a
[ -f .env.production ] && . ./.env.production
export NEXTAUTH_URL="${NEXTAUTH_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_ENABLE_CHAT="${NEXT_PUBLIC_ENABLE_CHAT:-true}"
set +a

npm ci --omit=dev --prefer-offline --no-audit --legacy-peer-deps 2>/dev/null \
  || npm install --omit=dev --prefer-offline --no-audit --legacy-peer-deps
npm run build

chmod +x scripts/deploy-on-ec2.sh
bash scripts/deploy-on-ec2.sh
