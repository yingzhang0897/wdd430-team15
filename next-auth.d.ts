import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      user_id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    user_id?: string;
    role?: string;
  }

  interface JWT {
    id: string;
    user_id?: string;
    role?: string;
  }
}
