import type { ActionError, ActionResponse } from "@/types";

export const errorResponse = (error: string): ActionError => ({
  ok: false,
  error,
});

export const successResponse = <T>(data: T): ActionResponse<T> => ({
  ok: true,
  data,
});
