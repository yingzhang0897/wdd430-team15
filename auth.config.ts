import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/account/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnReviewPage = nextUrl.pathname.endsWith('/review');

			// Protect dashboard and review routes only (seller profiles are public)
			if (isOnDashboard || isOnReviewPage) {
				if (!isLoggedIn) {
					return false // Redirect to sign in
				}
				return true
			}

			return true
		}
	},
	providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig
