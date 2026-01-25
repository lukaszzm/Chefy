import { TextSearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function DiscoverNotFound() {
  const t = useTranslations("discover.notFound");

  return (
    <div className="text-muted-foreground col-start-1 row-start-1 mx-auto flex max-w-sm flex-col items-center justify-center gap-4 p-4 text-center">
      <TextSearchIcon size={44} />

      <div>
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <p>{t("description")}</p>
      </div>
    </div>
  );
}
