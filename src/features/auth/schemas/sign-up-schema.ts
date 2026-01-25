import { z } from "zod";

import type { TranslateFun } from "@/types";
import { MIN_PASSWORD_LENGTH } from "@/config/constants";

export function generateSignUpSchema(t: TranslateFun) {
  return z.object({
    name: z.string().min(1, t("auth.validation.nameRequired")),
    email: z.email(t("auth.validation.emailInvalid")),
    password: z.string().min(MIN_PASSWORD_LENGTH, t("auth.validation.minPasswordLength", { min: MIN_PASSWORD_LENGTH })),
  });
}

export type SignUpPayload = z.infer<ReturnType<typeof generateSignUpSchema>>;
