"use client";

import { motion } from "framer-motion";
import { ITEM_VARIANT_Y, VARIANT } from "@/constants/motions";

export type OurCommitmentProps = {
  tag: string;
  title: string;
  commitments: string[];
};

export default function OurCommitment({
  tag,
  title,
  commitments,
}: OurCommitmentProps) {
  return (
    <section className="section__commitment">
      <div className="container">
        {/* Tag appears when enters the viewport */}
        <motion.div
          className="section__tag"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({})}
        >
          {tag}
        </motion.div>

        {/* Title appears afetr tag */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.2 })}
        >
          {title}
        </motion.h2>

        {/* List appears afetr title */}
        <div className="list-card">
          {commitments.map((text, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={{ index, initDelay: 0.6, delay: 0.2, x: 100 }}
              variants={VARIANT}
            >
              <div className="list-card__item blue-card">
                <span className="icon">✔</span>
                <span className="text">{text}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
