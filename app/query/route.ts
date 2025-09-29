import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listSellersWithProducts() {
  // Fetch sellers
  const sellers = await sql`SELECT * FROM sellers ORDER BY name`;

  // Fetch products
  const products = await sql`SELECT * FROM products ORDER BY name`;

  // Group products under each seller
  return sellers.map((seller) => ({
    ...seller,
    products: products.filter((p) => p.seller_id === seller.seller_id),
  }));
}

export async function GET() {
  try {
    const sellersWithProducts = await listSellersWithProducts();
    return NextResponse.json({ sellers: sellersWithProducts });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
