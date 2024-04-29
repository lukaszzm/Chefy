import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Missing or incorrect email address"),
  password: z.string().min(8, "Your password must have at least 8 characters"),
});

export type SignInPayload = z.infer<typeof signInSchema>;
