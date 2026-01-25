import { ChefHatIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { APP_NAME } from "@/config/constants";

interface LogoProps extends React.ComponentProps<"div"> {
  withText?: boolean;
}

function Logo({ ref, withText, className, ...props }: LogoProps) {
  return (
    <div ref={ref} data-slot="logo" className={cn("flex items-center gap-2", className)} {...props}>
      <ChefHatIcon className="bg-primary size-11 rounded-lg p-1 text-white" />
      {withText && <span className="text-2xl font-semibold">{APP_NAME}</span>}
    </div>
  );
}

export { Logo, type LogoProps };
