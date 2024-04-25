import { cache } from "react";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { cookies } from "next/headers";

import db from "@/lib/db";
import { session, user } from "@/lib/db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      }
    } catch {
      console.error("Failed to refresh session");
    }

    return result;
  }
);

export const authUser = cache(async (): Promise<User> => {
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return user;
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
