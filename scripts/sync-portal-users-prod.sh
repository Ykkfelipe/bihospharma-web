#!/usr/bin/env bash
# Copy portal User rows from local dev.db to production prod.db (password hashes only).
# Usage: ./scripts/sync-portal-users-prod.sh
set -euo pipefail

EC2_HOST="${EC2_HOST:-bihos}"
LOCAL_DB="prisma/dev.db"

if [ ! -f "$LOCAL_DB" ]; then
  echo "❌ Missing $LOCAL_DB — run portal locally first or seed users."
  exit 1
fi

echo "→ Reading users from local dev.db…"
USERS_JSON=$(sqlite3 -json "$LOCAL_DB" "SELECT email, name, role, passwordHash FROM User;")

if [ "$USERS_JSON" = "[]" ] || [ -z "$USERS_JSON" ]; then
  echo "❌ No users in local database."
  exit 1
fi

echo "→ Syncing to production (hashes only, no plaintext passwords)…"
ssh "$EC2_HOST" "cd ~/bihospharma-web && export DATABASE_URL=file:./prod.db && node -e \"
const { PrismaClient } = require('@prisma/client');
const users = ${USERS_JSON};
const p = new PrismaClient();
(async () => {
  for (const u of users) {
    await p.user.upsert({
      where: { email: u.email },
      update: { passwordHash: u.passwordHash, name: u.name, role: u.role },
      create: { email: u.email, passwordHash: u.passwordHash, name: u.name, role: u.role },
    });
    console.log('synced:', u.email);
  }
  await p.\\\$disconnect();
})();
\""

echo "✓ Portal users synced to production."
