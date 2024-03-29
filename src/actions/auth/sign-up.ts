"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { routes } from "@/config/routes";
import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { SignUpValues } from "@/schemas/auth/sign-up-schema";

export const signUp = async (payload: SignUpValues) => {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, payload.email),
  });

  if (existingUser) {
    return {
      error: "User with this email already exists",
    };
  }

  const hashedPassword = await new Argon2id().hash(payload.password);
  const userId = generateId(15);

  try {
    await db.insert(user).values({
      id: userId,
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
    });
  } catch (error) {
    return {
      error: "Failed to create user",
    };
  }

  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.explore);
};
