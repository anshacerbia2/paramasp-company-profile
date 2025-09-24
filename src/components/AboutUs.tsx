"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CONTAINER_VARIANT, ITEM_VARIANT_X } from "@/constants/motions";

export type AboutUsProps = {
  tag: string;
  title: string;
  paragraph: string;
  commitment: {
    tag: string;
    list: string[];
  };
  button: string;
};

const aboutImages = [
  { src: "/images/about-1.jpg", alt: "Tim kami sedang berdiskusi strategi" },
  { src: "/images/about-2.jpg", alt: "Proses kerja dokumentasi profesional" },
  {
    src: "/images/about-3.jpg",
    alt: "Kolaborasi dengan klien secara intensif",
  },
];

const AboutUs = ({
  tag,
  title,
  paragraph,
  commitment,
  button,
}: AboutUsProps) => {
  return (
    <section className="section__about">
      <div className="container">
        <motion.div
          className="about"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={CONTAINER_VARIANT({})}
        >
          <motion.div
            className="about__image"
            variants={ITEM_VARIANT_X({ x: -50, initDelay: 0.2 })}
          >
            {aboutImages.map((slide, i) => (
              <Image
                key={`about-${i + 1}`}
                src={slide.src}
                alt={slide.alt}
                width={600}
                height={400}
                priority={i === 0} // pre-load slide pertama
              />
            ))}
          </motion.div>
          <div className="about__company">
            <motion.div className="section__tag" variants={ITEM_VARIANT_X({})}>
              {tag}
            </motion.div>
            <motion.h2 className="section__title" variants={ITEM_VARIANT_X({})}>
              {title}
            </motion.h2>
            <motion.p variants={ITEM_VARIANT_X({})}>{paragraph}</motion.p>
          </div>
          <div className="about__commitment">
            <motion.h2 className="section__tag" variants={ITEM_VARIANT_X({})}>
              {commitment.tag}
            </motion.h2>
            <motion.ul variants={ITEM_VARIANT_X({})}>
              {commitment.list.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </motion.ul>
            <motion.div variants={ITEM_VARIANT_X({})}>
              <Link href={"/about"} className="btn outline accent fit">
                {button}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
