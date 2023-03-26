import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { withAuth, withMethods, withValidation } from "@/api-helpers";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1),
    prefferedCategories: z.array(z.string()),
    prefferedAreas: z.array(z.string()),
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
  })
  .partial();

type RequestBody = z.infer<typeof schema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    prefferedCategories,
    prefferedAreas,
    currentPassword,
    newPassword,
  }: RequestBody = req.body;
  const email = req.headers.email as string;

  try {
    if (name) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          name,
        },
      });
      return res
        .status(200)
        .json({ message: "Success! Your name has been changed." });
    }

    if (prefferedCategories) {
      const allCategoriesIds = await prisma.category.findMany({
        select: { id: true },
      });

      const notPrefferedCategories = allCategoriesIds.filter(
        (el: { id: string }) => !prefferedCategories.includes(el.id)
      );

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          prefferedCategories: {
            connect: prefferedCategories.map((el) => ({ id: el })) || [],
            disconnect:
              notPrefferedCategories.map((el: any) => ({ id: el.id })) || [],
          },
        },
      });

      return res.status(200).json({
        message: "Success! Your preffered categories has been changed.",
      });
    }

    if (prefferedAreas) {
      const allAreasIds = await prisma.area.findMany({
        select: { id: true },
      });

      const notPrefferedAreas = allAreasIds.filter(
        (el: { id: string }) => !prefferedAreas.includes(el.id)
      );

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          prefferedAreas: {
            connect: prefferedAreas.map((el) => ({ id: el })) || [],
            disconnect:
              notPrefferedAreas.map((el: any) => ({ id: el.id })) || [],
          },
        },
      });

      return res
        .status(200)
        .json({ message: "Success! Your preffered areas has been changed." });
    }

    if (currentPassword && newPassword) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new Error("Cannot find the user.");

      const result = user.password
        ? await bcrypt.compare(currentPassword, user.password)
        : false;

      if (!result)
        return res.status(401).json({ message: "Invalid password." });

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: bcrypt.hashSync(newPassword, 10),
        },
      });
    }

    return res
      .status(200)
      .json({ message: "Success! Your password has been changed." });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(
  ["PATCH"],
  withAuth(withValidation(schema, handler))
);
