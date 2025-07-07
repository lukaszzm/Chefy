const DEFAULT_ERROR_MESSAGE = "Unknown error uccured, please try again later";

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return DEFAULT_ERROR_MESSAGE;
}
