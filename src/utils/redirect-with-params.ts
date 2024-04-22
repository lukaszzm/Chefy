import { redirect } from "next/navigation";

export const redirectWithParams = (url: string, params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);

  return redirect(`${url}?${searchParams.toString()}`);
};
