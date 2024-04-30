"use server";

import { Scrypt } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import type { SignInPayload } from "@/features/auth/schemas/sign-in-schema";
import { lucia } from "@/lib/auth";
import { getUserWithPasswordByMail } from "@/lib/db/queries/user";
import { errorResponse } from "@/utils/action-response";

export const signIn = async (payload: SignInPayload) => {
  const fixedMail = payload.email.toLowerCase();
  const existingUser = await getUserWithPasswordByMail(fixedMail);

  if (!existingUser) {
    return errorResponse("Incorrect email or password");
  }

  const validPassword = await new Scrypt().verify(existingUser.password, payload.password);

  if (!validPassword) {
    return errorResponse("Incorrect email or password");
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.explore);
};
