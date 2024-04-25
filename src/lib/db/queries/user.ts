import { eq } from "drizzle-orm";

import db from "@/lib/db";
import { user } from "@/lib/db/schema";
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

export const createUser = async (data: User) => await db.insert(user).values(data);

export const updateUser = async (id: string, data: Partial<User>) => db.update(user).set(data).where(eq(user.id, id));
