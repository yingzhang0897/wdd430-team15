import Link from 'next/link';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-32">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-6 p-4 md:-mt-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Choose your login type</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Login */}
          <Link
            href="/account/login/user"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer</h3>
            <p className="text-sm text-gray-600">Browse and purchase handcrafted products</p>
          </Link>

          {/* Seller Login */}
          <Link
            href="/account/login/seller"
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Artisan</h3>
            <p className="text-sm text-gray-600">Manage your products and orders</p>
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          New to our platform?{' '}
          <Link
            href="/account/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}