import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight, FiMoreHorizontal } from "react-icons/fi";

import { PaginationButton } from "@/components/OLD_LIKES/PaginationButton";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
}

export const Pagination = ({ currentPage, pageCount }: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <div className="mt-auto flex w-full items-center justify-center p-1">
      <PaginationButton ariaLabel="first page" disabled={isFirstPage} toPage={1}>
        <FiChevronsLeft />
      </PaginationButton>
      <PaginationButton ariaLabel="previous page" disabled={isFirstPage} toPage={currentPage - 1}>
        <FiChevronLeft />
      </PaginationButton>
      {currentPage - 1 > 1 && (
        <div className="m-2">
          <FiMoreHorizontal />
        </div>
      )}
      {!isFirstPage && <PaginationButton toPage={currentPage - 1}>{currentPage - 1}</PaginationButton>}
      <PaginationButton toPage={currentPage} active>
        {currentPage}
      </PaginationButton>
      {!isLastPage && <PaginationButton toPage={currentPage + 1}>{currentPage + 1}</PaginationButton>}
      {currentPage + 1 < pageCount && (
        <div className="m-2">
          <FiMoreHorizontal />
        </div>
      )}
      <PaginationButton ariaLabel="next page" disabled={isLastPage} toPage={currentPage + 1}>
        <FiChevronRight />
      </PaginationButton>
      <PaginationButton ariaLabel="last page" disabled={isLastPage} toPage={pageCount}>
        <FiChevronsRight />
      </PaginationButton>
    </div>
  );
};
