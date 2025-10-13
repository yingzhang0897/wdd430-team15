import RegisterForm from './register-form';
import { Suspense } from 'react';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen mt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}