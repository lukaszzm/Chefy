import classNames from "classnames";
import Link from "next/link";

interface IPaginationButtonProps {
  children: React.ReactNode;
  toPage: number;
  active?: boolean;
  disabled?: boolean;
}

export const PaginationButton: React.FC<IPaginationButtonProps> = ({
  children,
  toPage,
  active,
  disabled,
}) => {
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
      <button disabled={disabled} className={styles}>
        {children}
      </button>
    </Link>
  );
};