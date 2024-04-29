import { z } from "zod";

import { signInSchema } from "@/features/auth/schemas/sign-in-schema";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
  })
  .merge(signInSchema);

export type SignUpPayload = z.infer<typeof signUpSchema>;
