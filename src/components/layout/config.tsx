import { Globe, Heart, Settings } from "lucide-react";

import type { DashboardSidebarLinkProps } from "@/components/layout/dashboard-sidebar-link";
import { routes } from "@/config/routes";

export const dashboardItems = [
  {
    title: "Explore",
    url: routes.explore,
    icon: <Globe />,
  },
  {
    title: "Likes",
    url: routes.likes,
    icon: <Heart />,
  },
  {
    title: "Settings",
    url: routes.settings,
    icon: <Settings />,
  },
] as const satisfies ReadonlyArray<DashboardSidebarLinkProps>;
