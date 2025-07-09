import type { PreferenceValue } from "@/features/settings/schemas/preferences-schema";

export function mapToSelected<T extends PreferenceValue>(all: T[], preferred: T[]): PreferenceValue[] {
  return all.map((category) => ({
    ...category,
    selected: preferred.some((preferredCategory) => preferredCategory.id === category.id),
  }));
}
