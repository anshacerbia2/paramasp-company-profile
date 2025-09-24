import { Metadata } from "next";
import { ReactNode } from "react";

type Rootlayout = {
  children: ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo-paramasp.png",
    shortcut: "/images/logo-paramasp.png",
  },
};

const Rootlayout = ({ children }: Rootlayout) => {
  return <>{children}</>;
};

export default Rootlayout;
