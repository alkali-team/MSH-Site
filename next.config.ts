import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Lets `next dev` serve its JS chunks to a phone hitting the LAN IP
  // instead of localhost — otherwise it 403s them and the page loads with
  // no hydration at all (HTML/CSS fine, everything interactive dead).
  allowedDevOrigins: ["192.168.0.26"],
};

export default nextConfig;
