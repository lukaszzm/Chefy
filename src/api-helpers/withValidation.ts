import type { NextApiHandler, NextApiResponse, NextApiRequest } from "next";

import type { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const withValidation = <T extends z.ZodTypeAny>(Schema: T, handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const validate = Schema.safeParse(request.body);

    if (!validate.success) {
      const validationError = fromZodError(validate.error);
      return response.status(400).json(validationError);
    }

    return handler(request, response);
  };
};
