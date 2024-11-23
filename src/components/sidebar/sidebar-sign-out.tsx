"use client";

import { LogOut } from "lucide-react";

import { SidebarButton } from "@/components/sidebar/sidebar-button";
import { SidebarText } from "@/components/sidebar/sidebar-text";
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog";

export const SidebarSignOut = () => {
  return (
    <SignOutDialog>
      <SidebarButton className="w-1/4 sm:w-full" label="Sign Out">
        <SidebarText icon={<LogOut />} label="Sign Out" />
      </SidebarButton>
    </SignOutDialog>
  );
};
