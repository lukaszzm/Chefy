import classNames from "classnames";

interface ITagProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "orange";
}

export const Tag: React.FC<ITagProps> = (props) => {
  const { children, className, color } = props;

  const style = classNames(
    "font-medium text-sm p-1 h-8 m-1 text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-lg text-center",
    {
      "bg-blue-500 text-white border-blue-500": color === "blue",
      "bg-orange-600 text-white border-orange-600": color === "orange",
    }
  );

  return <p className={`${style} ${className}`}>{children}</p>;
};
