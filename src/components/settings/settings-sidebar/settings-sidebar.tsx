import { SettingsSidebarLink } from "@/components/settings/settings-sidebar/settings-sidebar-link";
import { routes } from "@/config/routes";

export const SettingsSidebar = () => {
  return (
    <div className="h-full min-w-32">
      <ul className="flex flex-col gap-3">
        <li>
          <SettingsSidebarLink href={routes.account} label="Account" />
        </li>
        <li>
          <SettingsSidebarLink href={routes.preferences} label="Preferences" />
        </li>
      </ul>
    </div>
  );
};
