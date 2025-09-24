"use client";

import { CONTAINER_VARIANT, ITEM_VARIANT_Y } from "@/constants/motions";
import { motion } from "framer-motion";

export type VisaTypesProps = {
  title: string;
  visaList: { key: string; name: string }[];
};

const VisaTypes = ({ title, visaList }: VisaTypesProps) => {
  return (
    <section className="section__visa-types">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={CONTAINER_VARIANT({})}
      >
        <motion.h2 variants={ITEM_VARIANT_Y({})}>{title}</motion.h2>
        <motion.div
          className="visa-types__table-wrapper"
          variants={ITEM_VARIANT_Y({})}
        >
          {visaList.map((obj) => (
            <div key={obj.key} className="visa-types__row">
              <div>{obj.key}</div>
              <div>{obj.name}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VisaTypes;
