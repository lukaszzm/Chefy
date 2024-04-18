import type { PropsWithChildren } from "react";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export default function LikesLayout({ children }: PropsWithChildren) {
  return (
    <Container className="space-y-4">
      <Title>Liked Recipes</Title>
      {children}
    </Container>
  );
}
