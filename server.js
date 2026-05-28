const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Request timeout configuration (in milliseconds)
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT_MS || '30000');

// Track active requests for graceful shutdown
let activeRequests = 0;
let isShuttingDown = false;

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    // Reject new requests during shutdown
    if (isShuttingDown) {
      res.statusCode = 503;
      res.setHeader('Retry-After', '5');
      res.end('Server is shutting down');
      return;
    }

    activeRequests++;

    try {
      // Set timeout for individual requests
      const timeoutId = setTimeout(() => {
        if (!res.headersSent) {
          res.statusCode = 504;
          res.end('Gateway Timeout - Request took too long');
        }
      }, REQUEST_TIMEOUT);

      const parsedUrl = parse(req.url, true);
      
      // Add response listener to clear timeout
      res.on('finish', () => {
        clearTimeout(timeoutId);
      });

      res.on('close', () => {
        clearTimeout(timeoutId);
      });

      await handle(req, res, parsedUrl);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('[Server] Error occurred handling', req.url, err);
      
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end(JSON.stringify({
          error: 'Internal server error',
          message: dev ? err.message : 'An error occurred',
        }));
      }
    } finally {
      activeRequests--;
    }
  });

  // Health check endpoint at /_health
  server.on('request', (req, res) => {
    if (req.url === '/_health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ok',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        activeRequests,
      }));
      return;
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Request timeout: ${REQUEST_TIMEOUT}ms`);
    console.log(`> Health check available at http://${hostname}:${port}/_health`);
    
    // Tell PM2 we are ready (for wait_ready mode)
    if (process.send) process.send('ready');
  });

  /**
   * Graceful shutdown — close the server and wait for active requests to complete
   */
  const shutdown = (signal) => {
    console.log(`\n> Received ${signal}, initiating graceful shutdown...`);
    isShuttingDown = true;

    server.close(() => {
      console.log('> Server closed, no longer accepting new connections.');
      process.exit(0);
    });

    // Wait for active requests to finish (max 10 seconds)
    const shutdownNSTimer = setInterval(() => {
      if (activeRequests === 0) {
        clearInterval(shutdownNSTimer);
        console.log('> All active requests completed.');
        process.exit(0);
      } else {
        console.log(`> Waiting for ${activeRequests} active request(s) to complete...`);
      }
    }, 1000);

    // Force exit after timeout
    setTimeout(() => {
      console.error('> Forced shutdown timeout reached. Exiting.');
      process.exit(1);
    }, 10000);
  };

  // Handle shutdown signals
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('> Uncaught Exception:', err);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('> Unhandled Rejection at:', promise, 'reason:', reason);
    // Continue running but log for monitoring
  });

  server.on('error', (err) => {
    console.error('> Server error:', err);
    process.exit(1);
  });

  // Monitor memory usage and log warnings
  setInterval(() => {
    const mem = process.memoryUsage();
    const heapUsedPercent = (mem.heapUsed / mem.heapTotal) * 100;
    
    if (heapUsedPercent > 85) {
      console.warn(`> WARNING: High memory usage (${heapUsedPercent.toFixed(2)}%)`);
    }
  }, 30000);
});
