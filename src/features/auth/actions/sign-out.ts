"use server";

import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import { deleteSessionTokenCookie } from "@/lib/auth/cookies";
import { getCurrentSession, invalidateSession } from "@/lib/auth/session";
import { errorResponse } from "@/utils/action-response";

export const signOut = async () => {
  const { session } = await getCurrentSession();

  if (!session) {
    return errorResponse("No session found");
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  return redirect(routes.home);
};
