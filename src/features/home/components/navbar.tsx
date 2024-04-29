import Link from "next/link";

import { Button } from "@/components/new_ui/button";
import { Logo } from "@/components/new_ui/logo";
import { routes } from "@/config/routes";

export const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Link aria-label="Chefy Home" href={routes.home}>
        <Logo withText />
      </Link>
      <Button size="lg" asChild>
        <Link href={routes.signIn}>Sign In</Link>
      </Button>
    </nav>
  );
};
