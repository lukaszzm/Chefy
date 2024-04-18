import type { PropsWithChildren } from "react";

import { SettingsSidebar } from "@/components/settings/settings-sidebar";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <Container className="space-y-6">
      <Title>Settings</Title>
      <div className="flex gap-12">
        <SettingsSidebar />
        {children}
      </div>
    </Container>
  );
}
