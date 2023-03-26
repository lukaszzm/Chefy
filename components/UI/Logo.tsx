import Image from "next/image";
import icon from "@/public/logo.svg";
import classNames from "classnames";

interface ILogoProps {
  hideInMobile?: boolean;
}

export const Logo: React.FC<ILogoProps> = ({ hideInMobile }) => {
  const styles = classNames("w-auto", {
    "hidden sm:flex": hideInMobile,
    flex: !hideInMobile,
  });

  return (
    <div className={styles}>
      <Image
        src={icon}
        alt="Chefy Logo"
        height={12}
        width={12}
        className="w-10 h-auto mx-1"
      />
      <p className="hidden font-medium text-4xl md:block">Chefy</p>
    </div>
  );
};
