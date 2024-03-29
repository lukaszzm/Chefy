import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";

import { authOptions } from "@/_pages/api/auth/[...nextauth]";

export const withAuth = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const session = await getServerSession(request, response, authOptions);

    if (!session) {
      return response.status(401).json({ message: "Unauthorized." });
    }

    request.headers = { ...request.headers, email: session.user.email };

    return handler(request, response);
  };
};
