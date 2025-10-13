'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { signOut } from '@/auth';


/* ------------------------------ SIGN OUT------------------------------ */
export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
  prepare: false,     // prevents "cached plan must not change result type"
});

/* ------------------------------ AUTHENTICATE ------------------------------ */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const redirectTo = formData.get('redirectTo') as string || '/dashboard/user';
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

/* ----------------------------- CREATE USER ----------------------------- */

// Define the schema for validation using Zod
const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
});

// Type-safe state for form feedback
export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function createUser(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // Validate form fields using Zod
  const validated = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed. Please correct the errors below.',
      success: false,
    };
  }

  const { name, email, password } = validated.data;

  // Check if email already exists
  const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    return {
      errors: { email: ['Email is already registered.'] },
      message: 'Duplicate email.',
      success: false,
    };
  }

  //  Hash password and prepare IDs
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = randomUUID();

  // Insert into users table
  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${userId}, ${name}, ${email}, ${hashedPassword})
    `;

    console.log(`User created: ${name}`);
    return {
      success: true,
      message: 'Account created successfully!',
    };
  } catch (error) {
    console.error(' Database error:', error);
    return {
      message: 'Database error. Please try again later.',
      success: false,
    };
  }
}
