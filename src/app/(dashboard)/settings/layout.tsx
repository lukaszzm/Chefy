import type { PropsWithChildren } from "react";

import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <Container className="space-y-6">
      <Title>Settings</Title>
      {children}
    </Container>
  );
}
