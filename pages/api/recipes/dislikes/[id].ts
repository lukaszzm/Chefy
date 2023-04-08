import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withMethods, withAuth } from "@/api-helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.headers.email as string;
  const id = req.query.id as string;

  if (req.method === "POST")
    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          dislikedRecipes: {
            connect: {
              id,
            },
          },
        },
      });
      return res.status(200).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
};

export default withMethods(["POST"], withAuth(handler));
