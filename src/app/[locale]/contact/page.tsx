import { Metadata } from "next";
import { useTranslations } from "next-intl";
import type { PageProps } from "@/types";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "contact", "contact");
}

export default function Page() {
  const contact = useTranslations("contact");

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
    <main id="company-legalization">
      <h1 className="sr-only">{contact("seo-title")}</h1>
      <Banner
        useH1
        bannerImgPath="/images/banner-contact.jpg"
        title={contact("tag")}
      />
      <ContactForm {...contactFormProps} />
    </main>
  );
}
