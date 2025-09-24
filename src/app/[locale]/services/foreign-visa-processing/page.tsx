import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import ForeignVisaService, {
  ForeignVisaServiceProps,
} from "@/components/foreign-visa-processing/ForeignVisaService";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    locale,
    "services/foreign-visa-processing",
    "services.foreign-visa-processing"
  );
}

export default function Page() {
  const nav = useTranslations("header.navigation");
  const content = useTranslations("services.foreign-visa-processing");
  const ctp = useTranslations("client-trust-priority");

  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav("services.list.foreign-visa-processing"),
      href: null,
    },
  ];

  const foreignVisaServiceProps: ForeignVisaServiceProps = {
    title: content("title"),
    paragraph: content("excerpt"),
    cards: [1, 2, 3].map((v) => ({
      title: content(`list.item-${v}.title`),
      description: content(`list.item-${v}.description`),
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
    <main id="foreign-visa-processing">
      <h1 className="sr-only">{content("seo-title")}</h1>
      <Banner
        bannerImgPath="/images/banner-services.jpg"
        title={nav("services.list.foreign-visa-processing")}
        breadcrumb={breadcrumb}
      />
      <ForeignVisaService {...foreignVisaServiceProps} />
      <ClientTrust {...clientTrustProps} />
    </main>
  );
}
