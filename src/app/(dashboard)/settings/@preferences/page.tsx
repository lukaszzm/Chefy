import { getAllAreas } from "@/actions/area/get-all-areas";
import { getAllCategories } from "@/actions/category/get-all-categories";
import { getPreferredAreas } from "@/actions/user/get-preferred-areas";
import { getPreferredCategories } from "@/actions/user/get-preferred-categories";
import { updatePreferredAreas } from "@/actions/user/update-preferred-areas";
import { updatePreferredCategories } from "@/actions/user/update-preferred-categories";
import { PreferencesForm } from "@/components/settings/preferences-form";
import { SettingsContainer } from "@/components/settings/settings-container";

export default async function PreferencesPage() {
  const [allCategories, preferredCategories, allAreas, preferredAreas] = await Promise.all([
    getAllCategories(),
    getPreferredCategories(),
    getAllAreas(),
    getPreferredAreas(),
  ]);

  return (
    <>
      <SettingsContainer subtitle="Categories">
        <PreferencesForm
          actionOnSubmit={updatePreferredCategories}
          allValues={allCategories}
          keyName="categoryId"
          preferredValues={preferredCategories}
        />
      </SettingsContainer>
      <SettingsContainer subtitle="Areas">
        <PreferencesForm
          actionOnSubmit={updatePreferredAreas}
          allValues={allAreas}
          keyName="areaId"
          preferredValues={preferredAreas}
        />
      </SettingsContainer>
    </>
  );
}
