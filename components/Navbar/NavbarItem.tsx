import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/ui/Button";
import classNames from "classnames";

interface IMenuItemProps {
  icon: JSX.Element;
  text: string;
  type?: "button";
  onClick?: () => void;
}

export const NavbarItem: React.FC<IMenuItemProps> = (props) => {
  const { icon, text, type, onClick } = props;
  const router = useRouter();

  const style = classNames(
    "p-4 w-full my-0 sm:w-auto sm:m-2 rounded-none font-semibold text-lg sm:my-3 sm:mx-4 sm:px-10 flex md:gap-4 justify-around items-center sm:justify-between sm:rounded-3xl",
    {
      "text-primary bg-secondary rounded-3xl shadow-sm":
        router.pathname === `/${text}`,
      "text-gray-400 hover:text-gray-700 hover:bg-gray-200 hover:shadow-sm transition duration-150 ease-in-out":
        router.pathname !== `/${text}`,
    }
  );

  if (type === "button")
    return (
      <Button type="none" className={style} onClick={onClick}>
        {icon}
        <p className="hidden md:block capitalize">{text}</p>
      </Button>
    );

  return (
    <Link href={text} className={style}>
      {icon}
      <p className="hidden md:block capitalize">{text}</p>
    </Link>
  );
};
