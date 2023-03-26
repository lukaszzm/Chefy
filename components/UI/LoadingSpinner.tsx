import classNames from "classnames";

interface ILoadingSpinnerProps {
  color?: "red" | "white";
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ color }) => {
  const style = classNames(
    "border-t-transparent border-solid animate-spin rounded-full border-2 h-5 w-5 m-auto",
    {
      "border-red-500": color === "red",
      "border-white": color !== "red",
    }
  );

  return <div className={style}></div>;
};
