import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: false }];
  },
};

export default withMDX(nextConfig);
