# Self-hosted GitHub Actions runner (recommended)

This is the **best setup** for Bihospharma: deploy on push without your Mac, without opening EC2 SSH to all GitHub cloud IPs, and without building on the small server from a broken `~/deploy.sh`.

## Why

| Approach | Crash risk | Works without Mac |
|----------|------------|-------------------|
| Old `~/deploy.sh` on EC2 | High (PM2 restart loops) | Yes |
| Cloud runner + SSH/rsync | Low if SSH works | Blocked by security group today |
| **Self-hosted runner on EC2** | Low (same scripts as Mac deploy) | **Yes** |
| Mac `./deploy.sh` | Low | No |

## One-time install on EC2

1. GitHub repo → **Settings → Actions → Runners → New self-hosted runner** → Linux → copy the token.
2. On EC2 as `ec2-user`:

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64-2.322.0.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.322.0/actions-runner-linux-x64-2.322.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.322.0.tar.gz
./config.sh --url https://github.com/Ykkfelipe/bihospharma-web \
  --token PASTE_TOKEN_HERE \
  --labels bihospharma --name ec2-bihos
sudo ./svc.sh install ec2-user
sudo ./svc.sh start
```

3. Disable or delete the cloud workflow’s auto-deploy if you only want self-hosted: edit `.github/workflows/deploy.yml` and remove the `push:` trigger (keep `workflow_dispatch` for backup).

4. Use workflow **“Deploy (self-hosted runner)”** — runs on push to `main` once the runner is online.

## Already on the server

- **Watchdog** (`bihos-watchdog`): restarts PM2 if health check fails (no server build).
- **`scripts/deploy-on-ec2.sh`**: clean `pm2 delete` + start after deploy.
- **Do not run** `~/deploy.sh`.
