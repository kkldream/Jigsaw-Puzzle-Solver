/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'julo-server.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
