import { notFound } from "next/navigation";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { LayoutProps } from "@/types";
import { LangUpdater } from "@/hooks";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <LangUpdater />
      <NavigationWrapper />
      {children}
      {/* <SpeedInsights /> */}
      <Footer />
    </NextIntlClientProvider>
  );
}
