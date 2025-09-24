"use client";

import { useInterval } from "@/hooks";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CONTAINER_VARIANT, ITEM_VARIANT_Y } from "@/constants/motions";

type Card = {
  id: number;
  client: string;
  testimony: string;
  company: string;
  position: string;
};

const cards: Card[] = [
  {
    id: 1,
    client: "John Doe",
    testimony:
      "This service exceeded my expectations. Everything was smooth and professional.",
    company: "TechCorp",
    position: "Software Engineer",
  },
  {
    id: 2,
    client: "Jane Smith",
    testimony:
      "I really appreciated the support team. They were responsive and very helpful.",
    company: "FinServe",
    position: "Product Manager",
  },
  {
    id: 3,
    client: "Michael Johnson",
    testimony:
      "The overall experience was fantastic. I would definitely recommend it to others.",
    company: "EduGlobal",
    position: "CEO",
  },
  {
    id: 4,
    client: "Emily Davis",
    testimony:
      "Great attention to detail and excellent customer service throughout the process.",
    company: "HealthFirst",
    position: "HR Specialist",
  },
  {
    id: 5,
    client: "David Lee",
    testimony:
      "They delivered on time and the results were even better than I hoped for.",
    company: "DesignHub",
    position: "Creative Director",
  },
  {
    id: 6,
    client: "Sophia Martinez",
    testimony:
      "A seamless experience from start to finish. Highly recommended!",
    company: "RetailOne",
    position: "Marketing Lead",
  },
];

const DEFAULT_TRANSITION = "";

const CARD_IN_VIEWPORT = 3;
const CARD_MARGIN = 24;
const OFFSET_PERCENT = -100 / (CARD_IN_VIEWPORT + 1);

export default function TestimonialCarousel() {
  const carouselRowRef = useRef<HTMLDivElement | null>(null);
  const [trackTransform, setTrackTransform] = useState(0);
  const [trackTransition, setTrackTransition] = useState(DEFAULT_TRANSITION);
  const [pattern, setPattern] = useState<number[]>([cards.length - 1, 0, 1]);
  const [dir, setDir] = useState<"" | "left" | "right">("");
  const [autoDelay, setAutoDelay] = useState<number | null>(4000);

  const CARD_WIDTH = `calc((100% / ${CARD_IN_VIEWPORT}) - ${CARD_MARGIN}px)`;

  useInterval(() => handleCarouselNext(true), autoDelay);

  useEffect(() => {
    if (dir === "left") {
      setTrackTransition(DEFAULT_TRANSITION);
      setTrackTransform(0);
    } else if (dir == "right") {
      setTrackTransition(DEFAULT_TRANSITION);
      setTrackTransform(OFFSET_PERCENT);
    }
  }, [dir]);

  const handleCarouselPrev = () => {
    if (dir) return;
    const value = pattern[0] - 1;
    const newPattern = [...pattern];
    newPattern.unshift(value >= 0 ? value : cards.length - 1);

    setAutoDelay(null);
    setDir("left");
    setTrackTransition("none");
    setPattern(newPattern);
    setTrackTransform(OFFSET_PERCENT);
  };

  const handleCarouselNext = (auto = false) => {
    if (dir) return;
    const value = pattern[pattern.length - 1] + 1;
    const newPattern = [...pattern];
    newPattern.push(value <= cards.length - 1 ? value : 0);

    if (!auto) setAutoDelay(null);
    setDir("right");
    setTrackTransition("none");
    setPattern(newPattern);
  };

  const carouselTransitionEnd = () => {
    const newPattern = [...pattern];
    if (dir === "left") newPattern.pop();
    else if (dir === "right") newPattern.shift();

    if (autoDelay === null) setAutoDelay(4000);
    setTrackTransition("none");
    setTrackTransform(0);
    setPattern(newPattern);
    setDir("");
  };

  const middleIndex = () => {
    const mid = pattern.length / 2;
    if (dir == "right") return pattern.length - Math.floor(mid);
    else if (dir == "left") return pattern.length - Math.floor(mid) - 1;

    return Math.floor(mid);
  };

  return (
    <section className="section__testimonial">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={CONTAINER_VARIANT({})}
      >
        <motion.div className="section__tag" variants={ITEM_VARIANT_Y({})}>
          Testimonials
        </motion.div>
        <motion.h2 variants={ITEM_VARIANT_Y({})}>
          Hear what our clients have to say
        </motion.h2>

        <motion.div className="carousel" variants={ITEM_VARIANT_Y({})}>
          <div className="carousel__viewport">
            <div
              ref={carouselRowRef}
              className="carousel__track"
              style={{
                width: `${pattern.length * (100 / CARD_IN_VIEWPORT)}%`,
                transform: `translateX(${trackTransform}%)`,
                transition: trackTransition,
              }}
              onTransitionEnd={carouselTransitionEnd}
            >
              {pattern.map((v, i) => {
                const card = cards[v];
                const isCenter = i === middleIndex();
                return (
                  // FIX: pakai key yang stabil (card.id atau v), jangan index 'i'
                  <div
                    key={card.id}
                    className={`carousel__card ${
                      isCenter ? "active" : "blurred"
                    }`}
                    style={{
                      width: CARD_WIDTH,
                      margin: `${CARD_MARGIN / 2}px`,
                    }}
                  >
                    <div className="carousel__card__content">
                      <div className="header">
                        <p className="client">
                          <span>{card.client}</span>
                          <span>
                            {card.position}, {card.company}
                          </span>
                        </p>
                        <FaQuoteRight />
                      </div>
                      <p className="testimony">{card.testimony}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            className="btn carousel__btn carousel__btn--prev"
            onClick={handleCarouselPrev}
          >
            <div>
              <span>
                <GoChevronLeft />
              </span>
              <span>
                <GoChevronLeft />
              </span>
            </div>
          </button>
          <button
            type="button"
            className="btn carousel__btn carousel__btn--next"
            onClick={() => handleCarouselNext()}
          >
            <div>
              <span>
                <GoChevronRight />
              </span>
              <span>
                <GoChevronRight />
              </span>
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
