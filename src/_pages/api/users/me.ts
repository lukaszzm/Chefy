import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import { z } from "zod";

import { withAuth, withMethods, withValidation } from "@/api-helpers";
import {
  updateName,
  updatePreferredCategories,
  updatePreferredAreas,
  getUser,
  updatePassword,
} from "@/queries/db/user";

const schema = z
  .object({
    name: z.string().min(1),
    preferredCategories: z.array(z.string()),
    preferredAreas: z.array(z.string()),
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
  })
  .partial();

type RequestBody = z.infer<typeof schema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, preferredCategories, preferredAreas, currentPassword, newPassword }: RequestBody = req.body;
  const email = req.headers.email as string;

  try {
    if (name) {
      await updateName(email, name);

      return res.status(200).json({ message: "Success! Your name has been changed." });
    }

    if (preferredCategories) {
      await updatePreferredCategories(email, preferredCategories);

      return res.status(200).json({
        message: "Success! Your preferred categories has been changed.",
      });
    }

    if (preferredAreas) {
      await updatePreferredAreas(email, preferredAreas);

      return res.status(200).json({ message: "Success! Your preferred areas has been changed." });
    }

    if (currentPassword && newPassword) {
      const user = await getUser(email);

      if (!user) throw new Error("Cannot find the user.");

      const result = user.password ? await bcrypt.compare(currentPassword, user.password) : false;

      if (!result) return res.status(401).json({ message: "Invalid password." });

      await updatePassword(email, newPassword);

      return res.status(200).json({ message: "Success! Your password has been changed." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["PATCH"], withAuth(withValidation(schema, handler)));
