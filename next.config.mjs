/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
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
