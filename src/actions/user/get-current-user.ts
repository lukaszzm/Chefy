import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { user } from "@/lib/db/schema";

export const getCurrentUser = async () => {
  const { user: authUser } = await validateRequest();

  if (!authUser) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.query.user.findFirst({
    where: eq(user.id, authUser.id),
    columns: {
      id: true,
      name: true,
      email: true,
      password: false,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  return existingUser;
};
