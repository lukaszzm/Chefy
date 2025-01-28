import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AuthConfig } from "@/lib/auth/config";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get(AuthConfig.SESSION_COOKIE_NAME)?.value ?? null;

    if (token !== null) {
      response.cookies.set(AuthConfig.SESSION_COOKIE_NAME, token, {
        path: "/",
        maxAge: AuthConfig.SESSION_EXPIRATION_TIME,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  }

  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, { status: 403 });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, { status: 403 });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}
