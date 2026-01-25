"use client";

import { LogOutIcon } from "lucide-react";

import { dashboardItems } from "@/components/layout/config";
import { DashboardSidebarLink } from "@/components/layout/dashboard-sidebar-link";
import { Logo } from "@/components/ui/logo";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog";
import { useTranslations } from "next-intl";

export function DashboardSidebar() {
  const t = useTranslations("dashboard.sidebar");

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo withText />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="hidden lg:block">{t("application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <DashboardSidebarLink key={item.title} {...item} />
              ))}
              <SidebarMenuItem className="lg:hidden">
                <SignOutDialog>
                  <SidebarMenuButton>
                    <LogOutIcon />
                    <span>{t("signOut")}</span>
                  </SidebarMenuButton>
                </SignOutDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOutDialog>
              <SidebarMenuButton>
                <LogOutIcon />
                <span>{t("signOut")}</span>
              </SidebarMenuButton>
            </SignOutDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
