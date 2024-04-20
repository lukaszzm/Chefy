import { CategoriesForm } from "@/components/settings/preferences/categories-form";
import { SettingsContainer } from "@/components/settings/settings-container";

export const Preferences = () => {
  return (
    <div className="space-y-3">
      <SettingsContainer subtitle="Categories">
        <CategoriesForm />
      </SettingsContainer>
    </div>
  );
};
