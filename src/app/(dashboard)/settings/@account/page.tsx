import { UpdateNameForm } from "@/features/settings/components/update-name-form";
import { UpdatePasswordForm } from "@/features/settings/components/update-password-form";
import { authUser } from "@/lib/auth";
import { getUserById } from "@/lib/db/queries/user";

export default async function AccountPage() {
  const { id } = await authUser();
  const user = await getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <>
      <UpdateNameForm defaultName={user.name} />
      <UpdatePasswordForm />
    </>
  );
}
