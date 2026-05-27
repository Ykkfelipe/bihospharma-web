module.exports = {
  apps: [{
    name: 'bihos',
    script: 'server.js',
    cwd: '/home/ec2-user/bihospharma-web',
    env: {
      NODE_ENV: 'production',
      NEXTAUTH_URL: 'https://bihospharma.com',
      AUTH_URL: 'https://bihospharma.com/api/auth',
      NEXTAUTH_SECRET: 'b156f4bf04976b13aacc15524fd7127a30932c87df70d0a4de0ae5b72c2d2515',
      AUTH_SECRET: 'b156f4bf04976b13aacc15524fd7127a30932c87df70d0a4de0ae5b72c2d2515'
    },
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 8000,
    max_restarts: 5,
    min_uptime: '10s',
    autorestart: true
  }, {
    name: 'bihos-cron',
    script: 'scripts/cron.js',
    cwd: '/home/ec2-user/bihospharma-web',
    cron_restart: '0 0 * * *',
    autorestart: false,
    instances: 1,
    exec_mode: 'fork'
  }]
};
