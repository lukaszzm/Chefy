import { eq } from "drizzle-orm";

import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { userPreferredArea } from "@/lib/db/schema";

export const getPreferredAreas = async () => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const areas = await db.query.userPreferredArea.findMany({
    where: eq(userPreferredArea.userId, user.id),
    columns: {
      areaId: true,
    },
    with: {
      area: true,
    },
  });

  return areas.map(({ area }) => area);
};
