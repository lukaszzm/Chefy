import { z } from "zod";

export const preferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  selected: z.boolean(),
});

export type PreferenceValue = z.infer<typeof preferenceSchema>;

export const preferencesSchema = z.object({
  values: z.array(preferenceSchema),
});

export type PreferencesValues = z.infer<typeof preferencesSchema>;
