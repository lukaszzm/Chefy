import type { PreferenceValue } from "@/schemas/settings/preferences-schema";

export const mapToSelected = <T extends Omit<PreferenceValue, "selected">>(
  all: T[],
  preferred: T[]
): PreferenceValue[] => {
  return all.map((category) => ({
    ...category,
    selected: preferred.some((preferredCategory) => preferredCategory.id === category.id),
  }));
};
