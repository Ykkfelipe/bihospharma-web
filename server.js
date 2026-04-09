const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    // Tell PM2 we are ready (for wait_ready mode)
    if (process.send) process.send('ready');
  });

  // Graceful shutdown — close the server so port 3000 is released
  const shutdown = (signal) => {
    console.log(`> Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      console.log('> Server closed.');
      process.exit(0);
    });
    // Force exit after 5 seconds if server.close() hangs
    setTimeout(() => {
      console.error('> Forced exit after timeout.');
      process.exit(1);
    }, 5000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  server.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
});