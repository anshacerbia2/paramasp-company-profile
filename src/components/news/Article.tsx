"use client";

import DOMPurify from "isomorphic-dompurify";
import { motion } from "framer-motion";
import { ITEM_VARIANT_Y } from "@/constants/motions";
import { Link } from "@/i18n/navigation";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export type ArticleProps = {
  content: string;
  navigation?: {
    prev?: {
      tag: string;
      label: string;
      href: string;
    };
    next?: {
      tag: string;
      label: string;
      href: string;
    };
  };
};

const Article = ({ content, navigation }: ArticleProps) => {
  const safeHTML = DOMPurify.sanitize(content);
  return (
    <div className="container">
      <motion.article
        dangerouslySetInnerHTML={{ __html: safeHTML }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={ITEM_VARIANT_Y({ delay: 0.6 })}
      ></motion.article>
      {navigation && (
        <motion.div
          className="article-navigation"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({})}
        >
          {navigation.prev && (
            <div className="prev">
              <Link href={navigation.prev.href}>
                <GoChevronLeft />
                <div>
                  <span>{navigation.prev.tag}</span>
                  <div>{navigation.prev.label}</div>
                </div>
              </Link>
            </div>
          )}
          {navigation.next && (
            <div className="next">
              <Link href={navigation.next.href}>
                <div>
                  <span>{navigation.next.tag}</span>
                  <div>{navigation.next.label}</div>
                </div>
                <GoChevronRight />
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Article;
