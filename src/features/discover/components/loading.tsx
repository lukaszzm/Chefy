import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTranslations } from "next-intl";

export function DiscoverLoading() {
  const t = useTranslations("discover.loading");

  return (
    <div className="text-muted-foreground col-start-1 row-start-1 flex flex-col items-center justify-center gap-2">
      <LoadingSpinner className="size-5" />
      <p>{t("searching")}</p>
    </div>
  );
}
