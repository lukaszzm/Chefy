import classNames from "classnames";
import Link from "next/link";

interface PaginationButtonProps {
  children: React.ReactNode;
  toPage: number;
  active?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export const PaginationButton = ({ children, toPage, active, disabled, ariaLabel }: PaginationButtonProps) => {
  const styles = classNames(
    "w-10 h-10 flex justify-center items-center rounded-lg shadow-sm hover:shadow-md font-medium disabled:pointer-events-none rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out",
    {
      "bg-gray-100 text-gray-900 hover:bg-gray-200": !active,
      "bg-primary text-white hover:bg-primary-hover": active,
    }
  );

  return (
    <Link
      className={classNames("mx-1", { "pointer-events-none": disabled })}
      href={{
        pathname: "/likes",
        query: { page: toPage },
      }}
    >
      <button aria-label={ariaLabel} className={styles} disabled={disabled}>
        {children}
      </button>
    </Link>
  );
};
