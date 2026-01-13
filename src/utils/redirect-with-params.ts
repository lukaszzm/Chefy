import type { Route } from "next";
import { redirect } from "next/navigation";

export function redirectWithParams(url: Route, params: Record<string, string>): never {
  const searchParams = new URLSearchParams(params);
  return redirect(`${url}?${searchParams.toString()}`);
}
