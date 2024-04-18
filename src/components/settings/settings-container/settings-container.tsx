import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

interface SettingsContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const SettingsContainer = forwardRef<HTMLDivElement, SettingsContainerProps>(({ className, ...props }, ref) => {
  return <div className={cn("w-full rounded-md border border-border p-4", className)} ref={ref} {...props} />;
});

SettingsContainer.displayName = "SettingsContainer";
