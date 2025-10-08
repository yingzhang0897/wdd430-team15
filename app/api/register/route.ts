import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Check if user already exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email};`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const role = 'buyer';
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
   
    // Insert the new user
    const result = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${passwordHash}, ${role})
      RETURNING user_id, name, email, password, role;
    `;
    console.log('Register req.body:', req.body);

    return NextResponse.json({ message: 'Registered successfully', user: result[0] }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
