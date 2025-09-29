
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ errors: ["Email and password are required"] }, { status: 400 });
    }

    //.... shall be updated: Any team member can!

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ errors: ["Internal server error"] }, { status: 500 });
  }
}
