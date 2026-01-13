import type { DynamicRoute } from "@/config/routes";
import type { Route } from "next";

export function slugRoute(base: DynamicRoute, slugs: Record<string, string>): Route {
  let newRoute: string = base;

  Object.entries(slugs).forEach(([key, value]) => {
    newRoute = newRoute.replace(`[${key}]`, value);
  });

  return newRoute as Route;
}
