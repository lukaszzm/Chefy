"use client";

import type { Route } from "next";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export interface DashboardSidebarLinkProps {
  url: Route;
  title: string;
  icon: React.ReactNode;
}

export function DashboardSidebarLink({ url, title, icon }: DashboardSidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(url);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={isActive} asChild>
        <Link href={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
