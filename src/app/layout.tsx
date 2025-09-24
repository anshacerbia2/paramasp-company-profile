import "@/styles/index.scss";
import { ReactNode } from "react";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";

type Rootlayout = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/images/paramasp-icon.png",
    shortcut: "/images/paramasp-icon.png",
  },
};

const Rootlayout = async ({ children }: Rootlayout) => {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
};

export default Rootlayout;
