/** @type {import('next-sitemap').IConfig} */
// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteUrl = "http://localhost:3000";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/404", "/500", "/_app", "/_document", "/admin/*"],
  alternateRefs: [
    {
      href: `${siteUrl}/en`,
      hreflang: "en",
    },
    {
      href: `${siteUrl}/id`,
      hreflang: "id",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`, // dynamic
      `${siteUrl}/sitemap-0.xml`,      // static
    ],
    // additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },

  outDir: "./public",
};

