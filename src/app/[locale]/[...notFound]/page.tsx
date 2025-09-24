"use client";

import { useLayoutEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useWindowSize } from "@/hooks";

export default function NotFound() {
  const words = useTranslations("global.words");
  const [height, setHeight] = useState<string | number>("");
  const [width] = useWindowSize();

  useLayoutEffect(() => {
    const footerHeight = document.getElementById("footer")?.offsetHeight ?? 0;
    setHeight(`calc(100vh - ${footerHeight + 80}px)`);
  }, [width]);

  return (
    <section id="not-found" style={{ minHeight: height }}>
      <div className="container">
        <h2>{words("page-not-found.title")}</h2>
        <p>{words("page-not-found.paragraph")}</p>
        <Link href="/" className="btn outline accent fit">
          {words("back-to-home")}
        </Link>
      </div>
    </section>
  );
}
