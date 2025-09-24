import type { Metadata } from "next";
import { headers } from "next/headers";

function getNestedContent<T extends object, R = unknown>(
  obj: T,
  path: string
): R | undefined {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as R | undefined;
}

export async function generatePageMetadata(
  locale: string,
  path: string,
  contentPath: string
): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const content = (await import(`../locales/${locale}.json`)).default;
  const meta = getNestedContent<typeof content, Metadata>(
    content,
    `${contentPath}.meta`
  );

  if (!meta) throw new Error(`Meta not found at path ${contentPath}`);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/${path}`,
      languages: {
        en: `${baseUrl}/en/${path}`,
        id: `${baseUrl}/id/${path}`,
      },
    },
  };
}
