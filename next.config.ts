/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        canvas: false, // Prevent "canvas" resolution error in react-pdf
      };
    }

    return config;
  },
};

export default nextConfig;
