import classNames from "classnames";
import { LoadingSpinner } from "./LoadingSpinner";

interface IButtonProps {
  children: React.ReactNode;
  variant: "primary" | "danger" | "outline-danger";
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  variant,
  disabled,
  isLoading,
  fullWidth,
  onClick,
}) => {
  const style = classNames(
    "font-medium disabled:opacity-60 py-2 min-w-[6rem] my-2 disabled:pointer-events-none rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out border",
    {
      "border-primary bg-primary text-white hover:bg-primary-hover hover:border-primary-hover focus:bg-primary-hover focus:border-primary-hover active:bg-primary-hover active:border-primary-hover":
        variant === "primary",
      "border-red-400 bg-red-400 text-white hover:bg-red-500 hover:border-red-500 focus:bg-red-500 focus:border-red-500 active:bg-red-500 active:border-red-500":
        variant === "danger",
      "border-red-400 text-red-400 hover:bg-red-400 hover:text-white focus:bg-red-500 focus:border-red-500 active:bg-red-500 active:border-red-500":
        variant === "outline-danger",
      "w-full py-3": fullWidth,
    }
  );

  const loadingSpinnerColor =
    variant === "danger" || variant === "outline-danger" ? "red" : "white";

  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={style}
      onClick={onClick}
    >
      {isLoading ? <LoadingSpinner color={loadingSpinnerColor} /> : children}
    </button>
  );
};
