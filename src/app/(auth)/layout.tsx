import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { user } = await validateRequest();

  if (user) {
    return redirect(routes.explore);
  }

  return (
    <div className="flex min-h-screen sm:items-center sm:justify-center">
      <main className="w-full space-y-6 bg-popover px-10 py-8 sm:max-w-md sm:rounded-lg sm:border sm:border-border">
        {children}
      </main>
    </div>
  );
}
