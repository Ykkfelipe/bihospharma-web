#!/usr/bin/env bash
# Saves the current production build on EC2 before a new deploy.
# Run on the server, or: ssh bihos 'bash -s' < scripts/pre-deploy-backup.sh
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/bihospharma-web}"
BACKUP_ROOT="$APP_DIR/.deploy-backups"
STAMP="$(date +%Y%m%d-%H%M%S)"
DEST="$BACKUP_ROOT/$STAMP"

mkdir -p "$BACKUP_ROOT"

if [ ! -d "$APP_DIR/.next" ] || [ ! -f "$APP_DIR/.next/BUILD_ID" ]; then
  echo "⚠ No .next build to back up — skipping."
  exit 0
fi

mkdir -p "$DEST"
cp -a "$APP_DIR/.next" "$DEST/.next"

if [ -f "$APP_DIR/prisma/prod.db" ]; then
  cp -a "$APP_DIR/prisma/prod.db" "$DEST/prod.db"
  echo "  (backed up prisma/prod.db — live SQLite DB)"
elif [ -f "$APP_DIR/prod.db" ]; then
  cp -a "$APP_DIR/prod.db" "$DEST/prod.db"
fi

echo "$STAMP" > "$BACKUP_ROOT/LATEST"
echo "$STAMP" >> "$BACKUP_ROOT/history.log"

# Keep the 5 most recent backups
ls -1dt "$BACKUP_ROOT"/[0-9]* 2>/dev/null | tail -n +6 | while read -r old; do
  rm -rf "$old"
done

echo "✓ Pre-deploy backup saved: $DEST"
