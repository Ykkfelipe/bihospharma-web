const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.production') });

const sharedEnv = {
  NODE_ENV: 'production',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://bihospharma.com',
  AUTH_URL: process.env.AUTH_URL || 'https://bihospharma.com',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  AUTH_SECRET: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL || 'file:./prod.db',
  PORTAL_ACCESS_CODE: process.env.PORTAL_ACCESS_CODE,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  NEXT_PUBLIC_ENABLE_CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://bihospharma.com',
  DATABASE_CONNECTION_TIMEOUT: process.env.DATABASE_CONNECTION_TIMEOUT || '30000',
  REQUEST_TIMEOUT_MS: process.env.REQUEST_TIMEOUT_MS || '30000',
};

module.exports = {
  apps: [{
    name: 'bihos',
    script: 'server.js',
    cwd: '/home/ec2-user/bihospharma-web',
    env: sharedEnv,
    
    // Graceful restart configuration
    wait_ready: true,
    listen_timeout: 10000,
    kill_timeout: 8000,
    
    // Auto-restart on crashes
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Memory leak protection — restart if memory exceeds 500MB
    max_memory_restart: '500M',
    
    // Instance management
    instances: 1,
    exec_mode: 'fork',
    
    // Process monitoring and recovery
    watch: false, // Disable watch mode in production
    ignore_watch: ['node_modules', '.git', 'logs'],
    
    // Error/output logging
    error_file: '/home/ec2-user/bihospharma-web/logs/error.log',
    out_file: '/home/ec2-user/bihospharma-web/logs/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Graceful shutdown
    kill_timeout: 10000,
    shutdown_with_message: true,
    
    // Health check and monitoring
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
  }]
};
