"use client";

import { motion } from "framer-motion";

import { memo } from "react";
import Accordion, { AccordionProps } from "@/components/Accordion";
import { ITEM_VARIANT_Y } from "@/constants/motions";

export type KITASService_2_Props = {
  title: string;
  list: AccordionProps["list"];
};

const KITASService_2 = ({ title, list }: KITASService_2_Props) => {
  return (
    <section className="section__kitas__service-2">
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
      <div className="container">
        <div className="service-2">
          <div className="service-2__content">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ITEM_VARIANT_Y({})}
            >
              {title}
            </motion.h2>

            <Accordion list={list} initDelay={0.2} showNav />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(KITASService_2);
