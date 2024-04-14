import type { ReadonlyURLSearchParams } from "next/navigation";

export function dynamicRoute(base: string, params: ReadonlyURLSearchParams, query: string, value: string): string {
  const newSearchparams = new URLSearchParams(params);
  newSearchparams.set(query, value);

  return `${base}?${newSearchparams.toString()}`;
}
