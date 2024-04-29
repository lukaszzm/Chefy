import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Chefy - Liked recipes",
};

export default function LikesLayout({ children }: PropsWithChildren) {
  return <Container className="space-y-4">{children}</Container>;
}
