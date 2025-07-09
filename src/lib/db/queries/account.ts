import "server-only";

import db from "@/lib/db";
import { account } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getAccountByUserId = cache(async (userId: string) =>
  db.query.account.findFirst({
    where: eq(account.userId, userId),
  })
);
