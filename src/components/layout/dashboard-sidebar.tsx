import { LogOut } from "lucide-react";

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

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo withText />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="hidden lg:block">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <DashboardSidebarLink key={item.title} {...item} />
              ))}
              <SidebarMenuItem className="lg:hidden">
                <SidebarMenuButton>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
          <LogOut />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
