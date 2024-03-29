import type { LucideProps } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

export const LoadingSpinner = ({ className, ...props }: LucideProps) => {
  return (
    <LoaderCircle className={cn("h-4 w-4 animate-spin", className)} role="status" {...props}>
      <span className="sr-only">Loading...</span>
    </LoaderCircle>
  );
};
