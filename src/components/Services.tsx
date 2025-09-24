"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { ITEM_VARIANT_Y, VARIANT } from "@/constants/motions";

type ServiceCard = {
  id: string;
  title: string;
  excerpt: string;
  imgPath: string;
  href: string;
};

export type ServicesProps = {
  bottomShape?: boolean;
  tag: string;
  title: string;
  paragraph: string;
  cards: ServiceCard[];
  button: string;
};

const Services = ({
  bottomShape = false,
  tag,
  title,
  paragraph,
  cards,
  button,
}: ServicesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);

  // const isInView = useInView(containerRef, { once: true });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const newOffsets = cardRefs.current.map((card) => {
      if (!card) return { x: 0, y: 0 };
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left - containerRect.left + rect.width / 2;
      const cardCenterY = rect.top - containerRect.top + rect.height / 2;

      return {
        x: centerX - cardCenterX,
        y: centerY - cardCenterY,
      };
    });

    setOffsets(newOffsets);
  }, [cards]);

  // const canShow = isInView && offsets.length > 0;

  return (
    <section className={`section__services${bottomShape ? " with-shape" : ""}`}>
      <div className="container">
        <motion.div
          className="section__tag"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({})}
        >
          {tag}
        </motion.div>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.2 })}
        >
          {title}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.4 })}
        >
          {paragraph}
        </motion.p>

        <div ref={containerRef} className="cards-container">
          {cards.map((card, i) => (
            <motion.div
              key={`service-card-${card.id}-${offsets[i]?.x}-${offsets[i]?.y}`}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="card-motion"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={VARIANT}
              custom={{
                index: i,
                type: "spring",
                duration: 1,
                initDelay: 0.6,
                delay: 0.2,
                x: offsets[i]?.x ?? 0,
                y: offsets[i]?.y ?? 0,
              }}
            >
              <div className="card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${card.imgPath})` }}
                />
                <div className="card-content">
                  <div>
                    <h3 className="card-title">{card.title}</h3>
                    <p>{card.excerpt}</p>
                  </div>
                  <Link href={card.href} className="btn outline accent fit">
                    {button}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {bottomShape && (
        <svg
          className="svg-shape"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            className="shape-fill"
            d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"
          ></path>
        </svg>
      )}
    </section>
  );
};

export default Services;
