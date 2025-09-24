import { NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import {
  NEWS_NAVIGATION_KEYS,
  SERVICES_NAVIGATION_KEYS,
  STATIC_NAVIGATION_KEYS,
} from "@/constants/navigation";

export async function GET() {
  const locales = routing.locales; // daftar locale
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Generate URL untuk static pages
  const staticUrls = locales.flatMap((locale) =>
    STATIC_NAVIGATION_KEYS.map((page) => {
      const path = page ? `/${page}` : "";
      return `${baseUrl}/${locale}${path}`;
    })
  );

  // Generate URL untuk services pages
  const servicesUrls = locales.flatMap((locale) =>
    SERVICES_NAVIGATION_KEYS.map(
      (slug) => `${baseUrl}/${locale}/services/${slug}`
    )
  );

  // Generate URL untuk news pages
  const newsUrls = locales.flatMap((locale) =>
    NEWS_NAVIGATION_KEYS.map((slug) => `${baseUrl}/${locale}/news/${slug}`)
  );

  // Gabungkan semua URL
  const urls = [...staticUrls, ...servicesUrls, ...newsUrls];

  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map((loc) => `<url><loc>${loc}</loc></url>`).join("\n")}
    </urlset>
  `.trim();

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
