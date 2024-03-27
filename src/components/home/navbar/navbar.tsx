import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { routes } from "@/config/routes";

export const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between p-4">
      <Logo withText />
      <Button size="lg" asChild>
        <Link href={routes.signIn}>Sign In</Link>
      </Button>
    </nav>
  );
};
