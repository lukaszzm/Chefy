import classNames from "classnames";

interface TagProps {
  children: React.ReactNode;
  color?: "blue" | "orange";
}

export const Tag = ({ children, color }: TagProps) => {
  const style = classNames(
    "font-medium text-sm p-1 h-8 m-1 border-2  rounded-lg text-center",
    {
      "bg-blue-500 text-white border-blue-500": color === "blue",
      "bg-orange-600 text-white border-orange-600": color === "orange",
      "text-gray-700 bg-gray-100 border-gray-200": color === undefined,
    }
  );

  return <p className={style}>{children}</p>;
};
