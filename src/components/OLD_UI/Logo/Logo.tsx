import classNames from "classnames";
import Image from "next/image";

import icon from "@/public/logo.svg";

interface LogoProps {
  hideInMobile?: boolean;
}

export const Logo = ({ hideInMobile }: LogoProps) => {
  const styles = classNames("w-auto", {
    "hidden sm:flex": hideInMobile,
    flex: !hideInMobile,
  });

  return (
    <div className={styles}>
      <Image alt="Chefy Logo" className="mx-1 h-auto w-10" height={12} src={icon} width={12} />
      <p className="hidden text-4xl font-medium md:inline-block">Chefy</p>
    </div>
  );
};
