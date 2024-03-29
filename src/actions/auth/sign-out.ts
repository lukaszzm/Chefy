"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { lucia, validateRequest } from "@/lib/auth";

export async function signOut() {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(routes.home);
}
