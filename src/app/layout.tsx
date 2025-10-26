import "@/styles/index.scss";
import { ReactNode } from "react";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { MetaProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";

type Rootlayout = {
  children: ReactNode;
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "", "home", true);
}

const Rootlayout = async ({ children }: Rootlayout) => {
  const locale = await getLocale();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const logoUrl = `${baseUrl}/images/logo-paramasp.png`;

  // ======================================================
  // JSON-LD schemas (Organization & Website)
  // ======================================================
  const organizationSchema = {
    "@context": "https://schema.org",
    "@id": `${baseUrl}/#organization`, // Unique identifier for referencing
    "@type": "Organization",
    name: "PT. Parama Satya Pertiwi",
    url: baseUrl,
    logo: logoUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": baseUrl },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-811-1002-827",
        contactType: "Customer Support",
        email: "cs@paramasp.com",
        areaServed: { "@type": "Country", name: "Indonesia" },
        availableLanguage: ["English", "Indonesian"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Allure Mansion Blok M1 Rt.001 Rw.003, Jatimurni, Pondok Melati",
      addressLocality: "Bekasi",
      addressRegion: "Jawa Barat",
      postalCode: "17431",
      addressCountry: "ID",
    },
    // geo: {
    //   "@type": "GeoCoordinates",
    //   latitude: -6.2146,
    //   longitude: 106.8451,
    // },
    // founder: {
    //   "@type": "Person",
    //   name: "Paramasp Founder",
    // },
    // foundingDate: "2020-01-01",
    // foundingLocation: {
    //   "@type": "Place",
    //   name: "Jakarta, Indonesia",
    // },
    // sameAs: [
    //   "https://maps.google.com/?cid=XXXXXXXXXXXXXX"
    //   "https://www.facebook.com/paramasp",
    //   "https://www.instagram.com/paramasp",
    //   "https://www.linkedin.com/company/paramasp",
    // ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@id": `${baseUrl}/#website`, // Unique identifier for referencing
    "@type": "WebSite",
    url: baseUrl,
    name: "PT. Parama Satya Pertiwi",
    alternateName: "Paramasp",
    copyrightHolder: {
      "@id": `${baseUrl}/#organization`,
      "@type": "Organization",
    },
    copyrightYear: "2025",
    publisher: {
      "@id": `${baseUrl}/#organization`,
      "@type": "Organization",
    },
    // potentialAction: {
    //   "@type": "SearchAction",
    //   target: "https://paramasp.com/search?q={search_term_string}",
    //   "query-input": "required name=search_term_string",
    // },
  };

  return (
    <html lang={locale}>
      <head>
        {/* JSON Linked Data */}
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Rootlayout;
