"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import CountUp from "react-countup";

type FloatingCardItemProps = {
  id: number;
  count: number;
  text: string;
};

export type FloatingCardProps = {
  cards: FloatingCardItemProps[];
};

const opacityDuration = 600;

const getRandomDirection = () => {
  const offset = 120;
  const directions = [
    { x: 0, y: -offset },
    { x: 0, y: offset },
    { x: -offset, y: 0 },
    { x: offset, y: 0 },
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

function FloatingCardItem({ c, i }: { c: FloatingCardItemProps; i: number }) {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [startCount, setStartCount] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [done, setDone] = useState(false);

  const delay = i * 0.2 * 1000;

  useEffect(() => {
    setStart(getRandomDirection());
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(
        () => setStartCount(true),
        opacityDuration + delay
      );
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  if (!start) return null;

  return (
    <motion.div
      ref={ref}
      className="card"
      initial={{ opacity: 0, x: start.x, y: start.y, scale: 0.8 }}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: [0, -20, 20, 0],
              scale: 1,
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
        x: { duration: 0.8, ease: "easeOut", delay: i * 0.2 },
        scale: { duration: 0.8, ease: "backOut", delay: i * 0.2 },
        y: {
          duration: 3,
          ease: "easeInOut",
          repeat: inView ? Infinity : 0,
          repeatType: "mirror",
          delay: 0.8 + i * 0.2,
        },
      }}
      whileHover={{ scale: 1.05, rotate: -3 }}
    >
      {startCount && (
        <span className="counter">
          <CountUp
            end={c.count}
            duration={2.5}
            separator=","
            onEnd={() => setDone(true)}
          />
          {done && "+"}
        </span>
      )}
      <div className="counter-text">{c.text}</div>
    </motion.div>
  );
}

export default function FloatingCards({ cards }: FloatingCardProps) {
  return (
    <div className="cards-container">
      {cards.map((c, i) => (
        <FloatingCardItem key={c.id} c={c} i={i} />
      ))}
    </div>
  );
}
