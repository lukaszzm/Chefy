import { MIN_PASSWORD_LENGTH } from "@/config/constants";
import type { TranslateFun } from "@/types";
import { z } from "zod";

export function generateSignInSchema(t: TranslateFun) {
  return z.object({
    email: z.email(t("auth.validation.emailInvalid")),
    password: z.string().min(MIN_PASSWORD_LENGTH, t("auth.validation.minPasswordLength", { min: MIN_PASSWORD_LENGTH })),
  });
}

export type SignInPayload = z.infer<ReturnType<typeof generateSignInSchema>>;
