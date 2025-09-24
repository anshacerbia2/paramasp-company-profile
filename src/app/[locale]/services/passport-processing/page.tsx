import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import PassportService, {
  PassportServiceProps,
} from "@/components/passport-processing/PassportService";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(
    locale,
    "services/passport-processing",
    "services.passport-processing"
  );
}

export default function Page() {
  const nav = useTranslations("header.navigation");
  const content = useTranslations("services.passport-processing");
  const ctp = useTranslations("client-trust-priority");

  const breadcrumb = [
    {
      label: nav("services.label"),
      href: null,
    },
    {
      label: nav("services.list.passport-processing"),
      href: null,
    },
  ];

  const passportServiceProps: PassportServiceProps = {
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
    <main id="passport-processing">
      <h1 className="sr-only">{content("seo-title")}</h1>
      <Banner
        bannerImgPath="/images/banner-services.jpg"
        title={nav("services.list.passport-processing")}
        breadcrumb={breadcrumb}
      />
      <PassportService {...passportServiceProps} />
      <ClientTrust {...clientTrustProps} />
    </main>
  );
}
