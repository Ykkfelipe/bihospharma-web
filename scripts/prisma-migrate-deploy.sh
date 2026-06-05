#!/usr/bin/env bash
# Run Prisma migrate deploy with the project-pinned CLI (Prisma 7 breaks our schema).
set -euo pipefail

PRISMA_VERSION="${PRISMA_VERSION:-5.22.0}"
SCHEMA="${1:-./prisma/schema.prisma}"

if [ -z "${DATABASE_URL:-}" ]; then
  if [ -f .env.production ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env.production
    set +a
  elif [ -f .env.local ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env.local
    set +a
  fi
fi

echo "→ prisma@${PRISMA_VERSION} migrate deploy (${DATABASE_URL:-no DATABASE_URL})"
npx --yes "prisma@${PRISMA_VERSION}" migrate deploy --schema="$SCHEMA"
