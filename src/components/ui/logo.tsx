import { ChefHatIcon } from "lucide-react";

import { cn } from "@/utils/cn";

interface LogoProps extends React.ComponentProps<"div"> {
  withText?: boolean;
}

function Logo({ withText, className, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} data-slot="logo" {...props}>
      <ChefHatIcon className="bg-primary size-11 rounded-lg p-1 text-white" />
      {withText && <span className="text-2xl font-semibold">Chefy</span>}
    </div>
  );
}

export { Logo };
