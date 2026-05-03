import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-quests-images.s3.ca-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
