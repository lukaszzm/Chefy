import { z } from "zod";

export const UserSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
