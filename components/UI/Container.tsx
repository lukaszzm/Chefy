import classNames from "classnames";
import { useRouter } from "next/router";

interface IContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<IContainerProps> = ({ children }) => {
  const router = useRouter();

  const innerContainerStyles = classNames(
    "bg-gray-50 p-2 sm:p-6 sm:m-4 rounded-lg shadow-lg text-center flex flex-col w-full h-[calc(100svh-4rem)] sm:h-auto overflow-auto sm:max-w-md sm:min-h-[43rem]",
    {
      "sm:max-h-[41rem]": router.pathname === "/explore",
      "md:max-w-5xl": router.pathname === "/settings",
    }
  );

  return (
    <div className="w-full min-h-screen h-full sm:ml-[8rem] md:ml-[16rem] flex justify-center items-start sm:items-center">
      <div className={innerContainerStyles}>{children}</div>
    </div>
  );
};
