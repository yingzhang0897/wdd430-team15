import {NextResponse, NextRequest} from "next/server";
import postgres from "postgres";
import {UUID} from "crypto";

const sql = process.env.POSTGRES_URL
  ? postgres(process.env.POSTGRES_URL, {ssl: "require"})
  : null;

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      userId: `${string}-${string}-${string}-${string}-${string}` | string;
    }>;
  }
) {
  const {userId} = await context.params;

  if (!userId || !sql) {
    return NextResponse.json({message: "Invalid request"}, {status: 400});
  }

  try {
    const users =
      await sql`SELECT * FROM users WHERE id = ${userId}`;

    if (!users || users.length === 0) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    const user = users[0];

    // Serialize the user data to handle PostgreSQL types
    const serializedUser = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    
    return NextResponse.json(serializedUser);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {message: "Internal Server Error", error: error instanceof Error ? error.message : 'Unknown error'},
      {status: 500}
    );
  }
}
