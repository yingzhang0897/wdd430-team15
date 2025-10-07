import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/account/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnLoginPage = nextUrl.pathname.startsWith("/account/login");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/dashboard/seller", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
