import { updatePreferredCategories } from "@/features/settings/actions/update-preferred-categories";
import { UpdatePreferencesForm } from "@/features/settings/components/preferences/update-preferences-form";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";
import { useTranslations } from "next-intl";

interface UpdateCategoryPreferencesFormProps {
  allCategories: PreferenceValue[];
  preferredCategories: PreferenceValue[];
}

export function UpdateCategoryPreferencesForm({
  allCategories,
  preferredCategories,
}: UpdateCategoryPreferencesFormProps) {
  const t = useTranslations("settings.preferences.categories");

  return (
    <SettingsContainer subtitle={t("subtitle")}>
      <UpdatePreferencesForm
        actionOnSubmit={updatePreferredCategories}
        allValues={allCategories}
        keyName="categoryId"
        preferredValues={preferredCategories}
        submitText={t("submitText")}
      />
    </SettingsContainer>
  );
}
