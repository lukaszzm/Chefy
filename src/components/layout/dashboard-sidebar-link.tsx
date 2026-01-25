"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { type DashboardSidebarLink } from "@/components/layout/config";
import { useTranslations } from "next-intl";

export function DashboardSidebarLink({ title, href, Icon }: DashboardSidebarLink) {
  const t = useTranslations("dashboard.sidebar.links");

  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={href}>
          <Icon />
          <span>{t(title)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
