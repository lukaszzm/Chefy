"use server";

import { hash } from "bcrypt";
import { redirect } from "next/navigation";

import { randomUUID } from "crypto";

import { routes } from "@/config/routes";
import type { SignUpPayload } from "@/features/auth/schemas/sign-up-schema";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { createSession, generateSessionToken } from "@/lib/auth/session";
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
  } catch {
    return errorResponse("Failed to create user");
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, userId);

  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect(routes.explore);
};
