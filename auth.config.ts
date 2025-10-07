import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/app/lib/users";

function validateCredentials(credentials: Record<string, unknown> | undefined) {
  if (!credentials) {
    return null;
  }

  const email = typeof credentials.email === "string" ? credentials.email.trim() : "";
  const password = typeof credentials.password === "string" ? credentials.password : "";

  if (!email || !email.includes("@")) {
    return null;
  }

  if (password.length < 6) {
    return null;
  }

  return { email, password };
}

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = validateCredentials(credentials);

        if (!parsedCredentials) {
          return null;
        }

        const { email, password } = parsedCredentials;
        const user = await getUserByEmail(email);

        if (!user) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
