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
    <div className="grid h-screen w-full bg-popover pb-16 sm:pb-0 sm:pl-20 lg:pl-52">
      <Sidebar />
      <div className="flex h-full w-full items-center justify-center bg-background  ">
        <main>{children}</main>
      </div>
    </div>
  );
}
