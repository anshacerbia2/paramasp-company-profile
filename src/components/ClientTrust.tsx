"use client";

import { motion } from "framer-motion";
import FloatingCards, { FloatingCardProps } from "./FloatingCards";
import { CONTAINER_VARIANT, ITEM_VARIANT_Y } from "@/constants/motions";

export type ClientTrustProps = {
  bottomShape?: boolean;
  title: string;
  paragraph: string;
  cards: FloatingCardProps["cards"];
};

const ClientTrust = ({
  bottomShape,
  title,
  paragraph,
  cards,
}: ClientTrustProps) => {
  return (
    <section
      className={`section__client-trust${bottomShape ? " with-shape" : ""}`}
    >
      <div className="container">
        <motion.blockquote
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={CONTAINER_VARIANT({})}
        >
          <motion.h2 variants={ITEM_VARIANT_Y({})}>{title}</motion.h2>
          <motion.p variants={ITEM_VARIANT_Y({})}>{paragraph}</motion.p>
        </motion.blockquote>
        <FloatingCards cards={cards} />
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

export default ClientTrust;
