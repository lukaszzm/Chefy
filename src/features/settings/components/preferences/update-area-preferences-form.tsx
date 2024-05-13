import { updatePreferredAreas } from "@/features/settings/actions/update-preferred-areas";
import { UpdatePreferencesForm } from "@/features/settings/components/preferences/update-preferences-form";
import { SettingsContainer } from "@/features/settings/components/settings-container";
import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";

interface UpdateAreaPreferencesFormProps {
  allAreas: Array<PreferenceValue>;
  preferredAreas: Array<PreferenceValue>;
}

export const UpdateAreaPreferencesForm = ({ allAreas, preferredAreas }: UpdateAreaPreferencesFormProps) => {
  return (
    <SettingsContainer subtitle="Areas">
      <UpdatePreferencesForm
        actionOnSubmit={updatePreferredAreas}
        allValues={allAreas}
        keyName="areaId"
        preferredValues={preferredAreas}
        submitText="Update Areas"
      />
    </SettingsContainer>
  );
};
