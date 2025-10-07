'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/seller';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

    const getBorderClass = (field: keyof typeof formData) => {
        const value = formData[field].trim();
        // Email field
        if (field === 'email') {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return isValidEmail ? 'border-green-500' : 'border-red-500';
        }
        // password field
        if (field === 'password') return 'border-gray-300';
        return value ? 'border-green-500' : 'border-red-500';
    };

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitting(true);

    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrors([
        result.error === 'CredentialsSignin'
          ? 'Invalid email or password'
          : result.error,
      ]);
      return;
    }

    router.push(result?.url ?? callbackUrl);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-600 px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border ${getBorderClass(
                    'email'
                )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border-gray-400 rounded-md border ${getBorderClass(
                    'password'
                )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                required
            />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        {errors.length > 0 && (
          <div className="mt-4 text-red-600 text-sm space-y-1">
            {errors.map((err, i) => (
              <p key={i}>• {err}</p>
            ))}
          </div>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account? <a href="/account" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </main>
  );
}
