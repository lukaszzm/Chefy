export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  explore: "/explore",
  likes: "/likes",
  like: "/likes/:id",
  settings: "/settings",
  account: "/settings/account",
  preferences: "/settings/preferences",
} as const satisfies Record<string, string>;

export type Route = keyof typeof routes;
