import type { Session, SessionValidationResult, SafeUser } from "@/types";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import db from "@/lib/db";
import { sessionTable, userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AuthConfig } from "@/lib/auth/config";
import { cache } from "react";
import { cookies } from "next/headers";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = {
    userId,
    id: sessionId,
    expiresAt: new Date(Date.now() + 1000 * AuthConfig.SESSION_EXPIRATION_TIME),
  } satisfies Session;

  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [result] = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }

  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * AuthConfig.SESSION_VALIDATION_TIME) {
    session.expiresAt = new Date(Date.now() + 1000 * AuthConfig.SESSION_EXPIRATION_TIME);

    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionTable.id, session.id));
  }

  const { password, ...safeUser } = user;
  return { session, user: safeUser };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

/**
 * Get the current session from the request cookies.
 */
export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AuthConfig.SESSION_COOKIE_NAME)?.value ?? null;

  if (token === null) {
    return { session: null, user: null };
  }

  const result = await validateSessionToken(token);
  return result;
});

/**
 * Get the current user from the session, or throw an error if the user is not logged in.
 */
export const getCurrentUser = cache(async (): Promise<SafeUser> => {
  const { user } = await getCurrentSession();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
});
