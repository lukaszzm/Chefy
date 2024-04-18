import { Account } from "@/components/settings/account";
import { Preferences } from "@/components/settings/preferences";
import { SettingsTabs } from "@/components/settings/settings-tabs";

export default function SettingsPage() {
  return <SettingsTabs accountTab={<Account />} preferencesTab={<Preferences />} />;
}
