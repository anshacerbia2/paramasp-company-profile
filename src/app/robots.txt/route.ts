import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.SITE_URL || "https://paramasp.com";

  const content = `
# Robots
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
