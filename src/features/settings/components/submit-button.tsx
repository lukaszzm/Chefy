import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function SubmitButton({ children, ...props }: ButtonProps) {
  const t = useTranslations("settings.submitButton");

  return (
    <Button className="w-full min-w-26 sm:w-auto" size="sm" loadingText={t("loadingText")} type="submit" {...props}>
      {children || t("defaultText")}
    </Button>
  );
}
