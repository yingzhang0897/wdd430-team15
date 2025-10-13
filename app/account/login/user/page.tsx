import LoginForm from '../login-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Customer Login',
};

export default function UserLoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm userType="user" />
        </Suspense>
      </div>
    </main>
  );
}