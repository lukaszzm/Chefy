import type { NextApiRequest, NextApiResponse } from "next";

import type { z } from "zod";

import { withMethods, withValidation } from "@/api-helpers";
import { createUser, getUser } from "@/queries/db/user";

import { RegisterSchema } from "@/schemas/RegisterSchema";

type RequestBody = z.infer<typeof RegisterSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password }: RequestBody = req.body;
  const fixedEmail = email.toLowerCase();

  try {
    const user = await getUser(fixedEmail);

    if (user) return res.status(409).json({ message: "This email is already used." });

    await createUser(name, fixedEmail, password);

    return res.status(201).json({ message: "Success! Successfully registered." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export default withMethods(["POST"], withValidation(RegisterSchema, handler));
