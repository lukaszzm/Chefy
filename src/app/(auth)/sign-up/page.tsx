import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Routes } from "@/config/routes";
import { CredentialsFooter } from "@/features/auth/components/credentials-footer";
import { CredentialsHeading } from "@/features/auth/components/credentials-heading";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signUp.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SignUpPage() {
  const t = await getTranslations("auth.signUp");

  return (
    <>
      <CredentialsHeading title={t("title")} subtitle={t("subtitle")} />
      <SignUpForm />
      <Separator />
      <CredentialsFooter href={Routes.SignIn} linkText={t("footer.link")} text={t("footer.text")} />
    </>
  );
}
