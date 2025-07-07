import type { PropsWithChildren } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import { Logo } from "@/components/ui/logo";
import { routes } from "@/config/routes";
import { getAuthSession } from "@/lib/auth/utils";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getAuthSession();

  if (session) {
    return redirect(routes.explore);
  }

  return (
    <div className="flex min-h-screen sm:items-center sm:justify-center">
      <Link aria-label="Back to home page" className="absolute top-0 left-0 m-9" href={routes.home}>
        <Logo />
      </Link>
      <main className="bg-popover sm:border-border w-full space-y-6 px-10 py-8 pt-24 sm:max-w-md sm:rounded-lg sm:border sm:pt-8">
        {children}
      </main>
    </div>
  );
}
