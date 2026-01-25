import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

export function LikesNotFound() {
  const t = useTranslations("likes.notFound");

  return (
    <Container className="flex h-72 flex-col items-center justify-center">
      <p className="text-muted-foreground text-base">{t("message")}</p>
    </Container>
  );
}
