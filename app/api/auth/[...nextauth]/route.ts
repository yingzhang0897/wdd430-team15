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
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return null;

            return { id: user.id, email: user.email, role: user.role }; 
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

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
        async signIn({user, account, profile}) {
            if (account?.provider === 'google' || account?.provider === 'github') {
                const userEmail = user.email || profile?.email;

                // check if user already exists
                const existingUserResult = await sql`SELECT * FROM users WHERE email = ${userEmail}`;
                if (existingUserResult.rows.length > 0) {
                    return true;
                } else {
                    // insert new user with default 'buyer' role
                    const name = user.name || profile?.name;
                    const email = userEmail;
                    const role = 'buyer'; 
      
                    await sql`
                        INSERT INTO users (name, email, role)
                        VALUES (${name}, ${email}, ${role});
                    `;
                    return true;
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            // if the user object is available or initial sign-in
            if (user) { 
                // Fetch user from the DB if object exist.
                const result = await sql`SELECT user_id, role FROM users WHERE email = ${token.email}`;
                const dbUser = result.rows[0];

                if (dbUser) {
                    // Mapping the user ID and role
                    token.id = dbUser.user_id; 
                    token.role = dbUser.role;
                } else {
                    // Fallback, if logics incorrect
                    token.id = user.id;
                    token.role = user.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                //adding properties from the token to the session
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