import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { routes } from "@/config/routes";

export function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Link aria-label="Go to homepage" href={routes.home}>
        <Logo withText />
      </Link>
      <Button size="lg" asChild>
        <Link href={routes.signIn}>Sign In</Link>
      </Button>
    </nav>
  );
}
