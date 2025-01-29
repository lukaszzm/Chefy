import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { routes } from "@/config/routes";
import { getCurrentSession } from "@/lib/auth/session";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { user } = await getCurrentSession();

  if (!user) {
    return redirect(routes.signIn);
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="bg-popover lg:bg-background pb-mobile-nav-height lg:pl-sidebar-width flex size-full min-h-svh pl-0 lg:items-center lg:justify-center lg:pb-0">
        {children}
      </main>
    </SidebarProvider>
  );
}
