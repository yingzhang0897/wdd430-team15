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
      productId: `${string}-${string}-${string}-${string}-${string}` | string;
    }>;
  }
) {
  const {productId} = await context.params;

  if (!productId || !sql) {
    return NextResponse.json({message: "Invalid request"}, {status: 400});
  }

  try {
    const product =
      await sql`SELECT * FROM products WHERE product_id = ${productId}`;
    return NextResponse.json(product[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {message: "Internal Server Error", error},
      {status: 500}
    );
  }
}
