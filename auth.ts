import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

import { authConfig } from "./auth.config";

const { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET } = process.env;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: AUTH_SECRET,
  providers: [
    GitHub({
      clientId: AUTH_GITHUB_ID,
      clientSecret: AUTH_GITHUB_SECRET,
    }),
  ],
});
