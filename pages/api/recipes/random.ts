import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withAuth, withMethods } from "@/api-helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.headers.email as string;

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

    const recipes = await prisma.recipe.findMany({
      take: 10,
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

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["GET"], withAuth(handler));
