import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { CredentialsFooter } from "@/features/auth/components/credentials-footer";
import { CredentialsHeading } from "@/features/auth/components/credentials-heading";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Chefy - Sign in to your account",
};

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
