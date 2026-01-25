import type { LucideProps } from "lucide-react";
import { LoaderCircleIcon } from "lucide-react";

import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

interface LoadingSpinnerProps extends Omit<LucideProps, "ref">, Pick<React.ComponentProps<"div">, "ref"> {}

function LoadingSpinner({ ref, className, ...props }: LoadingSpinnerProps) {
  const t = useTranslations("common");

  return (
    <div ref={ref} role="status" data-slot="loading-spinner" className="flex items-center justify-center">
      <LoaderCircleIcon className={cn("size-4 animate-spin", className)} {...props} />
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}

export { LoadingSpinner, type LoadingSpinnerProps };
