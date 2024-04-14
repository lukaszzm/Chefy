import { z } from "zod";

interface SafeNumberOptions {
  defaultNumber?: number;
  min?: number;
  max?: number;
}

const defaultOptions = {
  defaultNumber: 1,
  min: 1,
  max: Number.MAX_SAFE_INTEGER,
} satisfies SafeNumberOptions;

export function safeNumber(value?: string, options = defaultOptions): number {
  const schema = z.coerce.number().min(options.min).max(options.max);
  const parsed = schema.safeParse(value);

  return parsed.success ? parsed.data : options.defaultNumber;
}
