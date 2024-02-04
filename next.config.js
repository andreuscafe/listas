/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pbs.twimg.com"]
  },
  redirects: async () => {
    return [
      {
        source: "/sign-in/:slug",
        destination: "/sign-up",
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
