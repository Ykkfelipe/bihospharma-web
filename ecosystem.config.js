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
      AUTH_SECRET: 'b156f4bf04976b13aacc15524fd7127a30932c87df70d0a4de0ae5b72c2d2515',
      // Database retry configuration
      DATABASE_CONNECTION_TIMEOUT: '30000',
      // Enable request timeout recovery
      REQUEST_TIMEOUT_MS: '30000'
    },
    
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
    cron_restart: '0 0 * * *',
    autorestart: false,
    instances: 1,
    exec_mode: 'fork',
    error_file: '/home/ec2-user/bihospharma-web/logs/cron-error.log',
    out_file: '/home/ec2-user/bihospharma-web/logs/cron-output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
};
