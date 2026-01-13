import { Globe, Heart, Settings } from "lucide-react";

import { Routes } from "@/config/routes";
import type { ForwardRefExoticComponent } from "react";
import type { Route } from "next";

export interface DashboardSidebarLink {
  title: string;
  href: Route;
  Icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export const dashboardItems = [
  {
    title: "Discover",
    href: Routes.Discover,
    Icon: Globe,
  },
  {
    title: "Likes",
    href: Routes.Likes,
    Icon: Heart,
  },
  {
    title: "Settings",
    href: Routes.Settings,
    Icon: Settings,
  },
] as const satisfies readonly DashboardSidebarLink[];
