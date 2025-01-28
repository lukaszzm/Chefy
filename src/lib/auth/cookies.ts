import { AuthConfig } from "@/lib/auth/config";
import { cookies } from "next/headers";

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(AuthConfig.SESSION_COOKIE_NAME, token, {
    expires: expiresAt,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(AuthConfig.SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
