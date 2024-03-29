import { Globe, Heart, LogOut, Settings2 } from "lucide-react";

import { SignOut } from "@/components/auth/sign-out";
import { SidebarItem } from "@/components/sidebar/sidebar-item";
import { routes } from "@/config/routes";

// TODO: add logo
export const Sidebar = () => {
  return (
    <aside className="sm:inset-y fixed bottom-0 z-20 flex  w-full items-center border-t sm:left-0 sm:h-full sm:w-auto sm:flex-col sm:space-y-6 sm:border-r sm:border-t-0 sm:p-2  lg:p-4">
      <nav className="flex w-full sm:grid sm:h-full sm:place-content-start sm:gap-2">
        <SidebarItem href={routes.explore} icon={<Globe />} label="Explore" asLink />
        <SidebarItem href={routes.likes} icon={<Heart />} label="Likes" asLink />
        <SidebarItem href={routes.settings} icon={<Settings2 />} label="Settings" asLink />
      </nav>

      <SignOut>
        <SidebarItem className="w-1/4 sm:w-full" icon={<LogOut />} label="Sign Out" />
      </SignOut>
    </aside>
  );
};
