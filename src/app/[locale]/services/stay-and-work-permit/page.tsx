import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import KITAProcessingService, {
  KITASProcessingServiceProps,
} from "@/components/services/KITASProcessingService";
import KITASService_1, {
  KITASService_1_Props,
} from "@/components/services/KITASService_1";
import KITASService_2, {
  KITASService_2_Props,
} from "@/components/services/KITASService_2";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    locale,
    "services/stay-and-work-permit",
    "services.stay-and-work-permit"
  );
}

export default function Page() {
  const nav = useTranslations("header.navigation");
  const content = useTranslations("services.stay-and-work-permit");
  const ctp = useTranslations("client-trust-priority");

  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav("services.list.stay-and-work-permit"),
      href: null,
    },
  ];

  const indonesianVisaProcessingProps: KITASProcessingServiceProps = {
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
    <main id="stay-and-work-permit">
      {/* SEO required - screen reader only */}
      <h1 className="sr-only">{content("seo-title")}</h1>

      {/* Use navigation label as title */}
      <Banner
        bannerImgPath="/images/banner-services.jpg"
        title={nav("services.list.stay-and-work-permit")}
        breadcrumb={breadcrumb}
      />
      <KITAProcessingService {...indonesianVisaProcessingProps} />
      <KITASService_1 {...kitasService1Props} />
      <KITASService_2 {...kitasService2Props} />
      <ClientTrust {...clientTrustProps} />
    </main>
  );
}
