import { Block } from "@/components/ui/block";
import { Container } from "@/components/ui/container";
import { Heading, HeadingTitle } from "@/components/ui/heading";

export default function LikesListLayout({ children }: React.PropsWithChildren) {
  return (
    <Container>
      <Heading>
        <HeadingTitle>Liked Recipes</HeadingTitle>
      </Heading>
      <Block>{children}</Block>
    </Container>
  );
}
