import { Logo } from "@/components/ui/logo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound.seo");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-sm flex-col gap-4 p-4 sm:flex-row">
        <Logo />
        <div>
          <h1 className="text-xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </div>
    </main>
  );
}
