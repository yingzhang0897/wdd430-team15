import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            const result = await sql`SELECT * FROM users WHERE email = ${credentials.email}`;
            const user = result.rows[0];

            if (!user) return null;
              console.log(user);
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return null;

            // Return object used in JWT and session
            return { id: user.id, email: user.email, role: user.role };
            },
        }),

     // Google OAuth
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // GitHub OAuth
        GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string | number;
        session.user.role = token.role as string;
      }
      return session;
    },
    },
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };
