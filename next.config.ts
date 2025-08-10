import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Keep unoptimized while testing locally or if you plan to export statically.
    // If you will run a Node server (PM2/nginx), you can remove this later.
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Avoid bundling native 'canvas' in the server build (react-pdf dependency)
      config.externals = [...(config.externals || []), 'canvas'];
    } else {
      // Prevent client bundle from trying to polyfill Node modules
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;