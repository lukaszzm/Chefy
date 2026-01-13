/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typedRoutes: true,
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
