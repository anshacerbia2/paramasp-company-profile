"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { usePathname } from "@/i18n/navigation";
import { NAVIGATION_PATHS } from "@/constants/navigation";
import { useWindowSize } from "@/hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export type NavMenus = {
  label: string;
  href?: string;
  childs?: NavMenus[];
};

export type NavMenuChildProps = {
  pathname: string;
  navMenus: NavMenus[];
  width?: number;
  scrolled?: boolean;
  openSidebar?: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

const NavigationWrapper = () => {
  const nav = useTranslations("header.navigation");
  const words = useTranslations("global.words");

  const [openSidebar, setOpenSidebar] = useState(false);
  const pathname = usePathname();
  const locales = routing.locales;
  const [scrolled, setScrolled] = useState(() => pathname !== "/");

  const [width] = useWindowSize();

  const navMenus = useMemo(() => {
    return NAVIGATION_PATHS.map((obj) => {
      const result: NavMenus = {
        label: nav(`${obj.key}.label`),
        href: !obj.childs ? `/${obj.path ?? obj.key}` : undefined,
      };

      if (obj.childs) {
        result.childs = obj.childs.map((child) => ({
          label: nav(`${obj.key}.list.${child.key}`),
          href: `/${obj.path ?? obj.key}/${child.key}`,
        }));
      }

      return result;
    });
  }, []);

  useLayoutEffect(() => {
    if (pathname === "/") {
      setScrolled(window.scrollY > 80);

      const onScroll = () => {
        setScrolled(window.scrollY > 80);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      setScrolled(true);
    }

    setOpenSidebar(false);
  }, [locales, pathname]);

  useEffect(() => {
    if (openSidebar && width && width > 768) {
      setOpenSidebar(false);
    }
  }, [width, openSidebar]);

  useEffect(() => {
    if (openSidebar) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [openSidebar]);

  return (
    <>
      <Header
        pathname={pathname}
        navMenus={navMenus}
        width={width}
        scrolled={scrolled}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <Sidebar
        pathname={pathname}
        navMenus={navMenus}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <a
        href="https://wa.me/628111002827"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={words("aria-label-wa")}
        className="wa-trigger"
      >
        <DotLottieReact
          src="/animations/whatsapp-loop.lottie"
          loop
          autoplay
          style={{ width: 100, height: 100 }}
        />
      </a>
    </>
  );
};

export default NavigationWrapper;
