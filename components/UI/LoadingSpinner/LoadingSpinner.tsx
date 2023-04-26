import classNames from "classnames";

interface ILoadingSpinnerProps {
  color: "red" | "white" | "gray";
  size: "sm" | "md";
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  color,
  size,
}) => {
  const style = classNames(
    "border-t-transparent border-solid animate-spin rounded-full m-auto",
    {
      "border-2 h-5 w-5 m-auto": size === "sm",
      "border-4 h-10 w-10 m-auto": size === "md",
      "border-red-500": color === "red",
      "border-white": color === "white",
      "border-gray-400": color === "gray",
    }
  );

  return <div className={style} role="status"></div>;
};
