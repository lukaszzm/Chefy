/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
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

export default nextConfig;
