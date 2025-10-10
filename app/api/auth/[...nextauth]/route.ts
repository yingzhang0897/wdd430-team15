import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { sql } from "@vercel/postgres"; 
import bcrypt from "bcrypt";

const DEFAULT_ROLE = 'buyer'; 

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

                return { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name, 
                    role: user.role 
                }; 
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
        
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google' || account?.provider === 'github') {
                const userEmail = user.email || profile?.email;
                if (!userEmail) return false; 

                const existingUserResult = await sql`SELECT id FROM users WHERE email = ${userEmail}`;

                if (existingUserResult.rows.length === 0) {
                    const name = user.name || profile?.name || 'New User';
                    const email = userEmail;
                    
                    try {
                        // Insert new use
                        await sql`
                            INSERT INTO users (name, email, role)
                            VALUES (${name}, ${email}, ${DEFAULT_ROLE});
                        `;
                        console.log(`New user created for ${account.provider}: ${email}`);
                    } catch (error) {
                        console.error("Database error during OAuth sign-up:", error);
                        return false; 
                    }
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                if (user.role) {
                    token.role = user.role;
                }
                
                // For OAuth: Need to fetch the role from the DB after sign-in/creation
                else if (token.email) {
                    const result = await sql`SELECT id, role FROM users WHERE email = ${token.email}`;
                    const dbUser = result.rows[0];
                    if (dbUser) {
                        token.id = dbUser.id; 
                        token.role = dbUser.role; // Fetch the role
                    }
                }
                
            }
            // return existing token on submit
            return token;
        },

        
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role; 
            }
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST };