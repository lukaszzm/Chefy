import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { withAuth, withMethods, withValidation } from "@/api-helpers";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type RequestBody = z.infer<typeof schema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email }: RequestBody = req.body;

  try {
    const userPreferences = await prisma.user.findUnique({
      where: { email },
      select: {
        prefferedAreas: {
          select: { id: true },
        },
        prefferedCategories: {
          select: { id: true },
        },
      },
    });

    if (!userPreferences) throw new Error("Something went wrong.");

    const prefferedAreasIds = userPreferences.prefferedAreas.map((el) => el.id);
    const prefferedCategoriesIds = userPreferences.prefferedCategories.map(
      (el) => el.id
    );

    const recipe = await prisma.recipe.findFirst({
      where: {
        areaId: { in: prefferedAreasIds },
        categoryId: { in: prefferedCategoriesIds },
        AND: [
          {
            NOT: {
              likers: {
                some: {
                  email,
                },
              },
            },
          },
          {
            NOT: {
              dislikers: {
                some: {
                  email,
                },
              },
            },
          },
        ],
      },
      include: {
        category: true,
        area: true,
      },
    });

    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["GET"], withAuth(withValidation(schema, handler)));
