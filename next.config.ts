import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  redirects: async () => [
    { source: "/wiki", destination: "/", permanent: true },
    { source: "/skills", destination: "/spells/", permanent: true },
    { source: "/all-spells", destination: "/spells/", permanent: true },
    { source: "/gamepass", destination: "/gamepasses/", permanent: true },
    { source: "/discord-server", destination: "/discord/", permanent: true },
    { source: "/reborn-vs-original", destination: "/differences/", permanent: true }
  ]
};

export default nextConfig;
