import type { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { routes } from "@/config/routes";
import { getAuthSession } from "@/lib/auth/utils";
import { SidebarWrapper } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getAuthSession();

  if (!session) {
    return redirect(routes.signIn);
  }

  return (
    <SidebarWrapper>
      <DashboardSidebar />
      <main className="lg:bg-background pb-mobile-nav-height lg:pl-sidebar-width flex size-full min-h-svh flex-col pl-0 lg:items-center lg:pb-0">
        {children}
      </main>
    </SidebarWrapper>
  );
}
