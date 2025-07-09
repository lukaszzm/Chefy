import type { PropsWithChildren } from "react";

import { Container } from "@/components/ui/container";

export default function LikedRecipeLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
