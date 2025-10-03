import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listSellersWithProductsAndReviews() {
  // Fetch sellers
  const sellers = await sql`SELECT * FROM sellers ORDER BY name`;

  // Fetch products
  const products = await sql`SELECT * FROM products ORDER BY name`;

  // Fetch reviews (joined with users for reviewer name)
  const reviews = await sql`
    SELECT r.*, u.name AS reviewer_name
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.created_at DESC;
  `;

  // Group products + reviews under sellers
  return sellers.map((seller) => ({
    ...seller,
    products: products
      .filter((p) => p.seller_id === seller.seller_id)
      .map((product) => ({
        ...product,
        reviews: reviews.filter((r) => r.product_id === product.product_id),
      })),
  }));
}

export async function GET() {
  try {
    const sellersWithProductsAndReviews = await listSellersWithProductsAndReviews();
    return NextResponse.json({ sellers: sellersWithProductsAndReviews });
  } catch (error) {
    console.error("Error fetching sellers/products/reviews:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}