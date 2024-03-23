import type { NextApiRequest, NextApiResponse } from "next";
import { withMethods, withAuth } from "@/api-helpers";
import { likeRecipe, unlikeRecipe } from "@/queries/db/recipe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.headers.email as string;
  const id = req.query.id as string;

  if (req.method === "POST") {
    try {
      await likeRecipe(email, id);
      return res.status(200).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  if (req.method === "DELETE") {
    try {
      await unlikeRecipe(email, id);
      return res.status(200).json({ id });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
};

export default withMethods(["POST", "DELETE"], withAuth(handler));
