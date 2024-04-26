import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { routes } from "@/config/routes";
import { validateRequest } from "@/lib/auth";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect(routes.signIn);
  }

  return (
    <div className="grid h-dvh w-full overflow-auto pb-16 sm:pb-0 sm:pl-20 lg:pl-52">
      <Sidebar />
      <main className="flex h-full w-full bg-background sm:items-center sm:justify-center">{children}</main>
    </div>
  );
}
