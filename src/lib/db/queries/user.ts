import { eq, like } from "drizzle-orm";

import db from "@/lib/db";
import { user, userPreferredArea, userPreferredCategory } from "@/lib/db/schema";
import type { User } from "@/types";

export const getUserById = async (id: string) =>
  await db.query.user.findFirst({
    where: eq(user.id, id),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  });

export const getUserWithPasswordById = async (id: string) =>
  db.query.user.findFirst({
    where: eq(user.id, id),
  });

export const getUserWithPasswordByMail = async (email: string) =>
  db.query.user.findFirst({
    where: eq(user.email, email),
  });

export const getUserByMail = async (email: string) =>
  db.query.user.findFirst({
    where: eq(user.email, email),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  });

export const getTestUsers = async () =>
  db.query.user.findMany({
    where: like(user.email, "e2e_%@e2e.com"),
  });

export const createUser = async (data: User) => await db.insert(user).values(data);

export const deleteUser = async (id: string) => db.delete(user).where(eq(user.id, id));

export const deleteUserByMail = async (email: string) => db.delete(user).where(eq(user.email, email));

export const updateUser = async (id: string, data: Partial<User>) => db.update(user).set(data).where(eq(user.id, id));

export const createUserWithPreferences = async (data: User) => {
  await db.transaction(async (trx) => {
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
};
