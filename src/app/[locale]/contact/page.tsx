import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetaProps, PageProps } from "@/types";
import { generatePageMetadata, generateWebpageSchemaLD } from "@/lib/seo";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/contact", "contact");
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const contact = await getTranslations("contact");
  const jsonLd = await getTranslations(`jsonLd`);

  const webpageSchema = await generateWebpageSchemaLD(
    locale,
    "contact",
    [
      {
        label: jsonLd("home.name"),
        path: `/${locale}`,
      },
      {
        label: jsonLd("contact.name"),
        path: `/${locale}/contact`,
      },
    ],
    "contact"
  );

  const contactFormProps = {
    title: contact("title"),
    paragraph: contact("excerpt"),
    form: {
      fname: contact("form.fname"),
      lname: contact("form.lname"),
      phone: contact("form.phone"),
      email: contact("form.email"),
      message: contact("form.message"),
    },
  };
  return (
    <>
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <main id="company-legalization">
        <h1 className="sr-only">{contact("seo-title")}</h1>
        <Banner
          useH1
          bannerImgPath="/images/banner-contact.jpg"
          title={contact("tag")}
        />
        <ContactForm {...contactFormProps} />
      </main>
    </>
  );
}
