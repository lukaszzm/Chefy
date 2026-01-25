import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Routes } from "@/config/routes";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("home.navbar");

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Link aria-label={t("goToHome")} href={Routes.Home}>
        <Logo withText />
      </Link>
      <Button size="lg" asChild>
        <Link href={Routes.SignIn}>{t("signIn")}</Link>
      </Button>
    </nav>
  );
}
