import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    // Get all sellers
    const sellers = await sql`SELECT * FROM sellers ORDER BY name`;

    // Get all products
    const products = await sql`SELECT * FROM products ORDER BY name`;

    // Group products by seller_id
    const sellersWithProducts = sellers.map((seller) => ({
      ...seller,
      products: products.filter((p) => p.seller_id  === seller.seller_id ),
    }));

    return  Response.json({ sellers: sellersWithProducts }, {
      status: 200,
    });
  } catch (error) {
    console.error("Query failed:", error);
    return Response.json({ error }, { status: 500 });
  }
}
