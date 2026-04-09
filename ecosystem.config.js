module.exports = {
  apps: [{
    name: 'bihos',
    script: 'server.js',
    cwd: '/home/ec2-user/bihospharma-web',
    env: {
      NODE_ENV: 'production',
      NEXTAUTH_URL: 'https://bihospharma.com',
      AUTH_URL: 'https://bihospharma.com/api/auth',
      NEXTAUTH_SECRET: 'super-secure-bihospharma-secret-2026-production',
      AUTH_SECRET: 'super-secure-bihospharma-secret-2026-production'
    },
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 8000,
    max_restarts: 5,
    min_uptime: '10s',
    autorestart: true
  }]
};
