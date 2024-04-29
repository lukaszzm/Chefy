import type { PropsWithChildren } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Logo } from "@/components/new_ui/logo";
import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { user } = await validateRequest();

  if (user) {
    return redirect(routes.explore);
  }

  return (
    <div className="flex min-h-screen sm:items-center sm:justify-center">
      <Link aria-label="Back to home page" className="absolute left-0 top-0 m-9" href={routes.home}>
        <Logo />
      </Link>
      <main className="w-full space-y-6 bg-popover  px-10 py-8 pt-24 sm:max-w-md sm:rounded-lg sm:border sm:border-border sm:pt-8">
        {children}
      </main>
    </div>
  );
}
