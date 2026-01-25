import type { Metadata } from "next";

import { Block } from "@/components/ui/block";
import { Container } from "@/components/ui/container";
import { Heading, HeadingTitle } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Routes } from "@/config/routes";
import { getTranslations } from "next-intl/server";

type SettingsLayoutProps = LayoutProps<typeof Routes.Settings>;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("settings.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SettingsLayout({ account, preferences }: SettingsLayoutProps) {
  const t = await getTranslations("settings");

  return (
    <Container>
      <Heading>
        <HeadingTitle>{t("title")}</HeadingTitle>
      </Heading>
      <Block>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">{t("tabs.account")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("tabs.preferences")}</TabsTrigger>
          </TabsList>
          <TabsContent value="account">{account}</TabsContent>
          <TabsContent value="preferences">{preferences}</TabsContent>
        </Tabs>
      </Block>
    </Container>
  );
}
