import type { NextApiRequest, NextApiResponse } from "next";

import { withAuth, withMethods } from "@/api-helpers";
import { getRandomRecipes } from "@/queries/db/recipe";
import { getPreferences } from "@/queries/db/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.headers.email as string;

  try {
    const userPreferences = await getPreferences(email);

    if (!userPreferences) throw new Error("Something went wrong.");

    const recipes = await getRandomRecipes(email, userPreferences.preferredAreas, userPreferences.preferredCategories);

    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["GET"], withAuth(handler));
