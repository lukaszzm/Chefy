import { Globe, Heart, Settings2 } from "lucide-react";

import { SidebarLink } from "@/components/sidebar/sidebar-link";
import { SidebarSignOut } from "@/components/sidebar/sidebar-sign-out";
import { routes } from "@/config/routes";

// TODO: add logo
export const Sidebar = () => {
  return (
    <aside className="sm:inset-y fixed bottom-0 z-20 flex  w-full items-center border-t sm:left-0 sm:h-full sm:w-auto sm:flex-col sm:space-y-6 sm:border-r sm:border-t-0 sm:p-2  lg:p-4">
      <nav className="flex w-full sm:grid sm:h-full sm:place-content-start sm:gap-2">
        <SidebarLink href={routes.explore} icon={<Globe />} label="Explore" />
        <SidebarLink href={routes.likes} icon={<Heart />} label="Likes" />
        <SidebarLink href={routes.settings} icon={<Settings2 />} label="Settings" />
      </nav>

      <SidebarSignOut />
    </aside>
  );
};
