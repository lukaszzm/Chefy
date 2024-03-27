/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
    };
  }
}
