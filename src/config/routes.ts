export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  explore: "/explore",
  likes: "/likes",
  settings: "/settings",
  account: "/settings/account",
  preferences: "/settings/preferences",
} as const satisfies Record<string, string>;
