import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

import type { ButtonProps } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

function Pagination({ ref, className, ...props }: React.ComponentProps<"nav">) {
  const t = useTranslations("common.pagination");

  return (
    <nav
      ref={ref}
      data-slot="pagination"
      role="navigation"
      aria-label={t("ariaLabel")}
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
  const t = useTranslations("common.pagination");

  return (
    <PaginationLink
      ref={ref}
      data-slot="pagination-previous"
      size="default"
      aria-label={t("previousPage")}
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="sr-only sm:not-sr-only">{t("previous")}</span>
    </PaginationLink>
  );
}

function PaginationNext({ ref, className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  const t = useTranslations("common.pagination");

  return (
    <PaginationLink
      ref={ref}
      data-slot="pagination-next"
      size="default"
      aria-label={t("nextPage")}
      className={cn("min-w-0 gap-1 sm:min-w-20 sm:pr-2.5", className)}
      {...props}
    >
      <span className="sr-only sm:not-sr-only">{t("next")}</span>
      <ChevronRightIcon className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ ref, className, ...props }: React.ComponentProps<"span">) {
  const t = useTranslations("common.pagination");

  return (
    <span
      ref={ref}
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      aria-hidden
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">{t("morePages")}</span>
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
