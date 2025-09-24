import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import CompanyLegalization, {
  CompanyLegalizationProps,
} from "@/components/company-legalization/CompanyLegalization";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    locale,
    "services/company-legalization",
    "services.company-legalization"
  );
}

export default function Page() {
  const nav = useTranslations("header.navigation");
  const content = useTranslations("services.company-legalization");
  const ctp = useTranslations("client-trust-priority");

  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav("services.list.company-legalization"),
      href: null,
    },
  ];

  const companyLegalizationProps: CompanyLegalizationProps = {
    title: content("title"),
    description: content("description"),
    list: [1, 2, 3, 4, 5, 6].map((v) => content(`list.item-${v}`)),
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
    <main id="company-legalization">
      <h1 className="sr-only">{content("seo-title")}</h1>
      <Banner
        bannerImgPath="/images/banner-services.jpg"
        title={nav("services.list.company-legalization")}
        breadcrumb={breadcrumb}
      />
      <CompanyLegalization {...companyLegalizationProps} />
      <ClientTrust {...clientTrustProps} />
    </main>
  );
}
