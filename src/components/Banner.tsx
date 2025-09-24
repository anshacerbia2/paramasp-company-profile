"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { FiChevronsRight } from "react-icons/fi";
import {
  CONTAINER_VARIANT,
  ITEM_VARIANT_X,
  ITEM_VARIANT_Y,
} from "@/constants/motions";

type BannerBreadCrumbItem = {
  label: string;
  href: string | null;
};

export type BannerProps = {
  useH1?: boolean;
  bannerImgPath: string;
  tag?: string;
  title: string;
  breadcrumb?: BannerBreadCrumbItem[];
  excerpt?: string;
  published?: string;
};

export default function Banner({
  useH1 = false,
  bannerImgPath,
  tag,
  title,
  excerpt,
  breadcrumb,
  published,
}: BannerProps) {
  return (
    <section
      className="section__banner"
      style={{ backgroundImage: `url("${bannerImgPath}")` }}
    >
      <div className="container">
        <motion.div
          className="content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={CONTAINER_VARIANT({})}
        >
          <div>
            {tag && (
              <motion.div
                className="content__tag"
                variants={ITEM_VARIANT_Y({})}
              >
                {tag}
              </motion.div>
            )}

            {useH1 ? (
              <motion.h1
                className="content__title"
                variants={ITEM_VARIANT_Y({})}
              >
                {title}
              </motion.h1>
            ) : (
              <motion.div
                className="content__title"
                variants={ITEM_VARIANT_Y({})}
              >
                {title}
              </motion.div>
            )}
          </div>

          {excerpt && (
            <motion.p
              className="content__excerpt"
              variants={ITEM_VARIANT_Y({})}
            >
              {excerpt}
            </motion.p>
          )}

          {published && (
            <motion.p
              className="content__published"
              variants={ITEM_VARIANT_Y({})}
            >
              {new Date(published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>
          )}
          {breadcrumb && !excerpt && (
            <motion.div className="breadcrumb" variants={ITEM_VARIANT_X({})}>
              {breadcrumb.map((obj, idx, arr) => {
                return (
                  <Fragment key={idx}>
                    {idx !== 0 && <FiChevronsRight />}
                    {obj.href ? (
                      <Link
                        href={obj.href}
                        className={`${arr.length - 1 === idx ? "active" : ""}`}
                      >
                        {obj.label}
                      </Link>
                    ) : (
                      <span
                        className={`${arr.length - 1 === idx ? "active" : ""}`}
                      >
                        {obj.label}
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
