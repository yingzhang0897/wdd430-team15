import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  prepare: false, //disable prepared statements to prevent cached plan errors
});
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const users = await sql`SELECT id, name, email, password FROM users WHERE email=${email}`;
    if (users.length > 0) {
      const user = users[0];
      return {
        user_id: user.id,  // Map database 'id' to expected 'user_id'
        name: user.name,
        email: user.email,
        password: user.password
      } as User;
    }
    return undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user_id || user.id;
        token.email = user.email;
        token.name = user.name;
        console.log('JWT callback - storing user:', { id: token.id, email: token.email, name: token.name });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        console.log('Session callback - user session:', { id: session.user.id, email: session.user.email, name: session.user.name });
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log('User authenticated:', { id: user.user_id, email: user.email, name: user.name });
            return {
              id: user.user_id,
              user_id: user.user_id,
              email: user.email,
              name: user.name,
            };
          }
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});