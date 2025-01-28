"use server";

import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { errorResponse } from "@/utils/action-response";
import { getCurrentSession, invalidateSession } from "@/lib/auth/session";
import { deleteSessionTokenCookie } from "@/lib/auth/cookies";

export const signOut = async () => {
  const { session } = await getCurrentSession();

  if (!session) {
    return errorResponse("No session found");
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  return redirect(routes.home);
};
