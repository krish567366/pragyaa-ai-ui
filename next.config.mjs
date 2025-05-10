/** @type {import('next').NextConfig} */

// Define Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' https://assets.calendly.com 'unsafe-inline' 'unsafe-eval';
  style-src 'self' https://assets.calendly.com 'unsafe-inline'; 
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self' https://calendly.com;
  frame-src 'self' https://calendly.com;
`.replace(/\s{2,}/g, ' ').trim(); // Format CSP string

const nextConfig = {
  basePath: "",
  output: 'standalone',
  async headers() { // Add headers function
    return [
      {
        source: '/:path*', // Apply CSP to all paths
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy,
          },
        ],
      },
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
