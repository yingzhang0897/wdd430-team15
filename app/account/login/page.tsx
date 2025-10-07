import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-600 px-4 py-12'>
      <div className='bg-white shadow-xl rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
