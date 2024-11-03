/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(__dirname, "src"),
    };
    return config;
  },
  // Configuraciones adicionales que podrías necesitar
  experimental: {
    // Habilita características experimentales si las necesitas
    serverActions: true,
  },
  typescript: {
    // Para ignorar errores de TS durante el build si los necesitas
    // ignoreBuildErrors: true,
  },
  eslint: {
    // Para ignorar errores de ESLint durante el build si los necesitas
    // ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
