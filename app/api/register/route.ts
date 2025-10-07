// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { name, email, password, confirmPassword } = await req.json();

//   const errors = [];

//   if (!name || !email || !password || !confirmPassword) {
//     errors.push('All fields are required.');
//   }

//   if (password !== confirmPassword) {
//     errors.push('Passwords do not match.');
//   }

//   if (password.length < 6) {
//     errors.push('Password must be at least 6 characters.');
//   }

//   if (errors.length > 0) {
//     return NextResponse.json({ errors }, { status: 400 });
//   }

//   // Shall add database to save user details @ any

//   return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
// }
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: Request) {
  try {
    const { name, email, password, role, shopName, imageUrl, bio, story } = await req.json();

    if (!name || !email || !password || !role)
      return NextResponse.json({ errors: ["Missing required fields"] }, { status: 400 });

    // Check if email already exists
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0)
      return NextResponse.json({ errors: ["Email already registered"] }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users
    const [newUser] = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
      RETURNING user_id;
    `;

    // If seller, also insert into sellers table
    if (role === "seller") {
      if (!shopName || !bio || !story)
        return NextResponse.json({ errors: ["Seller information incomplete"] }, { status: 400 });

      await sql`
        INSERT INTO sellers (user_id, name, image_url, bio, story)
        VALUES (${newUser.user_id}, ${shopName}, ${imageUrl || "/images/default-shop.jpg"}, ${bio}, ${story});
      `;
    }

    return NextResponse.json({ message: "Registration successful!" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ errors: ["Server error"] }, { status: 500 });
  }
}
