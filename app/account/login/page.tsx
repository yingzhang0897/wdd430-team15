'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' , role: ''});
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const getBorderClass = (field: keyof typeof formData) => {
    const value = formData[field].trim();
    if (field === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ;
      return  isValidEmail ? 'border-green-500' : 'border-gray-500';
    }
    if (field === 'password') return 'border-gray-500';
    return value ? 'border-green-500' : 'border-red-500';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (res?.ok) {
        setSuccess('Login successful!');
        router.push('/dashboard');
      } else {
        setErrors(['Invalid email or password.']);
      }
    } catch (error) {
      setErrors(['Something went wrong. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-600 px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-gray-800" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border ${getBorderClass('email')} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            required
          />

          <label className="text-gray-800" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-md border ${getBorderClass('password')} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-md transition cursor-pointer ${
              isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="flex items-center mt-10">
          <hr className="flex-grow border-t border-gray-300" />
          <p className="mx-4 text-gray-400 whitespace-nowrap">Or</p>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className='block'>
          <button onClick={() => signIn("google")} className='text-gray-600 mr-10 cursor-pointer border-gray-300'>
            Sign in with Google
          </button>

          <button onClick={() => signIn("github")} className='text-gray-600 mr-10 cursor-pointer'>
            Sign in with GitHub
          </button>
        </div> 
        
        <hr></hr>
        {errors.length > 0 && (
          <div className="mt-4 text-red-600 text-sm space-y-1">
            {errors.map((err, i) => (
              <p key={i}>• {err}</p>
            ))}
          </div>
        )}

        {success && (
          <p className="mt-4 text-green-600 text-sm text-center">{success}</p>
        )}

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{' '}
          <Link href="/account" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
