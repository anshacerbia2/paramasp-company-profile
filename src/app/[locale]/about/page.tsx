import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { MetaProps, PageProps } from "@/types";
import { SERVICES_NAVIGATION_KEYS } from "@/constants/navigation";
import { SERVICES } from "@/constants/service";
import { generatePageMetadata, generateWebpageSchemaLD } from "@/lib/seo";
import Banner from "@/components/Banner";
import VisionMission, {
  VisionMissionProps,
} from "@/components/about/VisionMission";
import OurCommitment, {
  OurCommitmentProps,
} from "@/components/about/OurCommitment";
import Services, { ServicesProps } from "@/components/Services";
// import TestimonialCarousel from "@/components/TestimonialCarousel";

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, "/about", "about-us");
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const global = await getTranslations("global");
  const services = await getTranslations("services");
  const about = await getTranslations("about-us");
  const jsonLd = await getTranslations(`jsonLd`);

  const webpageSchema = await generateWebpageSchemaLD(
    locale,
    "about-us",
    [
      {
        label: jsonLd("home.name"),
        path: `/${locale}`,
      },
      { label: jsonLd("about-us.name"), path: `/${locale}/about` },
    ],
    "about"
  );

  const visionMissionProps: VisionMissionProps = {
    tag: about("vision-mission.tag"),
    title: about("vision-mission.title"),
    paragraph: about("vision-mission.excerpt"),
    vision: {
      title: about("vision-mission.vision.title"),
      content: about("vision-mission.vision.content"),
    },
    mission: {
      title: about("vision-mission.mission.title"),
      content: about("vision-mission.mission.content"),
    },
  };

  const ourCommitmentsProps: OurCommitmentProps = {
    tag: about("commitment.tag"),
    title: about("commitment.title"),
    commitments: [1, 2, 3, 4, 5].map((v) => about(`commitment.list.item-${v}`)),
  };

  const servicesProps: ServicesProps = {
    bottomShape: true,
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

  return (
    <>
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <main id="about">
        <h1 className="sr-only">{about("seo-title")}</h1>
        <Banner
          bannerImgPath="/images/banner-about-us.jpg"
          title={about("tag")}
        />
        <VisionMission {...visionMissionProps} />
        <OurCommitment {...ourCommitmentsProps} />
        <Services {...servicesProps} />
        {/* <TestimonialCarousel /> */}
      </main>
    </>
  );
}
