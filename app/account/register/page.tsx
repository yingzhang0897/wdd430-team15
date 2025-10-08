'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!touched[name as keyof typeof touched]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const isPasswordMatch = formData.password === formData.confirmPassword;
  const showPasswordError = touched.confirmPassword && !isPasswordMatch;

  const getBorderClass = (field: keyof typeof touched) => {
    const value = formData[field].trim?.() || '';
    const isTouched = touched[field];

    if (!isTouched) return 'border-gray-300';

    if (field === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isValidEmail ? 'border-green-500' : 'border-red-500';
    }

    if (field === 'confirmPassword') {
      return isPasswordMatch ? 'border-green-500' : 'border-red-500';
    }

    return value ? 'border-green-500' : 'border-red-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors(['Please enter a valid email address']);
      return;
    }

    if (!isPasswordMatch) {
      setErrors(['Passwords do not match']);
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await res.json();

    if (!res.ok) {
      setErrors(data.errors || ['Something went wrong, failed to register']);
      return;
    } else {
      setSuccess(data.message || 'Registration successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'buyer',
      });
      setTouched({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
    }

    
    router.push('/account/login'); 
   
  };

  return (
    <div className="bg-red-300 rounded-xl flex items-start justify-center pt-5 px-2 pb-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-5">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 rounded-xl underline decoration-gray-800">
          Create Your Account
        </h1>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-1 rounded mb-4">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Team 15"
              className={`w-full px-4 py-2 rounded-md border ${getBorderClass(
                'name'
              )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-800 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 rounded-md border ${getBorderClass(
                'email'
              )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-md border ${getBorderClass(
                'password'
              )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 rounded-md border ${getBorderClass(
                'confirmPassword'
              )} text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              required
            />
            {showPasswordError && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
            )}
          </div>

          {/* User Type */}
          {/*<div>
            <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-1">
              Choose account type
            </label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="CLIENT">Client</option>
              <option value="SELLER">Seller</option>
            </select>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <a href="/account/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
