import { NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import { users, sellers, products, reviews } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  prepare: false, //disable prepared statements to prevent cached plan errors
})

export async function GET() {
  try {
    // Drop existing tables (reviews first since it depends on products/users)
    await sql`DROP TABLE IF EXISTS reviews CASCADE;`;
    await sql`DROP TABLE IF EXISTS products CASCADE;`;
    await sql`DROP TABLE IF EXISTS sellers CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;

    // Ensure uuid extension exists
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;

    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    // Sellers table
    await sql`
      CREATE TABLE IF NOT EXISTS sellers (
        seller_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name  VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        story TEXT NOT NULL
      );
    `;

    // Products table
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

    // Reviews table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        review_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Insert users (with hashed password)
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.user_id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

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

    // Insert reviews
    for (const review of reviews) {
      await sql`
        INSERT INTO reviews (review_id, product_id, user_id, rating, comment)
        VALUES (
          ${review.review_id},
          ${review.product_id},
          ${review.user_id},
          ${review.rating},
          ${review.comment}
        );
      `;
    }

    return NextResponse.json({ message: "Database dropped, recreated, and reseeded successfully with users, sellers, products, and reviews!" });
  } catch (error) {
    console.error("Error during seeding:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}