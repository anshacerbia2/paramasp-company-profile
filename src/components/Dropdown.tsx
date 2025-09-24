"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

type DropdownProps = {
  items: { label: string; href: string }[];
  isHover: boolean;
};
const slotWidth = 60;
const slotHeight = 60;

const Dropdown = ({ items, isHover }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  const [rows, setRows] = useState(1);
  const [totalSlots, setTotalSlots] = useState(0);
  // const [showMenu, setShowMenu] = useState(false);

  // hitung grid saat render + saat hover
  useEffect(() => {
    const calculateGrid = () => {
      if (dropdownRef.current) {
        const { offsetWidth, offsetHeight } = dropdownRef.current;
        const newCols = Math.max(1, Math.ceil(offsetWidth / slotWidth));
        const newRows = Math.max(1, Math.ceil(offsetHeight / slotHeight));
        setCols(newCols);
        setRows(newRows);
        setTotalSlots(newCols * newRows);
      }
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // handle showMenu sesuai isHover
  useEffect(() => {
    if (isHover) {
      // const maxDelay = 0.5;
      // const fadeDuration = 0.5;
      // const timeout = setTimeout(
      //   () => setShowMenu(true),
      //   (maxDelay + fadeDuration) * 1000
      // );
      // return () => clearTimeout(timeout);
    } else {
      // setShowMenu(false);
    }
  }, [isHover]);

  const slots = Array.from({ length: totalSlots });

  return (
    <motion.div
      className="dropdown"
      ref={dropdownRef}
      initial="hidden"
      animate={isHover ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, visibility: "hidden" },
        visible: {
          opacity: isHover ? 1 : 0,
          visibility: isHover ? "visible" : "hidden",
          transition: {
            duration: 0.2,
            staggerChildren: 0.2,
            when: "beforeChildren",
          },
        },
      }}
    >
      {/* Slot Background */}
      <div
        className="dropdown__slots-container"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${slotWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${slotHeight}px)`,
        }}
      >
        {slots.map((_, i) => (
          <motion.div
            key={i}
            className="dropdown__slot"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHover ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: Math.random() * 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Menu */}
      <ul className="dropdown__menu">
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          >
            <Link href={item.href}>{item.label}</Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Dropdown;
