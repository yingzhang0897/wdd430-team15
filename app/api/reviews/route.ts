import {NextResponse} from "next/server";
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

// Create a new review (in-memory for now using placeholder-data)
const createReview = async (request: Request) => {
  const data = await request.json();
  console.log("Received review data:", data);

  // Basic validation
  if (!data || (!data.productId && !data.product_id)) {
    return NextResponse.json({message: "Missing productId"}, {status: 400});
  }
  if (!data.rating && data.rating !== 0) {
    return NextResponse.json({message: "Missing rating"}, {status: 400});
  }

  const review_id = randomUUID();
  const newReview = {
    review_id,
    product_id: data.productId ?? data.product_id,
    user_id: data.userId ?? data.user_id ?? null,
    rating: Number(data.rating),
    comment: data.review ?? data.comment ?? "",
  };
  // Ensure we have a user_id. If none provided, try to pick a seeded user from DB (dev convenience).
  if (!newReview.user_id) {
    if (!sql) {
      return NextResponse.json(
        {message: "Missing userId and no database connection (POSTGRES_URL)."},
        {status: 400}
      );
    }
    try {
      const users = await sql`SELECT id FROM users LIMIT 1`;
      if (users && users.length > 0 && users[0].id) {
        newReview.user_id = users[0].id;
      } else {
        return NextResponse.json(
          {
            message:
              "Missing userId and no users found in database. Provide userId or seed users.",
          },
          {status: 400}
        );
      }
    } catch (err) {
      console.error("Error trying to derive user_id:", err);
      return NextResponse.json(
        {
          message: "Missing userId and unable to query users.",
          error: String(err),
        },
        {status: 500}
      );
    }
  }

  if (!sql) {
    console.error("POSTGRES_URL not configured — cannot insert into DB");
    return NextResponse.json(
      {message: "POSTGRES_URL not configured"},
      {status: 500}
    );
  }

  // Now attempt the insert and return the inserted row if successful.
  try {
    const inserted = await sql`
      INSERT INTO reviews (review_id, product_id, user_id, rating, comment)
      VALUES (
        ${newReview.review_id},
        ${newReview.product_id},
        ${newReview.user_id},
        ${newReview.rating},
        ${newReview.comment}
      ) RETURNING *;
    `;
    console.log("Inserted review into DB:", inserted?.[0]);
    return NextResponse.json(inserted?.[0] ?? newReview, {status: 201});
  } catch (err) {
    console.error("Failed to save review to database:", err);
    return NextResponse.json(
      {message: "Database insert failed", error: String(err)},
      {status: 500}
    );
  }
};

export async function POST(request: Request) {
  return createReview(request);
}

export async function GET() {
  // Return all reviews (demo)
  if (!sql) {
    return NextResponse.json(
      {message: "POSTGRES_URL not configured"},
      {status: 500}
    );
  }
  const rows = await sql`SELECT * FROM reviews`;
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
