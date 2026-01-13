import type { Route } from "next";

const StaticRoutes = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Discover: "/discover",
  Likes: "/likes",
  Settings: "/settings",
} as const satisfies Record<string, Route>;

const DynamicRoutes = {
  Like: "/likes/[id]",
  Account: "/settings/account",
  Preferences: "/settings/preferences",
} as const satisfies Record<string, string>;

export const Routes = {
  ...StaticRoutes,
  ...DynamicRoutes,
} as const satisfies Record<string, string>;

export type AppRoute = (typeof Routes)[keyof typeof Routes];

const ApiStaticRoutes = {
  Feed: "/api/recipes/feed",
} as const satisfies Record<string, Route>;

const ApiDynamicRoutes = {
  LikeRecipe: "/api/recipes/[id]/like",
  DislikeRecipe: "/api/recipes/[id]/dislike",
} as const satisfies Record<string, string>;

export const ApiRoutes = {
  ...ApiStaticRoutes,
  ...ApiDynamicRoutes,
} as const satisfies Record<string, string>;

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes];

type DynamicAppRoute = (typeof DynamicRoutes)[keyof typeof DynamicRoutes];
type DynamicApiRoute = (typeof ApiDynamicRoutes)[keyof typeof ApiDynamicRoutes];

export type DynamicRoute = DynamicAppRoute | DynamicApiRoute;
