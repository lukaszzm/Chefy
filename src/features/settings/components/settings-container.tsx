import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

interface SettingsContainerProps extends HTMLAttributes<HTMLDivElement> {
  subtitle: string;
}

export const SettingsContainer = forwardRef<HTMLDivElement, SettingsContainerProps>(
  ({ className, subtitle, children, ...props }, ref) => {
    return (
      <div className={cn("w-full rounded-md border border-border p-4", className)} ref={ref} {...props}>
        <h2 className="mb-4 font-semibold text-muted-foreground">{subtitle}</h2>
        {children}
      </div>
    );
  }
);

SettingsContainer.displayName = "SettingsContainer";
