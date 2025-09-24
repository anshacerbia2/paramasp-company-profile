import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NewsPageProps } from "@/types/index";
import { NEWS_NAVIGATION_KEYS } from "@/constants/navigation";
import { generatePageMetadata } from "@/lib/seo";
import Banner from "@/components/Banner";
import Article, { ArticleProps } from "@/components/news/Article";
import NewsIndex, { NewsIndexProps } from "@/components/news/NewsIndex";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugKey = slug?.[0] || "";
  return generatePageMetadata(
    locale,
    `news/${slugKey}`,
    `news${slugKey ? "." + slugKey : ""}`
  );
}

export function generateStaticParams() {
  return NEWS_NAVIGATION_KEYS.map((slug) => ({ slug: [slug] }));
}

export default async function Page({ params }: NewsPageProps) {
  const { slug } = await params;
  const slugKey = slug?.[0] || "";

  if (slugKey && !NEWS_NAVIGATION_KEYS.includes(slugKey)) {
    notFound();
  }

  const global = await getTranslations("global");
  const news = await getTranslations("news");
  const content = await getTranslations(slug ? `news.${slugKey}` : "news");

  // const breadcrumb = [
  //   {
  //     label: nav("news.label"),
  //     href: null,
  //   },
  //   {
  //     label: nav(`news.list.${slug}`),
  //     href: null,
  //   },
  // ];

  // const newsContent = content.rich("content", {
  //   p: (children: React.ReactNode) => <p>{children}</p>,
  //   ul: (children: React.ReactNode) => <ul>{children}</ul>,
  //   li: (children: React.ReactNode) => <li>{children}</li>,
  //   h2: (children: React.ReactNode) => <h2>{children}</h2>,
  //   h3: (children: React.ReactNode) => <h3>{children}</h3>,
  //   article: (children: React.ReactNode) => <article>{children}</article>,
  //   footer: (children: React.ReactNode) => <footer>{children}</footer>,
  //   ol: (children: React.ReactNode) => <ol>{children}</ol>,
  //   a: (children: React.ReactNode, props?: { href?: string }) => (
  //     <a href={props?.href}>{children}</a>
  //   ),
  // });

  const newsIndexProps: NewsIndexProps = {
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

  const currentNewsIdx = NEWS_NAVIGATION_KEYS.findIndex(
    (key) => key === slugKey
  );

  const articleNavigation: ArticleProps["navigation"] = {};

  if (currentNewsIdx >= 0) {
    const next = NEWS_NAVIGATION_KEYS[currentNewsIdx - 1];
    const prev = NEWS_NAVIGATION_KEYS[currentNewsIdx + 1];

    if (next) {
      articleNavigation.next = {
        tag: global("words.next"),
        label: news(`${next}.title`),
        href: `/news/${next}`,
      };
    }
    if (prev) {
      articleNavigation.prev = {
        tag: global("words.prev"),
        label: news(`${prev}.title`),
        href: `/news/${prev}`,
      };
    }
  }

  return (
    <main className="news">
      <Banner
        useH1
        bannerImgPath={
          slugKey ? content("image.src") : "/images/banner-news.jpg"
        }
        tag={slugKey ? news("tag") : undefined}
        title={slugKey ? content("title") : news("tag")}
        published={slugKey ? content("published") : undefined}
        // breadcrumb={breadcrumb}
      />
      {slugKey ? (
        <Article
          content={content.raw("content")}
          navigation={articleNavigation}
        />
      ) : (
        <NewsIndex {...newsIndexProps} />
      )}
    </main>
  );
}
