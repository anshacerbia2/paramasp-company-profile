import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { VISA_KEYS } from "@/constants/service";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import IndonesianVisaProcessing from "@/components/services/IndonesianVisaProcessing";
import VisaTypes, { VisaTypesProps } from "@/components/VisaTypes";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    locale,
    "services/indonesian-visa-processing",
    "services.indonesian-visa-processing"
  );
}

export default function Page() {
  const nav = useTranslations("header.navigation");
  const content = useTranslations("services.indonesian-visa-processing");
  const visa = useTranslations("visa");
  const ctp = useTranslations("client-trust-priority");

  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav("services.list.indonesian-visa-processing"),
      href: null,
    },
  ];

  const indonesianVisaProcessingProps = {
    title: content("title"),
    serviceList: [1, 2, 3, 4, 5, 6].map((key) => ({
      title: content(`list.item-${key}.title`),
      description: content(`list.item-${key}.description`),
    })),
  };

  const visaTypesProps: VisaTypesProps = {
    title: visa("title"),
    visaList: VISA_KEYS.map((key) => {
      return {
        key,
        name: visa(`list.${key}`),
      };
    }),
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
    <main id="indonesian-visa-processing">
      <h1 className="sr-only">{content("seo-title")}</h1>
      <Banner
        bannerImgPath="/images/banner-services.jpg"
        title={nav("services.list.indonesian-visa-processing")}
        breadcrumb={breadcrumb}
      />
      <IndonesianVisaProcessing {...indonesianVisaProcessingProps} />
      <VisaTypes {...visaTypesProps} />
      <ClientTrust {...clientTrustProps} />
    </main>
  );
}
