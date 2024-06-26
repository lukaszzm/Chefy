import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Title } from "@/components/ui/title";

interface SettingsLayoutProps {
  account: React.ReactNode;
  preferences: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Chefy - Settings",
};

export default function SettingsLayout({ account, preferences }: SettingsLayoutProps) {
  return (
    <Container>
      <Title>Settings</Title>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="account">{account}</TabsContent>
        <TabsContent value="preferences">{preferences}</TabsContent>
      </Tabs>
    </Container>
  );
}
