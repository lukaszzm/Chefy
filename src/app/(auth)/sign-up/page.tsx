import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Routes } from "@/config/routes";
import { CredentialsFooter } from "@/features/auth/components/credentials-footer";
import { CredentialsHeading } from "@/features/auth/components/credentials-heading";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = {
  title: "Create an account | Chefy",
};

export default function SignUpPage() {
  return (
    <>
      <CredentialsHeading subtitle="Explore recipes from around the world today!" title="Create an account 👐" />
      <SignUpForm />
      <Separator />
      <CredentialsFooter href={Routes.SignIn} linkText="Sign In" text="Already have an account?" />
    </>
  );
}
