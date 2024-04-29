import * as React from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import type { ButtonProps } from "@/components/new_ui/button";
import { buttonVariants } from "@/components/new_ui/button";
import { cn } from "@/utils/cn";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    role="navigation"
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul className={cn("flex flex-row items-center gap-1", className)} ref={ref} {...props} />
  )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li className={cn("", className)} ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, size = "icon", disabled, ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size,
      }),
      className,
      disabled && "pointer-events-none opacity-50"
    )}
    tabIndex={disabled ? -1 : undefined}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("min-w-0 gap-1 sm:min-w-20 sm:pl-2.5", className)}
    size="default"
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only sm:not-sr-only">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("min-w-0 gap-1 sm:min-w-20 sm:pr-2.5", className)}
    size="default"
    {...props}
  >
    <span className="sr-only sm:not-sr-only">Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className={cn("flex h-9 w-9 items-center justify-center", className)} aria-hidden {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
