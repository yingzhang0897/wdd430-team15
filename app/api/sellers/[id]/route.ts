import {NextResponse, NextRequest} from "next/server";
import postgres from "postgres";

if (!process.env.POSTGRES_URL) {
  console.warn(
    "POSTGRES_URL is not set. Database operations will fail until it's provided."
  );
}

const sql = process.env.POSTGRES_URL
  ? postgres(process.env.POSTGRES_URL, {ssl: "require"})
  : null;

// TODO: Replace with Prisma when team decides
// import { prisma } from '../../../lib/prisma'

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: `${string}-${string}-${string}-${string}-${string}` | string;
    }>;
  }
) {
  const {id} = await context.params;
  const seller_id = id;

  if (!sql) {
    return NextResponse.json(
      {message: "POSTGRES_URL not configured"},
      {status: 500}
    );
  }

  try {
    const rows =
      await sql`SELECT * FROM sellers WHERE seller_id = ${seller_id}`;
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        {message: "Seller not found", seller_id},
        {status: 404}
      );
    }
    return NextResponse.json(rows, {status: 200});
  } catch (err) {
    console.error("Error querying seller:", err);
    return NextResponse.json(
      {message: "Database query failed", error: String(err)},
      {status: 500}
    );
  }
}

// Prisma version (commented out for now):
// export async function GET() {
//   const products = await prisma.product.findMany()
//   return NextResponse.json(products)
// }

// export async function POST(request: Request) {
//   const data = await request.json()
//   const newProduct = await prisma.product.create({ data })
//   return NextResponse.json(newProduct, { status: 201 })
// }
