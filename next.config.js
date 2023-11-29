/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s199.imacdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
