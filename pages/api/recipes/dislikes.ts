import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { withMethods, withAuth, withValidation } from "@/api-helpers";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  email: z.string().email(),
});

type RequestBody = z.infer<typeof schema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, email }: RequestBody = req.body;

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
    return res.status(200).end();
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["POST"], withAuth(withValidation(schema, handler)));
