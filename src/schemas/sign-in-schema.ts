import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Your password must have at least 8 characters"),
});

export type SignInValues = z.infer<typeof signInSchema>;
