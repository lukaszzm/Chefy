"use server";

import { compare } from "bcrypt";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import type { SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { setSessionTokenCookie } from "@/lib/auth/cookies";
import { createSession, generateSessionToken } from "@/lib/auth/session";
import { getUserWithPasswordByMail } from "@/lib/db/queries/user";
import { errorResponse } from "@/utils/action-response";

export const signIn = async (payload: SignInPayload) => {
  const fixedMail = payload.email.toLowerCase();
  const existingUser = await getUserWithPasswordByMail(fixedMail);

  if (!existingUser) {
    return errorResponse("Incorrect email or password");
  }

  const validPassword = await compare(payload.password, existingUser.password);

  if (!validPassword) {
    return errorResponse("Incorrect email or password");
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, existingUser.id);

  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return redirect(routes.explore);
};
