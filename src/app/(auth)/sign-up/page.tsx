import { CredentialsFooter } from "@/components/auth/credentials-footer";
import { CredentialsHeading } from "@/components/auth/credentials-heading";
import { SignUpForm } from "@/components/auth/sign-up/form";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";

export default function SignUpPage() {
  return (
    <>
      <CredentialsHeading subtitle="Explore recipes from around the world today!" title="Create an account 👐" />
      <SignUpForm />
      <Separator />
      <CredentialsFooter href={routes.signIn} linkText="Sign In" text="Already have an account?" />
    </>
  );
}
