import { routes } from "@/config/routes";
import { UpdateNameForm } from "@/features/settings/components/update-name-form";
import { UpdatePasswordForm } from "@/features/settings/components/update-password-form";
import { getAuthSession } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect(routes.signIn);
  }

  return (
    <>
      <UpdateNameForm defaultName={session.user.name} />
      <UpdatePasswordForm />
    </>
  );
}
