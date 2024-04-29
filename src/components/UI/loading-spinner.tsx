import type { LucideProps } from "lucide-react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

export const LoadingSpinner = ({ className, ...props }: LucideProps) => {
  return (
    <div className="flex items-center justify-center" role="status">
      <LoaderCircle className={cn("size-4 animate-spin", className)} {...props} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};
