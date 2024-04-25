import React from "react";

import type { InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

interface BadgeCheckboxProps extends InputProps {
  label: string;
}

export const BadgeCheckbox = React.forwardRef<HTMLInputElement, BadgeCheckboxProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <>
        <input className={cn("peer hidden", className)} id={id} ref={ref} type="checkbox" {...props} />
        <Label
          className="inline-flex cursor-pointer rounded-lg border border-border bg-transparent px-3.5 py-1.5 text-center text-xs text-muted-foreground transition duration-150 ease-in-out  hover:bg-muted/20 peer-checked:border-primary peer-checked:text-primary  peer-checked:hover:bg-accent"
          htmlFor={id}
        >
          {label}
        </Label>
      </>
    );
  }
);

BadgeCheckbox.displayName = "BadgeCheckbox";
