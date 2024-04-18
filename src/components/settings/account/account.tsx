import { NameForm } from "@/components/settings/account/name-form";
import { PasswordForm } from "@/components/settings/account/password-form";
import { SettingsContainer } from "@/components/settings/settings-container";

export const Account = () => {
  return (
    <div className="space-y-3">
      <SettingsContainer subtitle="General Info">
        <NameForm />
      </SettingsContainer>
      <SettingsContainer subtitle="Password">
        <PasswordForm />
      </SettingsContainer>
    </div>
  );
};
