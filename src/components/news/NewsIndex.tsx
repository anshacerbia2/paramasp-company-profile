"use client";

import { motion } from "framer-motion";
import { ITEM_VARIANT_Y } from "@/constants/motions";
import { Link } from "@/i18n/navigation";

export type NewsIndexCard = {
  title: string;
  excerpt: string;
  image: {
    src: string;
    alt: string;
  };
  link: {
    label: string;
    href: string;
  };
};

export type NewsIndexProps = {
  title: string;
  cards: NewsIndexCard[];
};

const NewsIndex = ({ title, cards }: NewsIndexProps) => {
  return (
    <section className="section__news-index">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.2 })}
        >
          {title}
        </motion.h2>

        <div className="card-wrapper">
          {cards.map((card, index) => {
            return (
              <motion.div
                key={index}
                className="card-motion"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={ITEM_VARIANT_Y({
                  index,
                  initDelay: 0.4,
                  delay: 0.2,
                  y: 50,
                })}
              >
                <Link href={card.link.href} className="blue-card">
                  <div
                    className="image"
                    style={{ backgroundImage: `url('${card.image.src}')` }}
                  ></div>
                  <div className="content">
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.excerpt}</p>
                    </div>
                    <button type="button" className="btn outline accent fit">
                      {card.link.label}
                    </button>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsIndex;
