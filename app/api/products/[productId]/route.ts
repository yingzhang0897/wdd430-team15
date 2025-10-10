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
    const products =
      await sql`SELECT * FROM products WHERE product_id = ${productId}`;
    
    if (!products || products.length === 0) {
      return NextResponse.json({message: "Product not found"}, {status: 404});
    }

    const product = products[0];
    
    // Serialize the product data to handle PostgreSQL types
    const serializedProduct = {
      product_id: product.product_id,
      seller_id: product.seller_id,
      name: product.name,
      description: product.description,
      price: product.price ? parseFloat(product.price.toString()) : 0,
      stock: product.stock ? parseInt(product.stock.toString()) : 0,
      category: product.category,
      image_url: product.image_url,
      created_at: product.created_at,
      updated_at: product.updated_at
    };

    return NextResponse.json(serializedProduct);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {message: "Internal Server Error", error: error instanceof Error ? error.message : 'Unknown error'},
      {status: 500}
    );
  }
}
