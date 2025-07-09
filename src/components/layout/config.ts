import { Globe, Heart, Settings } from "lucide-react";

import { Route, routes } from "@/config/routes";
import { ForwardRefExoticComponent } from "react";

export interface DashboardSidebarLink {
  title: string;
  href: Route;
  Icon: ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

export const dashboardItems = [
  {
    title: "Explore",
    href: routes.explore,
    Icon: Globe,
  },
  {
    title: "Likes",
    href: routes.likes,
    Icon: Heart,
  },
  {
    title: "Settings",
    href: routes.settings,
    Icon: Settings,
  },
] as const satisfies readonly DashboardSidebarLink[];
