/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    // Available on both server and client
    theme: "DEFAULT",
  },
  images: {
    remotePatterns: [
      {
        hostname: "wecare.com.vn",
      },
      {
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
