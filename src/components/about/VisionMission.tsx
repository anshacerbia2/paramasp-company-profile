"use client";

import vm from "@/assets/images/vision-mission.jpg";

import { memo, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PiTargetBold } from "react-icons/pi";
import { IoGlobeOutline } from "react-icons/io5";
import { CONTAINER_VARIANT, ITEM_VARIANT_X } from "@/constants/motions";

export type VisionMissionProps = {
  tag: string;
  title: string;
  paragraph: string;
  vision: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
};

const VisionMission = ({
  tag,
  title,
  paragraph,
  vision,
  mission,
}: VisionMissionProps) => {
  const cards = useMemo(() => {
    return [
      {
        icon: <IoGlobeOutline />,
        title: vision.title,
        content: vision.content,
      },
      {
        icon: <PiTargetBold />,
        title: mission.title,
        content: mission.content,
      },
    ];
  }, [vision, mission]);

  return (
    <section className="section__vision-mission">
      <div className="container">
        <div className="vision-mission">
          <motion.div
            className="vision-mission__content"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={CONTAINER_VARIANT({})}
          >
            <motion.div className="section__tag" variants={ITEM_VARIANT_X({})}>
              {tag}
            </motion.div>

            <motion.h2 variants={ITEM_VARIANT_X({})}>{title}</motion.h2>

            <motion.p variants={ITEM_VARIANT_X({})}>{paragraph}</motion.p>

            <motion.div
              className="blue-card__container"
              variants={ITEM_VARIANT_X({
                staggerChildren: 0.2,
                when: "beforeChildren",
              })}
            >
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className="blue-card__item"
                  variants={ITEM_VARIANT_X({})}
                >
                  {card.icon}
                  <div>
                    <span className="section__tag">{card.title}</span>
                    <p>{card.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="vision-mission__image"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ITEM_VARIANT_X({ duration: 0.6, x: -50 })}
          >
            <Image
              src={vm}
              alt="paramasp-vision-mission"
              width={700}
              height={700}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(VisionMission);
