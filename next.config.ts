import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://nsa.edu/api/media/file/**')],
  },
};

export default nextConfig;
