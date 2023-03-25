import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Your password must have at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});
