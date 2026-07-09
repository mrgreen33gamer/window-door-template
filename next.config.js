// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Admin subdomain rewrites ───────────────────────────────────────────────
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'admin.scottapplications.com' }],
          destination: '/admin/:path*',
        },
        {
          source: '/:path*',
          has: [{ type: 'host', value: 'admin.localhost' }],
          destination: '/admin/:path*',
        },
      ],
    };
  },

  // ── Images ────────────────────────────────────────────────────────────────
  images: {
    // FIXED: localPatterns required by Next.js 16 for local images.
    // Omitting `search` entirely allows ALL query strings (e.g. ?v=1, ?v=7).
    // Next.js 16 docs: "Omitting the search property allows all search parameters."
    // Note: search: '*' is NOT valid — globs are not supported for the search field.
    localPatterns: [
      {
        pathname: '/**',
        // search intentionally omitted → allows ?v=1, ?v=7, etc.
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
