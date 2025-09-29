"use client";

import logo from "@/assets/images/logo-paramasp.png";

import { memo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NavMenuChildProps } from "./NavigationWrapper";
import LocaleSwitcher from "./LocaleSwitch";
import Dropdown from "./Dropdown";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = ({
  pathname,
  navMenus,
  width,
  scrolled = false,
  openSidebar = false,
  setOpenSidebar,
}: NavMenuChildProps) => {
  const words = useTranslations("global.words");
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);

  return (
    <header id="header" className={scrolled ? "solid" : ""}>
      <div className="container">
        <nav className="navbar">
          <Link href="/" className="logo">
            <Image src={logo} height={50} alt="paramasp-logo" />
            <div>Paramasp</div>
          </Link>
          <div className="menu-wrapper">
            {(width === undefined || (width && width > 768)) && (
              <ul>
                {navMenus.map((nav, i) => (
                  <li
                    key={i}
                    className={nav.childs ? "has-dropdown" : ""}
                    onMouseLeave={() => setHoveredMenuIndex(null)}
                  >
                    {nav.href && nav.href !== pathname ? (
                      <Link
                        className={`menu-item${
                          hoveredMenuIndex == i ? " active" : ""
                        }`}
                        href={nav.href}
                        onMouseEnter={() => setHoveredMenuIndex(i)}
                      >
                        {nav.label}
                      </Link>
                    ) : (
                      <span
                        className={`menu-item${
                          hoveredMenuIndex == i ? " active" : ""
                        }`}
                        onMouseEnter={() => setHoveredMenuIndex(i)}
                      >
                        {nav.label}
                      </span>
                    )}

                    {/* Render dropdown jika ada childs */}
                    {nav.childs && (
                      <Dropdown
                        items={nav.childs.map((v) => ({
                          label: v.label,
                          href: v.href!,
                        }))}
                        isHover={hoveredMenuIndex === i}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="navbar__actions">
              <LocaleSwitcher />
              {width && width <= 768 && (
                <button
                  type="button"
                  aria-label={
                    openSidebar
                      ? words("aria-label-close-sidebar")
                      : words("aria-label-open-sidebar")
                  }
                  className="btn toggle-sidebar"
                  onClick={() => setOpenSidebar((prev: boolean) => !prev)}
                >
                  <HiOutlineMenuAlt3 />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
