import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const fixedEmail = email.toLowerCase();

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: fixedEmail,
            },
          });

          if (!user) throw new Error("Invalid email.");

          const match = await bcrypt.compare(password, user.password);

          if (!match) throw new Error("Invalid password.");

          return user;
        } catch (error) {
          throw new Error("Something went wrong.");
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
