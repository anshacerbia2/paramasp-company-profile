"use client";

import logo from "@/assets/images/logo-paramasp.png";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { NavMenuChildProps } from "./NavigationWrapper";
import LocaleSwitcher from "./LocaleSwitch";
import { CgClose } from "react-icons/cg";

const Sidebar = ({
  pathname,
  navMenus,
  openSidebar = false,
  setOpenSidebar,
}: NavMenuChildProps) => {
  const words = useTranslations("global.words");

  return (
    <aside id="sidebar" className={openSidebar ? "active" : ""}>
      <div className="container">
        <nav className="navbar">
          <div className="navbar__header">
            <Link href="/" className="logo">
              <Image src={logo} height={50} alt="paramasp-logo" />
              <div>Paramasp</div>
            </Link>
            <div>
              <LocaleSwitcher />
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
                <CgClose />
              </button>
            </div>
          </div>
          <div className="menu-wrapper">
            <ul>
              {navMenus.map((nav, i) => (
                <li key={i} className={nav.childs ? "has-dropdown" : ""}>
                  {nav.href && nav.href !== pathname ? (
                    <Link className={`menu-item`} href={nav.href}>
                      {nav.label}
                    </Link>
                  ) : (
                    <span className={`menu-item`}>{nav.label}</span>
                  )}

                  {/* Render dropdown jika ada childs */}
                  {nav.childs && (
                    <ul>
                      {nav.childs.map((obj, idx) => (
                        <li key={idx}>
                          {obj.href ? (
                            <Link href={obj.href} className={"menu-item"}>
                              {obj.label}
                            </Link>
                          ) : (
                            <span className={"menu-item"}>{obj.label}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default memo(Sidebar);
