import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export const metadata: Metadata = {
  title: "Chefy - Liked recipes",
};

export default function LikesLayout({ children }: PropsWithChildren) {
  return (
    <Container className="space-y-4">
      <Title>Liked Recipes</Title>
      {children}
    </Container>
  );
}
