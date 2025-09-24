"use client";

import { motion } from "framer-motion";
import { ITEM_VARIANT_Y } from "@/constants/motions";

export type PassportServiceCard = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type PassportServiceProps = {
  title: string;
  paragraph: string;
  cards: PassportServiceCard[];
};

const PassportService = ({ title, paragraph, cards }: PassportServiceProps) => {
  return (
    <section className="section__pasport-processing">
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
          {paragraph}
        </motion.p>
        <div className="card-wrapper">
          {cards.map((card, index) => {
            return (
              <motion.div
                key={index}
                className="blue-card"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={ITEM_VARIANT_Y({
                  index,
                  initDelay: 0.6,
                  delay: 0.2,
                  y: 50,
                })}
              >
                <div
                  className="image"
                  style={{ backgroundImage: `url('${card.image.src}')` }}
                ></div>
                <div className="content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PassportService;
