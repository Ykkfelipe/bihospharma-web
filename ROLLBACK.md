# Production rollback

Every deploy via `./deployb` now saves a snapshot on EC2 **before** syncing new code.

## Fast rollback (recommended)

Restores the previous `.next` build (and `prod.db` if it was backed up). Takes about a minute.

```bash
./rollbackb
```

To restore a specific backup:

```bash
ssh bihos 'ls -1dt ~/bihospharma-web/.deploy-backups/[0-9]*'
./rollbackb 20260605-143022
```

## Full rollback (git)

If you need the exact previous source release (not just the last backup):

```bash
git fetch --tags
git checkout production-backup-2026-06-05   # tag created before this release
./deployb
git checkout main
```

## Notes

- Backups live on EC2 at `~/bihospharma-web/.deploy-backups/` (last 5 kept).
- The **first** deploy after adding this feature creates the first backup on the **next** deploy after that.
- Database migrations are not automatically reversed. If a migration causes issues, restore `prod.db` from backup or contact support before re-deploying an older app version.
