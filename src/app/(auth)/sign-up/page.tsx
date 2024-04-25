import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { CredentialsFooter, CredentialsHeading, SignUpForm } from "@/features/auth";

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
