'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { authenticate } from './actions';

type FormState = {
  error: string | null;
};

const initialState: FormState = {
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed'
      disabled={pending}
    >
      {pending ? 'Signing in…' : 'Login'}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState(authenticate, initialState);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const getBorderClass = (field: keyof typeof formData) => {
    const value = formData[field].trim();

    if (field === 'email') {
      const isValidEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
      return value.length === 0 ? 'border-gray-300' : isValidEmail ? 'border-green-500' : 'border-red-500';
    }

    if (field === 'password') {
      return value.length === 0 ? 'border-gray-300' : value.length >= 6 ? 'border-green-500' : 'border-red-500';
    }

    return value ? 'border-green-500' : 'border-gray-300';
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form action={formAction} className='space-y-4'>
      <input
        type='email'
        name='email'
        placeholder='Email Address'
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-md border ${getBorderClass('email')} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        required
        autoComplete='email'
      />

      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
        className={`w-full px-4 py-2 rounded-md border ${getBorderClass('password')} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        required
        autoComplete='current-password'
      />

      <SubmitButton />

      {state.error && (
        <p className='mt-2 text-sm text-red-600 text-center'>
          {state.error}
        </p>
      )}

      <p className='text-sm text-gray-600 text-center'>
        Don’t have an account?{' '}
        <Link href='/account' className='text-blue-600 hover:underline'>
          Register
        </Link>
      </p>
    </form>
  );
}
