import "@/styles/index.scss";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import NavigationWrapper from "@/components/NavigationWrapper";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const h = await headers();
  const host = h.get("host") || "localhost:3000";

  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const content = (await import(`../../locales/${locale}.json`)).default;
  const { meta } = content;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${locale}/`,
      languages: {
        en: `${baseUrl}/en/`,
        id: `${baseUrl}/id/`,
      },
    },
    icons: {
      icon: "/images/logo-paramasp.png",
      shortcut: "/images/logo-paramasp.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <NavigationWrapper />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
