import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const withMethods = (methods: string[], handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    if (!request.method || !methods.includes(request.method)) {
      return response.status(405).json({ message: "Method not allowed." });
    }

    return handler(request, response);
  };
};
