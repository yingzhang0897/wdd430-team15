import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();

  const errors = [];

  if (!name || !email || !password || !confirmPassword) {
    errors.push('All fields are required.');
  }

  if (password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters.');
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Shall add database to save user details @ any

  return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
}
