import { UpdateNameForm } from "@/features/settings/components/update-name-form";
import { UpdatePasswordForm } from "@/features/settings/components/update-password-form";
import { getCurrentUser } from "@/lib/auth/session";

// TODO: check if the user is updated
export default async function AccountPage() {
  const user = await getCurrentUser();

  return (
    <>
      <UpdateNameForm defaultName={user.name} />
      <UpdatePasswordForm />
    </>
  );
}
