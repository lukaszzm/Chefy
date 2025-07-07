import { cache } from "react";

import { eq, like } from "drizzle-orm";

import db from "@/lib/db";
import { user, userPreferredArea, userPreferredCategory } from "@/lib/db/schema";
import type { User, UserPayload } from "@/types";

export const getUserById = cache(
  async (id: string) =>
    await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    })
);

export const getUserWithPasswordByMail = cache(async (email: string) =>
  db.query.user.findFirst({
    where: eq(user.email, email),
  })
);

export const getUserByMail = cache(async (email: string) =>
  db.query.user.findFirst({
    where: eq(user.email, email),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  })
);

export const getTestUsers = cache(async () =>
  db.query.user.findMany({
    where: like(user.email, "e2e_%@e2e.com"),
  })
);

export async function createUser(data: User) {
  return db.insert(user).values(data);
}

export async function deleteUser(id: string) {
  return db.delete(user).where(eq(user.id, id));
}

export async function deleteUserByMail(email: string) {
  return db.delete(user).where(eq(user.email, email));
}

export async function updateUser(id: string, data: Partial<User>) {
  return db.update(user).set(data).where(eq(user.id, id));
}

export async function createUserWithPreferences(data: UserPayload) {
  return db.transaction(async (trx) => {
    const [createdUser] = await trx.insert(user).values(data).returning({ userId: user.id });

    const allCategories = await trx.query.category.findMany();
    for (const category of allCategories) {
      await trx.insert(userPreferredCategory).values({
        userId: createdUser.userId,
        categoryId: category.id,
      });
    }

    const allAreas = await trx.query.area.findMany();
    for (const area of allAreas) {
      await trx.insert(userPreferredArea).values({
        userId: createdUser.userId,
        areaId: area.id,
      });
    }
  });
}
