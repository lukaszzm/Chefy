import type { ActionError, ActionResponse } from "@/types";

export function errorResponse(error: string): ActionError {
  return {
    ok: false,
    error,
  };
}

export function successResponse<T>(data: T): ActionResponse<T> {
  return {
    ok: true,
    data,
  };
}
