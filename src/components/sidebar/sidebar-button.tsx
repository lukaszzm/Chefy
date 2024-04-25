import { forwardRef } from "react";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

interface SidebarButtonProps extends ButtonProps {
  isActive?: boolean;
  label: string;
}

export const SidebarButton = forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ isActive, className, label, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            <Button
              aria-label={label}
              className={cn(
                "flex w-full min-w-0 items-center justify-center gap-3 rounded-none py-8 text-lg text-muted-foreground hover:bg-accent hover:text-foreground sm:justify-start sm:rounded-lg sm:p-5 sm:py-6 lg:pr-12",
                isActive &&
                  "font-bold text-primary sm:bg-primary sm:font-medium sm:text-white sm:hover:bg-primary/90 sm:hover:text-primary-foreground",
                className
              )}
              ref={ref}
              variant="ghost"
              {...props}
            />
          </TooltipTrigger>
          <TooltipContent className="hidden sm:block lg:hidden" side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

SidebarButton.displayName = "SidebarButton";
