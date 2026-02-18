/**
 * Next.js config — performance optimized
 */
const nextConfig = {
  // Serve images as AVIF/WebP automatically
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Empty turbopack config to silence Next.js 16 warning when building locally
  turbopack: {},

  // Long-lived cache headers for static assets
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/logos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  webpack: (config, { webpack }) => {
    // Ensure objects exist
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Prevent Webpack from trying to bundle native canvas binary used by pdfjs in Node
      canvas: false,
    };

    // Also mark it as external just in case any deep dependency tries to require it
    config.externals = Array.isArray(config.externals)
      ? [...config.externals, 'canvas']
      : config.externals;

    // Fallback for any node core usage (defensive)
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      canvas: false,
    };

    // Ignore any native .node binaries (like canvas/build/Release/canvas.node)
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /\.node$/ }));

    return config;
  },
};

export default nextConfig;
