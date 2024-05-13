"use server";

import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { randomUUID } from "crypto";

import { routes } from "@/config/routes";
import type { SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { lucia } from "@/lib/auth";
import { createUserWithPreferences, getUserByMail } from "@/lib/db/queries/user";
import { errorResponse } from "@/utils/action-response";

export const signUp = async (payload: SignUpPayload) => {
  const fixedMail = payload.email.toLowerCase();
  const existingUser = await getUserByMail(fixedMail);

  if (existingUser) {
    return errorResponse("User already exists");
  }

  const hashedPassword = await hash(payload.password, 8);
  const userId = randomUUID();

  try {
    await createUserWithPreferences({
      id: userId,
      name: payload.name,
      email: fixedMail,
      password: hashedPassword,
    });
  } catch (error) {
    return errorResponse("Failed to create user");
  }

  const session = await lucia.createSession(userId, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.explore);
};
