import { updatePreferredAreas } from "@/features/settings/actions/update-preferred-areas";
import { UpdatePreferencesForm } from "@/features/settings/components/preferences/update-preferences-form";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";
import { useTranslations } from "next-intl";

interface UpdateAreaPreferencesFormProps {
  allAreas: PreferenceValue[];
  preferredAreas: PreferenceValue[];
}

export function UpdateAreaPreferencesForm({ allAreas, preferredAreas }: UpdateAreaPreferencesFormProps) {
  const t = useTranslations("settings.preferences.areas");

  return (
    <SettingsContainer subtitle={t("subtitle")}>
      <UpdatePreferencesForm
        actionOnSubmit={updatePreferredAreas}
        allValues={allAreas}
        keyName="areaId"
        preferredValues={preferredAreas}
        submitText={t("submitText")}
      />
    </SettingsContainer>
  );
}
