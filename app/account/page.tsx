import RegisterPage from './register/page';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-100 mt-32 pb-20">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <Suspense>
          <RegisterPage />
        </Suspense>
      </div>
    </main>
  );
}