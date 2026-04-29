import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true
  },
  images: {
    domains: ['utfs.io']
  }
};

export default nextConfig;
