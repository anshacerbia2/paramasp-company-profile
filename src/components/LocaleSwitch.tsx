"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const getPrevLocale = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("prevLocale");
};

const getMarkerStyle = () => {
  const prev = getPrevLocale();
  const result = {
    transform: "translate(-100%, 0)",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  };

  if (prev === "en") {
    result.transform = "translate(0, 0)";
    result.borderTopLeftRadius = 18;
    result.borderBottomLeftRadius = 18;
  } else if (prev === "id") {
    result.transform = "translate(50%, 0)";
    result.borderTopRightRadius = 18;
    result.borderBottomRightRadius = 18;
  }

  return result;
};

function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const [markerStyle, setMarkerStyle] =
    useState<React.CSSProperties>(getMarkerStyle);

  useEffect(() => {
    return localStorage.removeItem("prevLocale");
  }, []);

  useEffect(() => {
    const activeIdx = ["en", "id"].indexOf(currentLocale);
    const activeLink = linkRefs.current[activeIdx];

    if (activeLink && markerRef.current) {
      const rect = activeLink.getBoundingClientRect();
      const parentRect = activeLink.parentElement?.getBoundingClientRect();
      if (!parentRect) return;
      setMarkerStyle({
        transform: `translateX(${rect.left - parentRect.left}px)`,
        borderTopLeftRadius: activeIdx === 0 ? 18 : 3,
        borderBottomLeftRadius: activeIdx === 0 ? 18 : 3,
        borderTopRightRadius: activeIdx === 1 ? 18 : 3,
        borderBottomRightRadius: activeIdx === 1 ? 18 : 3,
      });
    }
  }, [currentLocale]);

  const handleClick = () => {
    localStorage.setItem("prevLocale", currentLocale);
  };

  return (
    <div className="locale-switcher">
      {["en", "id"].map((loc, i) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          onClick={handleClick}
          ref={(el) => {
            if (el) linkRefs.current[i] = el;
          }}
          style={{ pointerEvents: currentLocale == loc ? "none" : undefined }}
          className={`btn${loc === currentLocale ? " active" : ""}`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
      <span
        suppressHydrationWarning
        ref={markerRef}
        className="switcher-active-marker"
        style={markerStyle}
      ></span>
    </div>
  );
}
export default LocaleSwitcher;
