const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT_MS || '30000', 10);
const HEAP_WARN_PERCENT = parseFloat(process.env.HEAP_WARN_PERCENT || '85');
const HEAP_UNHEALTHY_PERCENT = parseFloat(process.env.HEAP_UNHEALTHY_PERCENT || '95');
const RSS_UNHEALTHY_MB = parseFloat(process.env.RSS_UNHEALTHY_MB || '900');

let activeRequests = 0;
let isShuttingDown = false;
let isAppReady = false;
let lastRecoverableExceptionAt = 0;

function memorySnapshot() {
  const mem = process.memoryUsage();
  const heapUsedPercent =
    mem.heapTotal > 0 ? (mem.heapUsed / mem.heapTotal) * 100 : 0;
  return {
    ...mem,
    heapUsedPercent,
    rssMb: mem.rss / 1024 / 1024,
  };
}

function shouldRejectSuspiciousRequest(req) {
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'POST') return false;

  const pathname = parse(req.url || '/', true).pathname || '/';

  // Scanner paths seen in nginx logs for React Flight RCE probes.
  if (/^\/RSC\//i.test(pathname)) return true;
  if (pathname === '/_next/static/chunks/react-flight') return true;
  if (pathname === '/_next/on-demand-entries-ping') return true;

  // Bare POST / without a Server Action header is not used by this app.
  if (pathname === '/') {
    const actionHeader = req.headers['next-action'] || req.headers['Next-Action'];
    if (!actionHeader) return true;
  }

  return false;
}

function isRecoverableUncaughtException(err) {
  const msg = err && (err.message || String(err));
  if (!msg) return false;

  // Long-standing Next/runtime abort noise on this deployment — not fatal for the process.
  if (/kill\[[^\]]+\] is not a function/i.test(msg)) return true;
  if (/AbortError/i.test(msg)) return true;
  if (/This operation was aborted/i.test(msg)) return true;

  return false;
}

app.prepare().then(() => {
  isAppReady = true;

  const server = createServer(async (req, res) => {
    if (req.url === '/_health' && req.method === 'GET') {
      const mem = memorySnapshot();
      // Node often reports 90–97% heap used with a small RSS; use RSS for liveness, not heap ratio.
      const healthy = isAppReady && !isShuttingDown && mem.rssMb < RSS_UNHEALTHY_MB;

      res.writeHead(healthy ? 200 : 503, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          status: healthy ? 'ok' : 'degraded',
          ready: isAppReady,
          uptime: process.uptime(),
          memory: mem,
          activeRequests,
          shuttingDown: isShuttingDown,
        })
      );
      return;
    }

    if (isShuttingDown) {
      res.statusCode = 503;
      res.setHeader('Retry-After', '5');
      res.end('Server is shutting down');
      return;
    }

    if (shouldRejectSuspiciousRequest(req)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    activeRequests++;

    let timeoutId;
    try {
      timeoutId = setTimeout(() => {
        if (!res.headersSent) {
          res.statusCode = 504;
          res.end('Gateway Timeout - Request took too long');
        }
      }, REQUEST_TIMEOUT);

      const parsedUrl = parse(req.url, true);

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
        res.end(
          JSON.stringify({
            error: 'Internal server error',
            message: dev ? err.message : 'An error occurred',
          })
        );
      }
    } finally {
      activeRequests--;
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Request timeout: ${REQUEST_TIMEOUT}ms`);
    console.log(`> Health check available at http://${hostname}:${port}/_health`);

    if (process.send) process.send('ready');
  });

  const shutdown = (signal) => {
    console.log(`\n> Received ${signal}, initiating graceful shutdown...`);
    isShuttingDown = true;

    server.close(() => {
      console.log('> Server closed, no longer accepting new connections.');
      process.exit(0);
    });

    const shutdownNSTimer = setInterval(() => {
      if (activeRequests === 0) {
        clearInterval(shutdownNSTimer);
        console.log('> All active requests completed.');
        process.exit(0);
      } else {
        console.log(`> Waiting for ${activeRequests} active request(s) to complete...`);
      }
    }, 1000);

    setTimeout(() => {
      console.error('> Forced shutdown timeout reached. Exiting.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('uncaughtException', (err) => {
    console.error('> Uncaught Exception:', err);

    if (isRecoverableUncaughtException(err)) {
      const now = Date.now();
      if (now - lastRecoverableExceptionAt > 60000) {
        console.error('> Recoverable uncaught exception — keeping process alive');
      }
      lastRecoverableExceptionAt = now;
      return;
    }

    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('> Unhandled Rejection at:', promise, 'reason:', reason);
  });

  server.on('error', (err) => {
    console.error('> Server error:', err);
    if (err && err.code === 'EADDRINUSE') {
      process.exit(1);
    }
  });

  setInterval(() => {
    const mem = memorySnapshot();
    if (mem.heapUsedPercent > HEAP_WARN_PERCENT) {
      console.warn(
        `> WARNING: High memory usage (${mem.heapUsedPercent.toFixed(2)}% heap, ${mem.rssMb.toFixed(0)}MB RSS)`
      );
    }
  }, 30000);
});
