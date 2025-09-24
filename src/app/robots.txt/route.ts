import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const content = `
# Robots
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

# Host
Host: ${baseUrl}

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
