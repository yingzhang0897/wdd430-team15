import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnSellerDashboard = nextUrl.pathname.startsWith('/dashboard/seller');
      const isOnUserDashboard = nextUrl.pathname.startsWith('/dashboard/user');
      const isOnSellerProfile = nextUrl.pathname.startsWith('/seller/');
      const isOnReviewPage = nextUrl.pathname.includes('/review');

      // Protect all dashboard routes
      if (isOnDashboard || isOnSellerProfile || isOnReviewPage) {
        if (!isLoggedIn) {
          return false; // Redirect to sign in
        }
        return true;
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;