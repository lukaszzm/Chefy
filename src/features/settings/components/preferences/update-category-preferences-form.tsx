import { updatePreferredCategories } from "@/features/settings/actions/update-preferred-categories";
import { UpdatePreferencesForm } from "@/features/settings/components/preferences/update-preferences-form";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";

interface UpdateCategoryPreferencesFormProps {
  allCategories: Array<PreferenceValue>;
  preferredCategories: Array<PreferenceValue>;
}

export const UpdateCategoryPreferencesForm = ({
  allCategories,
  preferredCategories,
}: UpdateCategoryPreferencesFormProps) => {
  return (
    <SettingsContainer subtitle="Categories">
      <UpdatePreferencesForm
        actionOnSubmit={updatePreferredCategories}
        allValues={allCategories}
        keyName="categoryId"
        preferredValues={preferredCategories}
        submitText="Update Categories"
      />
    </SettingsContainer>
  );
};
