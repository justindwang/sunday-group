import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static HTML export for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Helps with Netlify routing
};

export default nextConfig;
