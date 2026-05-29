# Portal database on EC2

Production portal data lives in **SQLite** on the server.

## Important paths (Prisma schema is in `prisma/`)

| File | Purpose |
|------|---------|
| `dev.db` (project root) | **Historical production DB** — 7 staff accounts, shifts, posts, login history |
| `prisma/prod.db` | **Active DB** — must stay in sync; app uses `DATABASE_URL=file:./prod.db` |

Prisma resolves `file:./prod.db` → `prisma/prod.db` (not the root `dev.db`).

## What went wrong (May 2026)

1. Staff had been logging in successfully while the app used the **root** `dev.db`.
2. `.env.production` was changed to `DATABASE_URL=file:./prisma/prod.db` (invalid path) → login broke for everyone.
3. After fixing the path to `file:./prod.db`, the app connected to an **empty** `prisma/prod.db` — it looked like users were “deleted”, but they were in the other file.

## Restore command (if this happens again)

```bash
ssh bihos "cd ~/bihospharma-web && cp dev.db prisma/prod.db && pm2 restart bihos"
```

Or run `./scripts/sync-portal-users-prod.sh` from your laptop (copies users from local dev only — does not copy shifts/posts).

## After deploy

Ensure `.env.production` contains:

```
DATABASE_URL=file:./prod.db
AUTH_URL=https://bihospharma.com
```

Never use `file:./prisma/prod.db`.
