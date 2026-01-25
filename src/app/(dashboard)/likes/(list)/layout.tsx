import { Block } from "@/components/ui/block";
import { Container } from "@/components/ui/container";
import { Heading, HeadingTitle } from "@/components/ui/heading";
import { useTranslations } from "next-intl";

export default function LikesListLayout({ children }: React.PropsWithChildren) {
  const t = useTranslations("likes");

  return (
    <Container>
      <Heading>
        <HeadingTitle>{t("title")}</HeadingTitle>
      </Heading>
      <Block>{children}</Block>
    </Container>
  );
}
