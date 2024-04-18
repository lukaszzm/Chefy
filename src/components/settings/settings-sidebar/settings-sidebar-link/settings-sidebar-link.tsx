"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface SettingsSidebarLinkProps {
  label: string;
  href: string;
}

export const SettingsSidebarLink = ({ label, href }: SettingsSidebarLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      className={cn(
        "w-full text-muted-foreground hover:bg-accent/40",
        isActive && "bg-accent/40 text-primary hover:bg-accent/60 hover:text-primary"
      )}
      items="start"
      variant="ghost"
      asChild
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
