import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // output: "standalone",
  reactStrictMode: false,
  // Prevent metadata streamed on the body
  htmlLimitedBots: /.*/,
  // Image optimization
  images: {
    formats: ["image/webp"], // AVIF optional, bisa dihapus kalau ingin lebih cepat
    deviceSizes: [320, 480, 768, 1024, 1920], // mobile → tablet → desktop
    imageSizes: [64, 256, 512, 768, 1024], // small → medium → hero
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days cache
    dangerouslyAllowSVG: false,
    unoptimized: false,
  },

  // Fine-grained headers for performance & security
  async headers() {
    return [
      // --- 1) Very long cache for build-hashed static files
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
          // Compression is handled by server (brotli/gzip)
        ],
      },

      // --- 2) Next Image optimizer URLs (allow CDN/browser caching)
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            // value: "public, max-age=604800, s-maxage=604800",
            value: "public, max-age=604800",
          }, // 7 days
        ],
      },

      // --- 3) Static public assets (images/fonts/icons)
      {
        source: "/:all*.(jpg|jpeg|png|gif|svg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, s-maxage=604800",
          }, // 7 days
        ],
      },
      {
        source: "/:all*.(css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
        ],
      },
      {
        source: "/:all*.(woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000",
          },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },

      // --- 4) API routes: short/no-cache (dynamic)
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
      },

      // --- 5) HTML pages (allow CDN short caching, preserve freshness)
      // Use a short s-maxage so CDNs can cache, but content remains fresh
      {
        source: "/(.*)",
        headers: [
          // prefer CDN caching for speed but force revalidation frequently
          {
            key: "Cache-Control",
            value: "public, max-age=60, s-maxage=600, must-revalidate",
          },

          // Security headers
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // CSP: keep conservative, avoid blocking necessary inline for Next; adjust if you use inline scripts/styles
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; connect-src 'self' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data:;",
          },
        ].concat(
          // HSTS only in production
          isProd
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []
        ),
      },
    ];
  },

  // Other production-friendly optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Optional: tweak server http agent options (keep-alive)
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default withNextIntl(nextConfig);
