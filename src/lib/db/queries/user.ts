import { cache } from "react";

import { eq, like } from "drizzle-orm";

import db from "@/lib/db";
import { userTable, userPreferredAreaTable, userPreferredCategoryTable } from "@/lib/db/schema";
import type { User } from "@/types";

export const getUserById = cache(
  async (id: string) =>
    await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    })
);

export const getUserWithPasswordById = cache(async (id: string) =>
  db.query.userTable.findFirst({
    where: eq(userTable.id, id),
  })
);

export const getUserWithPasswordByMail = cache(async (email: string) =>
  db.query.userTable.findFirst({
    where: eq(userTable.email, email),
  })
);

export const getUserByMail = cache(async (email: string) =>
  db.query.userTable.findFirst({
    where: eq(userTable.email, email),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  })
);

export const getTestUsers = cache(async () =>
  db.query.userTable.findMany({
    where: like(userTable.email, "e2e_%@e2e.com"),
  })
);

export async function createUser(data: User) {
  return db.insert(userTable).values(data);
}

export async function deleteUser(id: string) {
  return db.delete(userTable).where(eq(userTable.id, id));
}

export async function deleteUserByMail(email: string) {
  return db.delete(userTable).where(eq(userTable.email, email));
}

export async function updateUser(id: string, data: Partial<User>) {
  db.update(userTable).set(data).where(eq(userTable.id, id));
}

export async function createUserWithPreferences(data: User) {
  return db.transaction(async (trx) => {
    const [createdUser] = await trx.insert(userTable).values(data).returning({ userId: userTable.id });

    const allCategories = await trx.query.categoryTable.findMany();
    for (const category of allCategories) {
      await trx.insert(userPreferredCategoryTable).values({
        userId: createdUser.userId,
        categoryId: category.id,
      });
    }

    const allAreas = await trx.query.areaTable.findMany();
    for (const area of allAreas) {
      await trx.insert(userPreferredAreaTable).values({
        userId: createdUser.userId,
        areaId: area.id,
      });
    }
  });
}
