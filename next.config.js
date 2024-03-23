/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.themealdb.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
