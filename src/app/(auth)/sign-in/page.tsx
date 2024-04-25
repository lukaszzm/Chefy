import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { CredentialsFooter, CredentialsHeading, SignInForm } from "@/features/auth";

export default function SignInPage() {
  return (
    <>
      <CredentialsHeading subtitle="Sign in to your account to continue." title="Hi, welcome back! 👋" />
      <SignInForm />
      <Separator />
      <CredentialsFooter href={routes.signUp} linkText="Sign up" text="Don't have an account?" />
    </>
  );
}
