'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

type LoginFormState = {
  error?: string | null;
};

export async function authenticate(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Please provide your email and password.' };
  }

  try {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password. Please try again.' };
        default:
          return { error: 'Something went wrong. Please try again later.' };
      }
    }

    throw error;
  }

  redirect('/dashboard');
}
