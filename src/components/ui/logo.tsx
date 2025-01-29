import { forwardRef } from "react";

import { ChefHat } from "lucide-react";

import { cn } from "@/utils/cn";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  withText?: boolean;
}

export const Logo = forwardRef<HTMLDivElement, LogoProps>(({ withText, className, ...props }, ref) => {
  return (
    <div className={cn("flex items-center gap-2", className)} ref={ref} {...props}>
      <ChefHat className="size-11 rounded-lg bg-primary p-1 text-white" />
      {withText && <span className="text-2xl font-semibold">Chefy</span>}
    </div>
  );
});

Logo.displayName = "Logo";
