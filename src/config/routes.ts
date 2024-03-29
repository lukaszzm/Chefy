export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  explore: "/explore",
  likes: "/likes",
  settings: "/settings",
} as const satisfies Record<string, string>;
