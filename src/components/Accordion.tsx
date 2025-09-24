"use client";

import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GoChevronDown } from "react-icons/go";
import { ITEM_VARIANT_X, ITEM_VARIANT_Y } from "@/constants/motions";

type AccordionItem = {
  title: string;
  description: string | ReactNode;
};

export type AccordionProps = {
  list: AccordionItem[];
  initDelay?: number;
  oneDir?: boolean;
  showNav?: boolean;
};

const Accordion = ({
  list,
  initDelay = 0,
  oneDir = true,
  showNav = false,
}: AccordionProps) => {
  const btnRef = useRef<HTMLDivElement[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [btnHeight, setBtnHeight] = useState<number[]>();

  const toggleActive = (index: number) => {
    setOpenIndexes((prev) => {
      if (prev.includes(index)) return [];
      return [index];
    });
    // setOpenIndexes((preva) =>
    //   prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    // );
  };

  useLayoutEffect(() => {
    const value = btnRef.current.map((el) => el.offsetHeight);
    setBtnHeight(value);
  }, [openIndexes]);

  return (
    <ul className="accordion">
      {list.map((service, index, arr) => (
        <li key={index}>
          {showNav && (
            <motion.div
              className={`accordion__nav${
                openIndexes.includes(index) ? " active" : ""
              }`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={ITEM_VARIANT_Y({
                index,
                initDelay,
                oneDir,
              })}
            >
              <span
                className="accordion__number"
                style={
                  btnHeight?.[index]
                    ? {
                        top: `${btnHeight[index] / 2}px`,
                        transform: "translateY(-50%)",
                      }
                    : {}
                }
              >
                {index + 1}
              </span>
              <div
                className="accordion__line"
                style={
                  btnHeight?.[index] && index === 0
                    ? {
                        top: `${btnHeight[index] / 2}px`,
                      }
                    : btnHeight?.[index] && index === arr.length - 1
                    ? {
                        bottom: "unset",
                        height: 15,
                      }
                    : {}
                }
              ></div>
            </motion.div>
          )}
          <motion.div
            className="accordion__wrapper"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ITEM_VARIANT_X({
              index,
              initDelay: initDelay + 0.2,
              delay: 0.2,
              oneDir,
            })}
          >
            <div
              ref={(el) => {
                if (el) btnRef.current[index] = el;
              }}
              className={`accordion__button${
                openIndexes.includes(index) ? " active" : ""
              }`}
              onClick={() => toggleActive(index)}
            >
              <span>{service.title}</span>
              <GoChevronDown />
            </div>

            <motion.div
              className="accordion__content"
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndexes.includes(index)
                  ? { height: "auto", opacity: 1 }
                  : {}
              }
              // exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {typeof service.description === "string" ? (
                <p>{service.description}</p>
              ) : (
                <div className="raw-content">{service.description}</div>
              )}
            </motion.div>
          </motion.div>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
