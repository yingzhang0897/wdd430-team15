import {NextRequest, NextResponse} from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: "require"});

export async function GET(
  request: NextRequest,
  context: {params: Promise<{productId: string}>}
): Promise<Response | void> {
  const params = await context.params;
  const productId = params.productId;

  if (!productId) {
    return NextResponse.json(
      {message: "Product ID is required"},
      {status: 400}
    );
  }

  if (!sql) {
    return NextResponse.json(
      {message: "POSTGRES_URL not configured"},
      {status: 500}
    );
  }

  try {
    // Query to get the average rating for the specific product
    const result = await sql`
      SELECT AVG(rating) AS average_rating
      FROM reviews
      WHERE product_id = ${productId}
    `;

    // Extract the average rating from the result
    const averageRating = result[0]?.average_rating ?? 0; // Default to 0 if no reviews found

    console.log(
      `Fetched average rating: ${averageRating} for product_id=${productId}`
    );

    return NextResponse.json({averageRating});
  } catch (error) {
    console.error("Error fetching reviews:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as {message: string}).message
        : String(error);
    return NextResponse.json(
      {message: "Error fetching reviews", error: errorMessage},
      {status: 500}
    );
  }
}
