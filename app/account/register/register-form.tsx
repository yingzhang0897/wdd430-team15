'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createUser } from '@/app/lib/actions';
import Button from '@/app/components/Button';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    message: '',
    errors: {},
  });

  return (
    <div className="rounded-xl flex items-start justify-center pt-5 px-2 pb-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-5">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-3 underline">
          Create Your Account
        </h1>

        {/* Global Message */}
        {state.message && (
          <div
            className={`${
              state.success
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            } p-3 rounded text-center mb-4`}
          >
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-3 flex-1 rounded-lg px-6 pb-4 pt-4 border border-gray-200 shadow-lg bg-gray-50">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              className="w-full border rounded-md px-3 py-2 text-gray-900"
              placeholder="Team-15 Project"
              required
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-md px-3 py-2 text-gray-900"
              placeholder="you@example.com"
              required
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-md px-3 py-2 text-gray-900"
              placeholder="••••••••"
              required
            />
            {state.errors?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password[0]}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center mt-4"
            aria-disabled={isPending}
          >
            {isPending ? 'Registering...' : 'Register'}
          </Button>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/account/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
