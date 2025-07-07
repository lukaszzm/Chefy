import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

async function getAuthSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

const cachedGetAuthSession = cache(getAuthSession);

export { cachedGetAuthSession as getAuthSession };
