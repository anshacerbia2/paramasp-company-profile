"use client";

import { motion } from "framer-motion";
import { ITEM_VARIANT_Y } from "@/constants/motions";
import Accordion, { AccordionProps } from "../Accordion";

export type IndonesianVisaProcessingProps = {
  title: string;
  serviceList: AccordionProps["list"];
};

const IndonesianVisaProcessing = ({
  title,
  serviceList,
}: IndonesianVisaProcessingProps) => {
  return (
    <section className="section__indonesian-visa-service">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ delay: 0.2 })}
        >
          {title}
        </motion.h2>
        <Accordion list={serviceList} initDelay={0.4} oneDir={false} />
      </div>
    </section>
  );
};

export default IndonesianVisaProcessing;
