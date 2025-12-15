Deployment guide for EC2
=========================

This project includes a `prepare-deploy` script that packages the production build into `deploy-ready` and zips it.

Quick steps (recommended):

- Locally (on your workstation / CI):
  1. Ensure a successful production build: `npm ci && npm run build`
  2. Create a deploy artifact: `npm run prepare-deploy` (this creates `bihospharma-deploy.zip`)

- On the EC2 instance (assumes Ubuntu/Debian; adapt for Amazon Linux):
  1. Install Node.js 20.x (example using NodeSource):
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt-get install -y nodejs build-essential
     ```
  2. Install a process manager (recommended): `sudo npm install -g pm2`
  3. Upload the `bihospharma-deploy.zip` to EC2 (scp, rsync, or S3 + curl)
  4. Unzip and install production dependencies:
     ```bash
     unzip bihospharma-deploy.zip -d bihospharma-deploy
     cd bihospharma-deploy
     npm ci --production
     ```
  5. Start the app with `pm2` (example):
     ```bash
     pm2 start server.js --name bihospharma --update-env --node-args="--perf-basic-prof"
     pm2 save
     pm2 startup systemd # run the printed command to enable on boot
     ```
  6. Configure a reverse proxy with Nginx to serve on port 80/443 and proxy to the Node app on `localhost:3000`. Example Nginx server block:
     ```nginx
     server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
         proxy_pass http://127.0.0.1:3000;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
       }
     }
     ```
     (Then enable HTTPS with Certbot or your preferred cert manager.)

Security & Integrity checklist
- Verify Node version is compatible with `package.json` engines (Node 20 tested here).
- On the server: run `npm ci` on the deploy artifact (it will install packages from npm registry, not from local machine).
- Validate the `node_modules/next/dist/server/require-hook.js` does not contain injected code before starting the server (quick grep for `xorDecode`/`location` if you want an extra check):
  ```bash
  grep -n "xorDecode\|location is not defined" node_modules/next/dist/server/require-hook.js || true
  ```
- Rotate deploy keys and check CI logs if you suspect prior tampering on the build host.

Optional: Deploy with Docker
- Build a Docker image in CI that runs `npm ci --production` and `npm run build` during the image build; run the container on EC2 or ECS with a reverse proxy in front.

If you'd like, I can:
- Generate `bihospharma-deploy.zip` now and show where it lives, or
- Prepare a server-side `systemd` unit and Nginx config files in the repo for you to copy, or
- Help run the upload and start steps on your EC2 instance if you add access details.

Recommended workflow — commit & redeploy

- Make the change in a branch or on `main`, run the build and tests locally, then push:
  ```bash
  git checkout -b fix/deploy-script
  # make changes (e.g. add/modify deploy.sh)
  npm ci && npm run build
  git add deploy.sh DEPLOY.md
  git commit -m "deploy: add idempotent deploy.sh that skips nvm when node v20 present"
  git push origin HEAD
  # open a PR if you prefer code review, or merge to main
  git checkout main && git merge --no-ff fix/deploy-script && git push origin main
  ```

- On the EC2 host (example steps to update the server script and run):
  ```bash
  # pull the latest repo and copy the new script to home
  ssh -i ~/.ssh/KeywebBihosNodejs.pem ec2-user@54.82.38.23 \
    "cd ~/bihospharma-web && git fetch origin main && git reset --hard origin/main && cp deploy.sh ~/deploy.sh && chmod +x ~/deploy.sh"

  # run the deploy script
  ssh -i ~/.ssh/KeywebBihosNodejs.pem ec2-user@54.82.38.23 "~/deploy.sh"
  ```

This ensures your `deploy.sh` lives in the repository (traceable, reviewed) and the EC2 host runs the exact committed version when you redeploy.
