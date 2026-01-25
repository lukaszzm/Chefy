import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Routes } from "@/config/routes";
import { CredentialsFooter } from "@/features/auth/components/credentials-footer";
import { CredentialsHeading } from "@/features/auth/components/credentials-heading";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.signIn.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SignInPage() {
  const t = await getTranslations("auth.signIn");

  return (
    <>
      <CredentialsHeading title={t("title")} subtitle={t("subtitle")} />
      <SignInForm />
      <Separator />
      <CredentialsFooter href={Routes.SignUp} linkText={t("footer.link")} text={t("footer.text")} />
    </>
  );
}
