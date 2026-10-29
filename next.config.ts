import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Masquer l'overlay de dev Next.js (badge "N Issues") pour des captures propres
  devIndicators: false,
};

export default nextConfig;
