import { GlobeIcon, HeartIcon, SettingsIcon } from "lucide-react";

import { Routes } from "@/config/routes";
import type { ForwardRefExoticComponent } from "react";
import type { Route } from "next";
import type { TranslateKey } from "@/types";

export interface DashboardSidebarLink {
  title: TranslateKey<"dashboard.sidebar.links">;
  href: Route;
  Icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export const dashboardItems = [
  {
    title: "discover",
    href: Routes.Discover,
    Icon: GlobeIcon,
  },
  {
    title: "likes",
    href: Routes.Likes,
    Icon: HeartIcon,
  },
  {
    title: "settings",
    href: Routes.Settings,
    Icon: SettingsIcon,
  },
] as const satisfies readonly DashboardSidebarLink[];
