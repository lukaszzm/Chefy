import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

import type { ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

function Pagination({ ref, className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      ref={ref}
      data-slot="pagination"
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ ref, className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ref, ...props }: React.ComponentProps<"li">) {
  return <li ref={ref} data-slot="pagination-item" {...props} />;
}

interface PaginationLinkProps extends Pick<ButtonProps, "size">, React.ComponentProps<typeof Link> {
  isActive?: boolean;
  disabled?: boolean;
}

function PaginationLink({ ref, className, isActive, disabled, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <Link
      ref={ref}
      data-slot="pagination-link"
      tabIndex={disabled ? -1 : undefined}
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
      {...props}
    />
  );
}

function PaginationPrevious({ ref, className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      ref={ref}
      data-slot="pagination-previous"
      size="default"
      aria-label="Go to previous page"
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="sr-only sm:not-sr-only">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ ref, className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      ref={ref}
      data-slot="pagination-next"
      size="default"
      aria-label="Go to next page"
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pr-2.5", className)}
      {...props}
    >
      <span className="sr-only sm:not-sr-only">Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ ref, className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      ref={ref}
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
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
