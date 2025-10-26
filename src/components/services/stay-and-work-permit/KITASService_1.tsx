"use client";

import { motion } from "framer-motion";

import { memo } from "react";
import Image from "next/image";
import Accordion, { AccordionProps } from "@/components/Accordion";
import { ITEM_VARIANT_X, ITEM_VARIANT_Y } from "@/constants/motions";

export type KITASService_1_Props = {
  bottomShape?: boolean;
  title: string;
  list: AccordionProps["list"];
};

const KITASService_1 = ({
  bottomShape = false,
  title,
  list,
}: KITASService_1_Props) => {
  return (
    <section
      className={`section__kitas__service-1${bottomShape ? " with-shape" : ""}`}
    >
      <div className="container">
        <div className="service-1">
          <div className="service-1__content">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ITEM_VARIANT_X({})}
            >
              {title}
            </motion.h2>

            <Accordion list={list} initDelay={0.2} showNav />
          </div>
          <motion.div
            className="service-1__image"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ITEM_VARIANT_Y({ duration: 1, initDelay: 0.2, y: -50 })}
          >
            <Image
              src="/images/izin-tinggal-tenaga-kerja-asing-baru.jpg"
              alt={title}
              width={1000}
              height={600}
            />
          </motion.div>
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

export default memo(KITASService_1);
