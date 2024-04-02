"use client";

import { LogOut } from "lucide-react";

import { SignOut } from "@/components/auth/sign-out";
import { SidebarButton } from "@/components/sidebar/sidebar-button";
import { SidebarText } from "@/components/sidebar/sidebar-text";

export const SidebarSignOut = () => {
  return (
    <SignOut>
      <SidebarButton className="w-1/4 sm:w-full" label="Sign Out">
        <SidebarText icon={<LogOut />} label="Sign Out" />
      </SidebarButton>
    </SignOut>
  );
};
