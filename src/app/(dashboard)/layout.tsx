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
      <main className="bg-background pl-0 pb-16 lg:pb-0 lg:pl-56 flex min-h-svh size-full lg:items-center lg:justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
