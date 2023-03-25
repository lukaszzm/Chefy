import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { withMethods, withAuth, withValidation } from "@/api-helpers";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().required(),
});

interface RequestBody extends yup.TypeOf<typeof schema> {}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, email }: RequestBody = req.body;

  if (req.method === "POST")
    try {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          likedRecipes: {
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

  if (req.method === "DELETE")
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          likedRecipes: {
            disconnect: {
              id: id,
            },
          },
        },
      });
      return res.status(200).end();
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
};

export default withMethods(
  ["POST", "DELETE"],
  withAuth(withValidation(schema, handler))
);
