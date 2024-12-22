import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb", // Increase the body size limit to 10 MB
    },
  },
  webpack(config) {
    return config;
  },
};

export default withNextIntl(nextConfig);

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
