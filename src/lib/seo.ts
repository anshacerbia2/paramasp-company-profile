import type { Metadata } from "next";
import type { BreadcrumbLD, OfferCatalog } from "@/types/json-ld";
import { getTranslations } from "next-intl/server";
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
  contentPath: string,
  isRoot: boolean = false
): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto");
  const baseUrl = `${protocol}://${host}`;

  /*
   * Do not put "/" at the end of canonical/alternate or it will be detected as invalid by lighthouse
   * <link rel="canonical" href="https://paramasp.com/en/">
   * <link rel="alternate" hreflang="id" href="https://paramasp.com/id/">
   * <link rel="alternate" hreflang="en" href="https://paramasp.com/en/">
   *
   * Should be:
   * <link rel="canonical" href="https://paramasp.com/en">
   * <link rel="alternate" hreflang="id" href="https://paramasp.com/id">
   * <link rel="alternate" hreflang="en" href="https://paramasp.com/en">
   */

  const fullUrl = `${baseUrl}/${locale}${path}`;
  const logoUrl = `${baseUrl}/images/paramasp-icon.png`;
  const ogImage = `${baseUrl}/images/logo-paramasp.png`; // Image used by default for Open Graph

  if (isRoot) {
    return {
      icons: {
        icon: logoUrl,
        shortcut: logoUrl,
      },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
      category: "Immigration Services",
    };
  }

  const content = (await import(`../locales/${locale}.json`)).default;
  const meta = getNestedContent<typeof content, Metadata>(
    content,
    `${contentPath}.meta`
  );

  if (!meta) throw new Error(`Meta not found at path ${contentPath}`);

  const title = meta.title || undefined;
  const description = meta.description || undefined;
  const keywords = meta.keywords || undefined;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${baseUrl}/en${path}`,
        id: `${baseUrl}/id${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Paramasp",
      locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Paramasp - Immigration Services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      // creator: "@paramasp", // Optional, uncomment if you have a Twitter account
      // site: "@paramasp", // Optional
    },
  };
}

export const generateWebpageSchemaLD = async (
  locale: string,
  key: string,
  breadcrumb: BreadcrumbLD[],
  type = "webpage",
  offerCatalog?: OfferCatalog
) => {
  const h = await headers();
  const host = h.get("host");
  const protocol = h.get("x-forwarded-proto");
  const path = h.get("x-pathname") || "";
  const baseUrl = `${protocol}://${host}`;

  const fullUrl = `${baseUrl}${path}`;

  const jsonLd = await getTranslations(type === "news" ? key : `jsonLd.${key}`);

  const webPageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": fullUrl,
    url: fullUrl,
    inLanguage: locale,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
      "@type": "WebSite",
    },
  };

  if (type !== "news") {
    webPageSchema.name = jsonLd("name");
    webPageSchema.description = jsonLd("description");
  }

  if (type === "about" || type === "contact") {
    webPageSchema.mainEntity = {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    };
  } else if (type === "service") {
    const serviceSchema: Record<string, unknown> = {
      "@type": jsonLd("type"),
      name: jsonLd("name"),
      description: jsonLd("description"),
      url: fullUrl,
    };

    if (type === "service") {
      serviceSchema["serviceType"] = jsonLd("subtype");
      serviceSchema["provider"] = {
        "@id": `${baseUrl}/#organization`,
        "@type": "Organization",
      };
      serviceSchema["areaServed"] = {
        "@type": "Country",
        name: "Indonesia",
      };

      if (offerCatalog) {
        serviceSchema["hasOfferCatalog"] = offerCatalog;
      }
    }

    webPageSchema.mainEntity = serviceSchema;
  } else if (type === "news") {
    webPageSchema.name = jsonLd("title");
    webPageSchema.description = jsonLd("excerpt");
    webPageSchema.mainEntity = {
      "@type": "NewsArticle",
      headline: jsonLd("title"),
      description: jsonLd("excerpt"),
      datePublished: jsonLd("published"),
      dateModified: jsonLd("modified"),
      image: [`${baseUrl}${jsonLd("image.src")}`],
      author: {
        "@type": "Person",
        name: "Admin",
      },
      publisher: {
        "@id": `${baseUrl}/#organization`,
        "@type": "Organization",
      },
    };
  }

  if (breadcrumb.length) {
    webPageSchema["breadcrumb"] = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const breadcrumbItem: any = {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": item.typeLd ?? "WebPage",
            name: item.label,
          },
        };

        if (item.path !== undefined) {
          breadcrumbItem.item["@id"] = `${baseUrl}${item.path}`;
        }

        return breadcrumbItem;
      }),
    };
  }

  return webPageSchema;
};
