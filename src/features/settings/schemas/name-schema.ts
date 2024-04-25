import { z } from "zod";

export const nameSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
});

export type UpdateNamePayload = z.infer<typeof nameSchema>;
