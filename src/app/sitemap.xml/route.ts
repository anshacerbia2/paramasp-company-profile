import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://paramasp.com";

  const sitemaps = [
    `${baseUrl}/sitemap-0.xml`, // hanya sitemap statis
  ];

  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map((loc) => `<sitemap><loc>${loc}</loc></sitemap>`)
        .join("\n")}
    </sitemapindex>
  `.trim();

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
