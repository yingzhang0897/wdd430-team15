"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getCategories() {
  try {
    // Fetch distinct category names from the products table
    const result = await sql`SELECT DISTINCT category FROM products ORDER BY category ASC`;
    return result.map((row) => row.category);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
