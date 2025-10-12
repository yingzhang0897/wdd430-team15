import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSellerDashboard = nextUrl.pathname.startsWith('/dashboard/seller');
      const isOnSellerProfile = nextUrl.pathname.startsWith('/seller/');

      if (isOnSellerDashboard || isOnSellerProfile) {
        return isLoggedIn;
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;