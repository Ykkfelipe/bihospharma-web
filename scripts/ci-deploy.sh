#!/usr/bin/env bash
# CI deploy: build on GitHub runner, push to EC2. Never builds on the small server.
set -euo pipefail

LOCAL_APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$LOCAL_APP_DIR"

: "${EC2_HOST:?EC2_HOST is required}"
: "${EC2_USER:?EC2_USER is required}"
: "${EC2_SSH_KEY:?EC2_SSH_KEY is required}"

SSH_KEY_FILE="$(mktemp)"
trap 'rm -f "$SSH_KEY_FILE"' EXIT
printf '%s\n' "$EC2_SSH_KEY" > "$SSH_KEY_FILE"
chmod 600 "$SSH_KEY_FILE"

SSH_OPTS="-i $SSH_KEY_FILE -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
export SSH_TARGET="${EC2_USER}@${EC2_HOST}"
export RSYNC_SSH="ssh $SSH_OPTS"
export LOCAL_APP_DIR

echo "→ Building on CI runner (not on EC2)…"
set -a
export NEXTAUTH_URL="${NEXTAUTH_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://bihospharma.com}"
export NEXT_PUBLIC_ENABLE_CHAT="${NEXT_PUBLIC_ENABLE_CHAT:-true}"
set +a

npm ci --legacy-peer-deps
npm run build

bash "$LOCAL_APP_DIR/scripts/push-built-to-server.sh"

echo "→ Verifying health on EC2…"
ssh $SSH_OPTS "$SSH_TARGET" "curl -sf --max-time 10 http://127.0.0.1:3000/_health | head -c 200; echo; pm2 status bihos"
