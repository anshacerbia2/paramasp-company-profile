"use client";

import { motion } from "framer-motion";
import { ITEM_VARIANT_Y, VARIANT } from "@/constants/motions";

export type CompanyLegalizationProps = {
  title: string;
  description: string;
  list: string[];
};

const CompanyLegalization = ({
  title,
  description,
  list,
}: CompanyLegalizationProps) => {
  return (
    <section className="section__company-legalization">
      <div className="container">
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
          {description}
        </motion.p>
        <div className="list-card">
          {list.map((text, index) => (
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
};

export default CompanyLegalization;
