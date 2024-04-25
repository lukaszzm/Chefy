"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { routes } from "@/config/routes";
import { dynamicRoute } from "@/utils/dynamic-route";

interface LikesPaginationProps {
  page: number;
  lastPage: number;
}

export const LikesPagination = ({ page, lastPage }: LikesPaginationProps) => {
  const searchParams = useSearchParams();

  const isFirstPage = page === 1;
  const isLastPage = lastPage === page;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={isFirstPage}
            href={dynamicRoute(routes.likes, searchParams, "page", (page - 1).toString())}
          />
        </PaginationItem>

        {page > 2 && (
          <PaginationItem>
            <PaginationLink href={dynamicRoute(routes.likes, searchParams, "page", "1")}>{1}</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {!isFirstPage && (
          <PaginationItem>
            <PaginationLink href={dynamicRoute(routes.likes, searchParams, "page", (page - 1).toString())}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={dynamicRoute(routes.likes, searchParams, "page", page.toString())} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {!isLastPage && (
          <PaginationItem>
            <PaginationLink href={dynamicRoute(routes.likes, searchParams, "page", (page + 1).toString())}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < lastPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < lastPage - 1 && (
          <PaginationItem>
            <PaginationLink href={dynamicRoute(routes.likes, searchParams, "page", lastPage.toString())}>
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            disabled={lastPage === page}
            href={dynamicRoute(routes.likes, searchParams, "page", (page + 1).toString())}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
