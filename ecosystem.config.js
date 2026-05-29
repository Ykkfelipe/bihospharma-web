const fs = require('fs');
const path = require('path');

function loadEnvFile(filename) {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) return {};

  return fs.readFileSync(filePath, 'utf8').split('\n').reduce((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return acc;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return acc;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    acc[key] = value;
    return acc;
  }, {});
}

const prodEnv = loadEnvFile('.env.production');

const sharedEnv = {
  NODE_ENV: 'production',
  NEXTAUTH_URL: prodEnv.NEXTAUTH_URL || 'https://bihospharma.com',
  AUTH_URL: prodEnv.AUTH_URL || 'https://bihospharma.com',
  NEXTAUTH_SECRET: prodEnv.NEXTAUTH_SECRET || prodEnv.AUTH_SECRET,
  AUTH_SECRET: prodEnv.AUTH_SECRET || prodEnv.NEXTAUTH_SECRET,
  DATABASE_URL: prodEnv.DATABASE_URL || 'file:./prod.db',
  PORTAL_ACCESS_CODE: prodEnv.PORTAL_ACCESS_CODE,
  GROQ_API_KEY: prodEnv.GROQ_API_KEY,
  NEXT_PUBLIC_ENABLE_CHAT: prodEnv.NEXT_PUBLIC_ENABLE_CHAT,
  NEXT_PUBLIC_SITE_URL: prodEnv.NEXT_PUBLIC_SITE_URL || 'https://bihospharma.com',
  DATABASE_CONNECTION_TIMEOUT: prodEnv.DATABASE_CONNECTION_TIMEOUT || '30000',
  REQUEST_TIMEOUT_MS: prodEnv.REQUEST_TIMEOUT_MS || '30000',
};

module.exports = {
  apps: [{
    name: 'bihos',
    script: 'server.js',
    cwd: '/home/ec2-user/bihospharma-web',
    env: sharedEnv,

    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 8000,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    ignore_watch: ['node_modules', '.git', 'logs'],
    error_file: '/home/ec2-user/bihospharma-web/logs/error.log',
    out_file: '/home/ec2-user/bihospharma-web/logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    kill_timeout: 10000,
    shutdown_with_message: true,
    monitoring_interval: 1000,
  }, {
    name: 'bihos-cron',
    script: 'scripts/cron.js',
    cwd: '/home/ec2-user/bihospharma-web',
    env: sharedEnv,
    cron_restart: '0 0 * * *',
    autorestart: false,
    instances: 1,
    exec_mode: 'fork',
    error_file: '/home/ec2-user/bihospharma-web/logs/cron-error.log',
    out_file: '/home/ec2-user/bihospharma-web/logs/cron-output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }],
};
