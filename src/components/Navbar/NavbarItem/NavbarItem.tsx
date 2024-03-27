import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuItemProps {
  icon: JSX.Element;
  text: string;
  type?: "button";
  onClick?: () => void;
}

export const NavbarItem = ({ icon, text, type, onClick }: MenuItemProps) => {
  const router = useRouter();
  const style = classNames(
    "p-4 w-full my-0 sm:w-auto sm:m-2 rounded-none font-medium text-lg sm:my-3 sm:mx-4 sm:px-10 flex md:gap-4 justify-around items-center sm:justify-start sm:rounded-3xl",
    {
      "text-primary bg-secondary rounded-3xl shadow-sm": router.pathname === `/${text}`,
      "text-gray-400 hover:text-gray-700 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out":
        router.pathname !== `/${text}`,
    }
  );

  if (type === "button")
    return (
      <button className={style} onClick={onClick}>
        {icon}
        <p className="hidden capitalize md:block">{text}</p>
      </button>
    );

  return (
    <Link className={style} href={text}>
      {icon}
      <p className="hidden capitalize md:block">{text}</p>
    </Link>
  );
};
