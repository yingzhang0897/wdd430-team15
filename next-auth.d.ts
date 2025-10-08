import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | number;
      role?: string;
    } & DefaultSession["buyer"];
  }

  interface User extends DefaultUser {
    id?: string | number;
    role?: string;
  }

  interface JWT {
    id?: string | number;
    role?: string;
  }
}
