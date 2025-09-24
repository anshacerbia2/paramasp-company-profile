import logo from "@/assets/images/logo-paramasp.png";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES_NAVIGATION_PATHS } from "@/constants/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

type Item = {
  id: number;
  title: string;
  href: string;
};

type Group = {
  id: number;
  title: string;
  items: Item[];
};

const hrefs = [["/about"], SERVICES_NAVIGATION_PATHS.map((key) => key)];

const Footer = () => {
  const footer = useTranslations("footer");

  const groups: Group[] = [1, 2].map((g, gi) => {
    const title = footer(`groups.${g}.name`);
    const items = Object.keys({ ...footer.raw(`groups.${g}`) })
      .filter((k) => k !== "name")
      .map((k, ii) => ({
        id: +k,
        title: footer(`groups.${g}.${k}.title`),
        href: hrefs[gi][ii],
      }));

    return {
      id: g,
      title,
      items,
    };
  });

  return (
    <footer id="footer">
      <div className="container">
        <div className="group">
          <Image src={logo} width={50} alt="paramasp-logo" />
          <span className="company-name">Paramasp</span>
          <p>
            Allure Mansion Blok M1 Rt.001 Rw.003, Jatimurni, Pondok Melati Kota
            Bekasi, Jawa Barat 17431.
          </p>

          <div className="contact">
            <a href="tel:+622122179146">
              <FaPhoneAlt /> 021 22179146
            </a>
            <a href="mailto:noor@paramasp.com">
              <MdEmail /> cs@paramasp.com
            </a>
          </div>
        </div>
        {groups.map((g) => {
          return (
            <div key={g.id} className="group">
              <span className="group__title">{g.title}</span>
              <ul>
                {g.items.map((i) => (
                  <li key={i.id}>
                    <Link href={i.href}>{i.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="copyright">
        © 2025. PT. Parama Satya Pertiwi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
