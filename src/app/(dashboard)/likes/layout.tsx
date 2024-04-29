import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import { Container } from "@/components/new_ui/container";

export const metadata: Metadata = {
  title: "Chefy - Liked recipes",
};

export default function LikesLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
