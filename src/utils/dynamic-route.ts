import type { Route } from "next";
import type { ReadonlyURLSearchParams } from "next/navigation";

export function dynamicRoute(base: Route, params: ReadonlyURLSearchParams, query: string, value: string): Route {
  const newSearchparams = new URLSearchParams(params);
  newSearchparams.set(query, value);

  return `${base}?${newSearchparams.toString()}`;
}
