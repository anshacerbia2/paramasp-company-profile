import { Metadata } from "next";
import { ReactNode } from "react";

type Rootlayout = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/images/paramasp-icon.png",
    shortcut: "/images/paramasp-icon.png",
  },
};

const Rootlayout = ({ children }: Rootlayout) => {
  return <>{children}</>;
};

export default Rootlayout;
