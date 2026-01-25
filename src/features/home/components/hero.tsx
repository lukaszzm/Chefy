import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Routes } from "@/config/routes";
import { FoodOverlay } from "@/features/home/components/food-overlay";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("home.hero");

  const titleWithHighlight = t.rich("titleRich", {
    highlight: (children: React.ReactNode) => (
      <span className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-transparent">{children}</span>
    ),
  });

  return (
    <main className="m-auto flex h-full w-full max-w-7xl items-center justify-center text-center">
      <div className="relative max-w-6xl p-6 sm:p-16">
        <h1 className="mb-10 text-7xl font-bold sm:mb-16 sm:text-8xl">{titleWithHighlight}</h1>
        <p className="text-muted-foreground my-6 text-center text-lg leading-7 font-semibold sm:text-xl sm:leading-8 lg:text-2xl lg:leading-10">
          {t("description")}
        </p>
        <Button className="py-7 text-lg lg:px-12 lg:py-8 lg:text-xl" size="lg" asChild>
          <Link href={Routes.SignUp}>{t("getStarted")}</Link>
        </Button>
        <FoodOverlay />
      </div>
    </main>
  );
}
