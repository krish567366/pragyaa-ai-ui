/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/VoiceAgent",
        permanent: false,
        basePath: false
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.deepgram.com",
        port: "",
        pathname: "/examples/avatars/**",
      },
    ],
  },
};

export default nextConfig;
