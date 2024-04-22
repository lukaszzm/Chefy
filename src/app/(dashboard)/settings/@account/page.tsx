import { getCurrentUser } from "@/actions/user/get-current-user";
import { NameForm } from "@/components/settings/name-form";
import { PasswordForm } from "@/components/settings/password-form";
import { SettingsContainer } from "@/components/settings/settings-container";

export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <>
      <SettingsContainer subtitle="General Info">
        <NameForm defaultName={user.name} />
      </SettingsContainer>
      <SettingsContainer subtitle="Password">
        <PasswordForm />
      </SettingsContainer>
    </>
  );
}
