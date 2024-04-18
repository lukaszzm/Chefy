import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsTabsProps {
  accountTab: React.ReactNode;
  preferencesTab: React.ReactNode;
}

export const SettingsTabs = ({ accountTab, preferencesTab }: SettingsTabsProps) => {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="account">{accountTab}</TabsContent>
      <TabsContent value="preferences">{preferencesTab}</TabsContent>
    </Tabs>
  );
};
