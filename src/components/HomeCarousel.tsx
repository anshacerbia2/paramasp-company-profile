"use client";

import styles from "../styles/modules/carousel_02.module.scss";
import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useInterval, useWindowSize } from "../hooks";
import Image, { StaticImageData } from "next/image";

type CarouselSlide = {
  id: number;
  title: string;
  content: string;
  button?: {
    href: string;
    text: string;
  };
  image: string | StaticImageData;
};

type HomeCarouselProps = {
  slides: CarouselSlide[];
};

const HomeCarousel = ({ slides }: HomeCarouselProps) => {
  const [oldIdx, setOldIdx] = useState(0);
  const [newIdx, setNewIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "switch" | "in">("idle");
  const [autoDelay, setAutoDelay] = useState<number | null>(8000);
  const [width] = useWindowSize();

  useInterval(() => slider(), autoDelay);

  const slider = (manualIdx?: number) => {
    if (manualIdx !== undefined) {
      setAutoDelay(null);
    }

    const idx =
      manualIdx !== undefined
        ? manualIdx
        : oldIdx + 1 >= slides.length
        ? 0
        : oldIdx + 1;

    setNewIdx(idx);
    setPhase("out"); // trigger keluar
  };

  useEffect(() => {
    if (phase === "out") {
      // konten out cepat (300ms), image jalan 600ms
      const t = setTimeout(() => {
        setOldIdx(newIdx); // ganti image di tengah transisi
        setPhase("in"); // mulai animasi masuk konten
      }, 500); // konten in dimulai saat image hampir selesai
      return () => clearTimeout(t);
    }
    if (phase === "in") {
      const t = setTimeout(() => {
        setAutoDelay((prev) => (prev === null ? 8000 : prev));
        setPhase("idle");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [phase, newIdx]);

  // Image style
  const imageStyle = (idx: number, isActive: boolean) => ({
    position: "absolute" as const,
    inset: 0,
    transform: isActive
      ? width && width > 768
        ? "scale(1)"
        : "scale(1.025)"
      : width && width > 768
      ? "scale(1.25)"
      : "scale(1.05)",
    opacity: isActive ? 1 : 0,
    transition: "transform 0.6s ease, opacity 0.6s ease",
    zIndex: isActive ? 1 : 0,
  });

  // Content base
  const getContentStyle = (delay: number) => {
    if (phase === "out") {
      return {
        transform: "translate3d(75px,0,0)",
        opacity: 0,
        transition: `all 0.4s ease ${delay}ms`,
      };
    }
    if (phase === "in") {
      return {
        transform: "translate3d(0,0,0)",
        opacity: 1,
        transition: `all 0.4s ease ${delay}ms`,
      };
    }
    return {
      transform: "translate3d(0,0,0)",
      opacity: 1,
      transition: "",
    };
  };

  const titleStyle = getContentStyle(0);
  const contentStyle = getContentStyle(50);
  const buttonStyle = getContentStyle(110);

  return (
    <div className={styles["c-02-display"]}>
      {/* Images */}
      {slides.map((s, i) => (
        <div key={s.id} style={imageStyle(i, i === oldIdx)}>
          <Image
            src={s.image}
            fill
            alt={`image-${i}`}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="container">
        <div className={styles["c-02-content-wrapper"]}>
          <div className={styles["c-02-content"]}>
            <h2 style={titleStyle}>{slides[oldIdx].title}</h2>
            <p style={contentStyle}>{slides[oldIdx].content}</p>
            {slides[oldIdx].button && (
              <Link
                href={slides[oldIdx].button.href}
                style={buttonStyle}
                className="btn"
              >
                {slides[oldIdx].button.text}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bullets */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <span
            key={_.id}
            onClick={() => (i !== newIdx ? slider(i) : undefined)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: i === oldIdx ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
