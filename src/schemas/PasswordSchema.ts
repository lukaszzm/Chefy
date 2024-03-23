import { z } from "zod";

export const PasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Your password must have at least 8 characters"),
  newPassword: z
    .string()
    .min(8, "Your password must have at least 8 characters"),
});
