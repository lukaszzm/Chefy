import type { Metadata } from "next";

import { Separator } from "@/components/new_ui/separator";
import { routes } from "@/config/routes";
import { CredentialsFooter, CredentialsHeading, SignInForm } from "@/features/auth";

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
