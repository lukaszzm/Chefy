import type { Metadata } from "next";

import { Block } from "@/components/ui/block";
import { Container } from "@/components/ui/container";
import { Heading, HeadingTitle } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <Heading>
        <HeadingTitle>Settings</HeadingTitle>
      </Heading>
      <Block>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="account">{account}</TabsContent>
          <TabsContent value="preferences">{preferences}</TabsContent>
        </Tabs>
      </Block>
    </Container>
  );
}
