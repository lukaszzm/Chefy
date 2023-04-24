import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import { PaginationButton } from "../PaginationButton/PaginationButton";

interface IPaginationProps {
  currentPage: number;
  pageCount: number;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  pageCount,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <div className="p-1 w-full flex justify-center items-center mt-auto">
      <PaginationButton
        toPage={1}
        disabled={isFirstPage}
        aria-label="first-page"
      >
        <FiChevronsLeft />
      </PaginationButton>
      <PaginationButton
        toPage={currentPage - 1}
        disabled={isFirstPage}
        aria-label="previous-page"
      >
        <FiChevronLeft />
      </PaginationButton>
      {currentPage - 1 > 1 && (
        <div className="m-2">
          <FiMoreHorizontal />
        </div>
      )}
      {!isFirstPage && (
        <PaginationButton toPage={currentPage - 1}>
          {currentPage - 1}
        </PaginationButton>
      )}
      <PaginationButton active toPage={currentPage}>
        {currentPage}
      </PaginationButton>
      {!isLastPage && (
        <PaginationButton toPage={currentPage + 1}>
          {currentPage + 1}
        </PaginationButton>
      )}
      {currentPage + 1 < pageCount && (
        <div className="m-2">
          <FiMoreHorizontal />
        </div>
      )}
      <PaginationButton
        toPage={currentPage + 1}
        disabled={isLastPage}
        aria-label="next-page"
      >
        <FiChevronRight />
      </PaginationButton>
      <PaginationButton
        toPage={pageCount}
        disabled={isLastPage}
        aria-label="last-page"
      >
        <FiChevronsRight />
      </PaginationButton>
    </div>
  );
};
