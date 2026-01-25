import { Routes } from "@/config/routes";
import { DiscoverStack } from "@/features/discover/components/stack";
import { DiscoverProvider } from "@/features/discover/context/provider";
import { getAuthSession } from "@/lib/auth/utils";
import { getPersonalizedRecipes } from "@/lib/db/queries/recipe";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("discover.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DiscoverPage() {
  const session = await getAuthSession();

  if (!session) {
    return redirect(Routes.SignIn);
  }

  const personalizedRecipes = await getPersonalizedRecipes(session.user.id);

  return (
    <DiscoverProvider initialData={personalizedRecipes} userId={session.user.id}>
      <DiscoverStack />
    </DiscoverProvider>
  );
}
