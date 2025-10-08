import webpack from 'webpack';

/**
 * Next.js config to avoid bundling native canvas from react-pdf/pdfjs on server.
 */
const nextConfig = {
  webpack: (config) => {
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
