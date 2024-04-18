import { z } from "zod";

export const changeNameSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
});

export type ChangeNameValues = z.infer<typeof changeNameSchema>;
