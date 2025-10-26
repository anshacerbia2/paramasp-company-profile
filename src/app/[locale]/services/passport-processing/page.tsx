import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetaProps, PageProps } from "@/types";
import type { OfferCatalog } from "@/types/json-ld";
import { SERVICES_NAVIGATION_KEYS } from "@/constants/navigation";
import { generatePageMetadata, generateWebpageSchemaLD } from "@/lib/seo";
import Banner from "@/components/Banner";
import PassportProcessing, {
  PassportProcessingProps,
} from "@/components/services/passport-processing/PassportProcessing";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

const PATH = SERVICES_NAVIGATION_KEYS[2];

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, `/services/${PATH}`, `services.${PATH}`);
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const nav = await getTranslations("header.navigation");
  const content = await getTranslations(`services.${PATH}`);
  const ctp = await getTranslations("client-trust-priority");
  const jsonLd = await getTranslations(`jsonLd`);

  const breadcrumbLD = [
    {
      label: jsonLd("home.name"),
      path: `/${locale}`,
    },
    {
      label: nav("services.label"),
    },
    {
      label: jsonLd(`${PATH}.name`),
      path: `/${locale}/services/${PATH}`,
    },
  ];

  const offerCatalog: OfferCatalog = {
    "@type": "OfferCatalog",
    name: content("title"),
    description: content("excerpt"),
    itemListElement: [1, 2, 3].map((i) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: content(`list.item-${i}.title`),
        description: content(`list.item-${i}.description`),
      },
    })),
  };

  const webpageSchema = await generateWebpageSchemaLD(
    locale,
    PATH,
    breadcrumbLD,
    "service",
    offerCatalog
  );
  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav(`services.list.${PATH}`),
      href: null,
    },
  ];

  const passportProcessingProps: PassportProcessingProps = {
    title: content("title"),
    paragraph: content("excerpt"),
    cards: [1, 2, 3].map((v) => ({
      title: content(`list.item-${v}.title`),
      description: content(`list.item-${v}.description`),
      image: {
        src: content(`list.item-${v}.image.src`),
        alt: content(`list.item-${v}.image.alt`),
      },
    })),
  };

  const clientTrustProps: ClientTrustProps = {
    bottomShape: true,
    title: ctp("title"),
    paragraph: ctp("excerpt"),
    cards: [1, 2, 3, 4].map((i) => ({
      id: i,
      count: Number(ctp(`list.item-${i}.count`)),
      text: ctp(`list.item-${i}.text`),
    })),
  };

  return (
    <>
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <main id={`${PATH}`}>
        <h1 className="sr-only">{content("seo-title")}</h1>
        <Banner
          bannerImgPath="/images/banner-services.jpg"
          title={nav(`services.list.${PATH}`)}
          breadcrumb={breadcrumb}
        />
        <PassportProcessing {...passportProcessingProps} />
        <ClientTrust {...clientTrustProps} />
      </main>
    </>
  );
}
