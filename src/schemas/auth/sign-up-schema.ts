import { z } from "zod";

import { signInSchema } from "@/schemas/auth/sign-in-schema";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
  })
  .merge(signInSchema);

export type SignUpValues = z.infer<typeof signUpSchema>;
