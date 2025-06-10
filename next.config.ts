import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains — если тебе нужно только http://localhost:1337
    domains: ['localhost'],

    // remotePatterns — более гибко, если нужен порт/путь (лучший вариант для dev!)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
