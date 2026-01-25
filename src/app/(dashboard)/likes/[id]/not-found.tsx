import { Block } from "@/components/ui/block";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LikedRecipeNotFound() {
  const t = useTranslations("like.notFound");

  return (
    <Container>
      <Block className="flex h-72 w-full flex-col items-center justify-center">
        <p className="text-muted-foreground text-center text-base">{t("message")}</p>
        <Button variant="outline" asChild>
          <Link href={Routes.Likes}>{t("goBack")}</Link>
        </Button>
      </Block>
    </Container>
  );
}
