#!/usr/bin/env bash
# Restore the last pre-deploy backup on EC2 (fast rollback without rebuilding).
# Usage on server:
#   bash ~/bihospharma-web/scripts/rollback-production.sh
#   bash ~/bihospharma-web/scripts/rollback-production.sh 20260605-143022
#
# From your Mac:
#   ./rollbackb
#   ./rollbackb 20260605-143022
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/bihospharma-web}"
BACKUP_ROOT="$APP_DIR/.deploy-backups"

if [ ! -d "$BACKUP_ROOT" ]; then
  echo "❌ No backups found at $BACKUP_ROOT"
  exit 1
fi

STAMP="${1:-}"
if [ -z "$STAMP" ]; then
  if [ ! -f "$BACKUP_ROOT/LATEST" ]; then
    echo "❌ No LATEST backup marker. Pass a backup folder name:"
    ls -1dt "$BACKUP_ROOT"/[0-9]* 2>/dev/null || true
    exit 1
  fi
  STAMP="$(cat "$BACKUP_ROOT/LATEST")"
fi

DEST="$BACKUP_ROOT/$STAMP"
if [ ! -d "$DEST/.next" ]; then
  echo "❌ Backup not found: $DEST"
  exit 1
fi

echo "→ Restoring backup $STAMP"
rm -rf "$APP_DIR/.next"
cp -a "$DEST/.next" "$APP_DIR/.next"

if [ -f "$DEST/prod.db" ]; then
  cp -a "$DEST/prod.db" "$APP_DIR/prod.db"
  echo "→ Restored prod.db from backup"
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh"
fi

cd "$APP_DIR"
pm2 restart bihos --update-env || pm2 start ecosystem.config.js --only bihos --update-env
pm2 save 2>/dev/null || true

if curl -sf -o /dev/null http://127.0.0.1:3000/; then
  echo "✓ Rollback complete — app responding on :3000"
else
  echo "⚠ Rollback applied but health check failed — run: pm2 logs bihos --lines 40"
  exit 1
fi
