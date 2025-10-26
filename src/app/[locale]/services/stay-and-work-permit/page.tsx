import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetaProps, PageProps } from "@/types";
import type { OfferCatalog } from "@/types/json-ld";
import { SERVICES_NAVIGATION_KEYS } from "@/constants/navigation";
import { generatePageMetadata, generateWebpageSchemaLD } from "@/lib/seo";
import Banner from "@/components/Banner";
import KITAProcessingService, {
  KITASProcessingServiceProps,
} from "@/components/services/stay-and-work-permit/KITASProcessingService";
import KITASService_1, {
  KITASService_1_Props,
} from "@/components/services/stay-and-work-permit/KITASService_1";
import KITASService_2, {
  KITASService_2_Props,
} from "@/components/services/stay-and-work-permit/KITASService_2";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

const PATH = SERVICES_NAVIGATION_KEYS[1];

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
    itemListElement: [
      // kitas
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: content("kitas.title"),
          description: content("kitas.intro"),
        },
      },
      // service-1
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: content("services.service-1.title"),
        },
      },
      // service-2 with sub-items
      {
        "@type": "OfferCatalog",
        name: content("services.service-2.title"),
        itemListElement: [1, 2, 3, 4, 5, 6, 7].map((i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: content(`services.service-2.list.item-${i}.title`),
          },
        })),
      },
    ],
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

  const kitasProcessingProps: KITASProcessingServiceProps = {
    title: content("kitas.title"),
    intro: content("kitas.intro"),
    paragraphs: [1, 2].map((key) => ({
      tag: content(`kitas.paragraphs.paragraph-${key}.tag`),
      paragraph: content(`kitas.paragraphs.paragraph-${key}.paragraph`),
    })),
  };

  const kitasService1Props: KITASService_1_Props = {
    bottomShape: true,
    title: content("services.service-1.title"),
    list: [1, 2, 3, 4, 5].map((i) => ({
      title: content(`services.service-1.list.item-${i}.title`),
      description: content(`services.service-1.list.item-${i}.description`),
    })),
  };

  const kitasService2Props: KITASService_2_Props = {
    title: content("services.service-2.title"),
    list: [1, 2, 3, 4, 5, 6, 7].map((i) => ({
      title: content(`services.service-2.list.item-${i}.title`),
      description: content.rich(`services.service-2.list.item-${i}.content`, {
        p: (children) => <p>{children}</p>,
        ul: (children) => <ul>{children}</ul>,
        li: (children) => <li>{children}</li>,
        strong: (children) => <strong>{children}</strong>,
      }),
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
        {/* SEO required - screen reader only */}
        <h1 className="sr-only">{content("seo-title")}</h1>

        {/* Use navigation label as title */}
        <Banner
          bannerImgPath="/images/banner-services.jpg"
          title={nav(`services.list.${PATH}`)}
          breadcrumb={breadcrumb}
        />
        <KITAProcessingService {...kitasProcessingProps} />
        <KITASService_1 {...kitasService1Props} />
        <KITASService_2 {...kitasService2Props} />
        <ClientTrust {...clientTrustProps} />
      </main>
    </>
  );
}
