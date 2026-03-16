

import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        console.log(`[Auth] Attempting login for: ${credentials.email}`);

        if (!user) {
          console.error(`[Auth] User not found: ${credentials.email}`);
          throw new Error("No user found");
        }

        const isValid = await compare(credentials.password, user.passwordHash);

        if (!isValid) {
          console.error(`[Auth] Invalid password for: ${credentials.email}`);
          throw new Error("Invalid password");
        }

        console.log(`[Auth] Login successful: ${credentials.email}`);

        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.isAdmin = user.isAdmin;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin;
        session.user.id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "cbedf71d87ca26c22e6b87e3f3dde8edb3c66d2a96ab397ec27f384f475f3c19",
  debug: true,
};
