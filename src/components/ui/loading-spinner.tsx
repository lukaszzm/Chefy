import type { LucideProps } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

interface LoadingSpinnerProps extends Omit<LucideProps, "ref">, Pick<React.ComponentProps<"div">, "ref"> {}

function LoadingSpinner({ ref, className, ...props }: LoadingSpinnerProps) {
  return (
    <div ref={ref} role="status" data-slot="loading-spinner" className="flex items-center justify-center">
      <LoaderCircle className={cn("size-4 animate-spin", className)} {...props} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { LoadingSpinner, type LoadingSpinnerProps };
