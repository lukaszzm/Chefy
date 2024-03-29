"use server";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { routes } from "@/config/routes";
import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { SignInValues } from "@/schemas/auth/sign-in-schema";

export const signIn = async (payload: SignInValues) => {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, payload.email),
  });

  if (!existingUser) {
    return {
      error: "Incorrect email or password",
    };
  }

  const validPassword = await new Argon2id().verify(existingUser.password, payload.password);

  if (!validPassword) {
    return {
      error: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.explore);
};
