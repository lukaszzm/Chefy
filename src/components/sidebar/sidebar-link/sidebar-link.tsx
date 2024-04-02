"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarButton } from "@/components/sidebar/sidebar-button";
import { SidebarText } from "@/components/sidebar/sidebar-text";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SidebarLink = ({ href, icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <SidebarButton isActive={pathname === href} label={label} asChild>
      <Link href={href}>
        <SidebarText icon={icon} label={label} />
      </Link>
    </SidebarButton>
  );
};
