import { CredentialsFooter } from "@/components/auth/credentials-footer";
import { CredentialsHeading } from "@/components/auth/credentials-heading";
import { SignInForm } from "@/components/auth/sign-in/form";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";

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
