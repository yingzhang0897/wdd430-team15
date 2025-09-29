import { NextResponse } from "next/server";
import postgres from "postgres";
import { sellers, products } from "../lib/placeholder-data";
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    // Drop existing tables (products first because it depends on sellers)
    await sql`DROP TABLE IF EXISTS products CASCADE;`;
    await sql`DROP TABLE IF EXISTS sellers CASCADE;`;

    // Ensure uuid extension exists
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // Recreate sellers table
    await sql`
      CREATE TABLE IF NOT EXISTS sellers (
        seller_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name  VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        story TEXT NOT NULL
      );
    `;

    // Recreate products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        seller_id UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        stock INT NOT NULL,
        category VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    // Insert sellers
    for (const seller of sellers) {
      await sql`
        INSERT INTO sellers (seller_id, name, image_url, bio, story)
        VALUES (${seller.seller_id}, ${seller.name}, ${seller.image_url}, ${seller.bio}, ${seller.story});
      `;
    }

    // Insert products
    for (const product of products) {
      await sql`
        INSERT INTO products (product_id, seller_id, name, description, price, stock, category, image_url)
        VALUES (
          ${product.product_id},
          ${product.seller_id},
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.stock},
          ${product.category},
          ${product.image_url}
        );
      `;
    }

    return NextResponse.json({ message: "Database dropped, recreated, and reseeded successfully!" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
