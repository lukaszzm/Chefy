import { MIN_PASSWORD_LENGTH } from "@/config/constants";
import type { TranslateFun } from "@/types";
import { z } from "zod";

export function generatePasswordSchema(t: TranslateFun) {
  return z
    .object({
      currentPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, t("settings.validation.minCurrentPasswordLength", { min: MIN_PASSWORD_LENGTH })),
      newPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, t("settings.validation.minNewPasswordLength", { min: MIN_PASSWORD_LENGTH })),
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: t("settings.validation.differentPasswords"),
      path: ["newPassword"],
    });
}

export type UpdatePasswordPayload = z.infer<ReturnType<typeof generatePasswordSchema>>;
