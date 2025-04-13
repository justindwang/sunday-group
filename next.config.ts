import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export to support API routes
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
