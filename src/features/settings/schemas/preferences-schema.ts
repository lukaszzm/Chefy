import { z } from "zod";

export const preferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  selected: z.boolean(),
});

export type PreferenceValueWithSelected = z.infer<typeof preferenceSchema>;
export type PreferenceValue = Omit<PreferenceValueWithSelected, "selected">;

export const preferencesSchema = z.object({
  values: z.array(preferenceSchema),
});

export type PreferencesPayload = z.infer<typeof preferencesSchema>;
