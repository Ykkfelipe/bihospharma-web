#!/usr/bin/env bash
# deploy.sh — build on your Mac, sync pre-built output to EC2 (never builds on the server).
# Usage: ./deploy.sh   (or: deployb)
set -euo pipefail

LOCAL_APP_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "→ Building locally on this machine (not on EC2)…"
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

export LOCAL_APP_DIR
export SSH_TARGET="${SSH_TARGET:-bihos}"
bash "$LOCAL_APP_DIR/scripts/push-built-to-server.sh"

echo "✓ Deploy complete."
echo "  Build ran locally; EC2 only received the compiled .next output."
echo "  Watchdog restarts the app if it crashes — run deployb again to ship code changes."
