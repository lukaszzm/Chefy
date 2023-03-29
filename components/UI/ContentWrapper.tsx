import classNames from "classnames";

interface IContentWrapperProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const ContentWrapper: React.FC<IContentWrapperProps> = ({
  children,
  fullWidth,
  fullHeight,
}) => {
  const styles = classNames(
    "bg-gray-50 p-2 sm:p-6 sm:m-4 rounded-lg shadow-lg text-center flex flex-col w-full h-[calc(100svh-4rem)] sm:h-auto overflow-auto sm:max-w-md sm:min-h-[43rem]",
    {
      "sm:max-h-[41rem]": !fullHeight,
      "md:max-w-5xl": fullWidth,
    }
  );

  return <div className={styles}>{children}</div>;
};
