import { NameForm } from "@/components/settings/account/name-form";
import { SettingsContainer } from "@/components/settings/settings-container";

export const Account = () => {
  return (
    <div className="space-y-3">
      <SettingsContainer subtitle="General Info">
        <NameForm />
      </SettingsContainer>
    </div>
  );
};
