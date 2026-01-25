import type { TranslateFun } from "@/types";
import { z } from "zod";

export function generateNameSchema(t: TranslateFun) {
  return z.object({
    name: z.string().min(1, t("settings.validation.nameRequired")),
  });
}

export type UpdateNamePayload = z.infer<ReturnType<typeof generateNameSchema>>;
