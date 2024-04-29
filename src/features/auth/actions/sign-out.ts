"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { lucia, validateRequest } from "@/lib/auth";
import { errorResponse } from "@/utils/action-response";

export const signOut = async () => {
  const { session } = await validateRequest();

  if (!session) {
    return errorResponse("No session found");
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.home);
};
