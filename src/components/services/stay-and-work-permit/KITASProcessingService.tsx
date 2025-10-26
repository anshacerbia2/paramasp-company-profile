"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CONTAINER_VARIANT, ITEM_VARIANT_X } from "@/constants/motions";

type Paragraph = {
  tag: string;
  paragraph: string;
};

export type KITASProcessingServiceProps = {
  title: string;
  intro: string;
  paragraphs: Paragraph[];
};

const KITASProcessingService = ({
  title,
  intro,
  paragraphs,
}: KITASProcessingServiceProps) => {
  return (
    <section className="section__kitas">
      <div className="container">
        <div className="kitas">
          <motion.div
            className="kitas__content"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={CONTAINER_VARIANT({})}
          >
            <motion.h2 variants={ITEM_VARIANT_X({})}>{title}</motion.h2>

            <motion.p variants={ITEM_VARIANT_X({})}>{intro}</motion.p>

            <motion.div
              className="blue-card__container"
              variants={ITEM_VARIANT_X({
                staggerChildren: 0.2,
                when: "beforeChildren",
              })}
            >
              {paragraphs.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  className="blue-card__item"
                  variants={ITEM_VARIANT_X({})}
                >
                  <span className="section__tag">{paragraph.tag}</span>
                  <p>{paragraph.paragraph}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="kitas__image"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ITEM_VARIANT_X({ duration: 1, initDelay: 0.2, x: -50 })}
          >
            <Image
              src="/images/pengurusan-kitas-dan-izin-tka-di-indonesia.jpg"
              alt={title}
              width={1000}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(KITASProcessingService);
