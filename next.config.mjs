/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignorar módulos de Node.js en el cliente
      config.externals = ['formidable'];
    }

    return config;
  },
};

export default nextConfig;
