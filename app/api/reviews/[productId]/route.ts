import {NextResponse, NextRequest} from "next/server";
import {randomUUID} from "crypto";
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
      productId: `${string}-${string}-${string}-${string}-${string}` | string;
    }>;
  }
) {
  const {productId} = await context.params;

  if (!sql) {
    return NextResponse.json(
      {message: "POSTGRES_URL not configured"},
      {status: 500}
    );
  }
  const rows = await sql`SELECT * FROM reviews WHERE product_id = ${productId}`;
  return NextResponse.json(rows, {status: 200});
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
