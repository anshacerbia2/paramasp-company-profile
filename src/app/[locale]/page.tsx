import slide1 from "@/assets/images/home-carousel-slide-1.jpg";
import slide2 from "@/assets/images/home-carousel-slide-2.jpg";
import slide3 from "@/assets/images/home-carousel-slide-3.jpg";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetaProps, PageProps } from "@/types";
import {
  NEWS_NAVIGATION_KEYS,
  SERVICES_NAVIGATION_KEYS,
} from "@/constants/navigation";
import { SERVICES } from "@/constants/service";
import { generatePageMetadata, generateWebpageSchemaLD } from "@/lib/seo";
import HomeCarousel from "@/components/HomeCarousel";
import AboutUs, { AboutUsProps } from "@/components/AboutUs";
import Services, { ServicesProps } from "@/components/Services";
import ClientTrust, { ClientTrustProps } from "@/components/ClientTrust";
// import TestimonialCarousel from "@/components/TestimonialCarousel";
import NewsIndex, { NewsIndexProps } from "@/components/news/NewsIndex";

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "", "home");
}

const slideImages = [slide1, slide2, slide3];
const slideHrefs = [
  "/services/stay-and-work-permit",
  "/services/stay-and-work-permit",
  "/services/stay-and-work-permit",
];

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const global = await getTranslations("global");
  const home = await getTranslations("home");
  const about = await getTranslations("about-us");
  const services = await getTranslations("services");
  const ctp = await getTranslations("client-trust-priority");
  const news = await getTranslations("news");
  const readMore = global("button.read-more");
  const jsonLd = await getTranslations(`jsonLd`);

  const webpageSchema = await generateWebpageSchemaLD(locale, "home", [
    {
      label: jsonLd("home.name"),
      path: `/${locale}`,
    },
  ]);

  const slides = Array(3)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      title: home(`hero.carousel.slide-${i + 1}.title`),
      content: home(`hero.carousel.slide-${i + 1}.content`),
      image: slideImages[i],
      button: {
        href: slideHrefs[i],
        text: home(`hero.carousel.slide-${i + 1}.button`),
      },
    }));

  const aboutUsProps: AboutUsProps = {
    tag: about("tag"),
    title: about("title"),
    paragraph: about("excerpt"),
    commitment: {
      tag: about("commitment.tag"),
      list: [1, 2, 3, 4, 5].map((v) => about(`commitment.list.item-${v}`)),
    },
    button: readMore,
  };

  const servicesProps: ServicesProps = {
    tag: services("shared.tag"),
    title: services("shared.title"),
    paragraph: services("shared.excerpt"),
    cards: SERVICES_NAVIGATION_KEYS.map((key, idx) => ({
      id: key,
      title: services(`${key}.title`),
      excerpt: services(`${key}.excerpt`),
      imgPath: SERVICES[idx].imgPath,
      href: SERVICES[idx].href,
    })),
    button: global("button.read-more"),
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

  const newsIndexProps: NewsIndexProps = {
    tag: news("tag"),
    title: news("title"),
    excerpt: news("excerpt"),
    cards: NEWS_NAVIGATION_KEYS.map((key) => ({
      title: news(`${key}.title`),
      excerpt: news(`${key}.excerpt`),
      image: {
        src: news(`${key}.image.src`),
        alt: news(`${key}.image.alt`),
      },
      link: {
        label: global("button.read-more"),
        href: `/news/${key}`,
      },
    })),
  };

  return (
    <>
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <main id="home">
        {/* SEO required - screen reader only */}
        <h1 className="sr-only">{home("title")}</h1>
        <HomeCarousel slides={slides} />
        <AboutUs {...aboutUsProps} />
        <Services {...servicesProps} />
        <ClientTrust {...clientTrustProps} />
        {/* <TestimonialCarousel /> */}
        <NewsIndex {...newsIndexProps} />
      </main>
    </>
  );
}
