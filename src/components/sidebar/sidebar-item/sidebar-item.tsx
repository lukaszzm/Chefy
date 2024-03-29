"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

interface SidebarBaseProps {
  label: string;
  icon: React.ReactNode;
  className?: string;
}

interface SidebarLinkProps extends SidebarBaseProps {
  asLink: true;
  href: string;
  onClick?: never;
}

interface SidebarButtonProps extends SidebarBaseProps {
  asLink?: never;
  onClick?: () => void;
  href?: never;
}

type SidebarItemProps = SidebarLinkProps | SidebarButtonProps;

// TODO: try to refactor
export const SidebarItem = ({ label, icon, asLink, href, onClick, className }: SidebarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  const content = asLink ? (
    <Link href={href}>
      {icon}
      <span className="sr-only lg:not-sr-only">{label}</span>
    </Link>
  ) : (
    <>
      {icon}
      <span className="sr-only lg:not-sr-only">{label}</span>
    </>
  );

  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Button
            aria-label={label}
            asChild={asLink}
            className={cn(
              "flex w-full min-w-0 items-center justify-center gap-3 rounded-none py-8 text-lg text-accent-foreground/40 hover:bg-accent hover:text-accent-foreground/90 sm:justify-start sm:rounded-lg sm:p-5 sm:py-6 lg:pr-12",
              isActive &&
                "font-bold text-primary sm:bg-primary sm:font-medium sm:text-white sm:hover:bg-primary/90 sm:hover:text-primary-foreground",
              className
            )}
            variant="ghost"
            onClick={onClick}
          >
            {content}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="hidden sm:block lg:hidden" side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
