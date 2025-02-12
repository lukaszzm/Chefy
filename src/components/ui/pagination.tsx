import * as React from "react";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import type { ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} data-slot="pagination-content" {...props} />;
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

interface PaginationLinkProps extends Pick<ButtonProps, "size">, React.ComponentProps<typeof Link> {
  isActive?: boolean;
  disabled?: boolean;
}

function PaginationLink({ className, isActive, size = "icon", disabled, ...props }: PaginationLinkProps) {
  return (
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
      data-slot="pagination-link"
      tabIndex={disabled ? -1 : undefined}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pl-2.5", className)}
      data-slot="pagination-previous"
      size="default"
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only sm:not-sr-only">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pr-2.5", className)}
      data-slot="pagination-next"
      size="default"
      {...props}
    >
      <span className="sr-only sm:not-sr-only">Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      data-slot="pagination-ellipsis"
      aria-hidden
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
