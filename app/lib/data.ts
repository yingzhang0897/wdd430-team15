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

// ────────────────────────────────
// User Dashboard Functions
// ────────────────────────────────

export async function getUserById(userId: string) {
  try {
    const result = await sql`
      SELECT 
        id as user_id,
        name,
        email,
        created_at,
        updated_at
      FROM users 
      WHERE id = ${userId}
    `;
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserStats(userId: string) {
  try {
    // Get user statistics
    const stats = await sql`
      SELECT 
        COUNT(DISTINCT o.order_id)::int as total_orders,
        COUNT(DISTINCT f.favorite_id)::int as favorite_items,
        COALESCE(SUM(o.total_amount), 0)::numeric as total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      LEFT JOIN favorites f ON u.id = f.user_id
      WHERE u.id = ${userId}
      GROUP BY u.id
    `;

    if (stats.length === 0) {
      return {
        total_orders: 0,
        favorite_items: 0,
        total_spent: 0
      };
    }

    return {
      total_orders: stats[0].total_orders,
      favorite_items: stats[0].favorite_items,
      total_spent: parseFloat(stats[0].total_spent.toString())
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    // Return default stats if tables don't exist yet
    return {
      total_orders: 0,
      favorite_items: 0,
      total_spent: 0
    };
  }
}

export async function getUserOrders(userId: string) {
  try {
    const orders = await sql`
      SELECT 
        o.order_id,
        o.status,
        o.total_amount,
        o.created_at,
        json_agg(
          json_build_object(
            'product_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.product_id
      WHERE o.user_id = ${userId}
      GROUP BY o.order_id, o.status, o.total_amount, o.created_at
      ORDER BY o.created_at DESC
      LIMIT 10
    `;

    return orders.map(order => ({
      ...order,
      total_amount: parseFloat(order.total_amount.toString())
    }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const favorites = await sql`
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.image_url,
        p.stock,
        s.name as seller_name,
        f.created_at as added_date
      FROM favorites f
      JOIN products p ON f.product_id = p.product_id
      JOIN sellers s ON p.seller_id = s.seller_id
      WHERE f.user_id = ${userId}
      ORDER BY f.created_at DESC
    `;

    return favorites.map(favorite => ({
      ...favorite,
      price: parseFloat(favorite.price.toString()),
      in_stock: favorite.stock > 0
    }));
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
}

export async function getUserRecentActivity(userId: string) {
  try {
    // Get recent activities (orders, favorites, reviews)
    const activities = await sql`
      (
        SELECT 
          'order_placed'::text as activity_type,
          'Order placed -'::text as message,
          p.name as highlight,
          o.created_at
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.product_id
        WHERE o.user_id = ${userId}
      )
      UNION ALL
      (
        SELECT 
          'favorite_added'::text as activity_type,
          'Added to favorites -'::text as message,
          p.name as highlight,
          f.created_at
        FROM favorites f
        JOIN products p ON f.product_id = p.product_id
        WHERE f.user_id = ${userId}
      )
      UNION ALL
      (
        SELECT 
          'review_posted'::text as activity_type,
          'Posted review for -'::text as message,
          p.name as highlight,
          r.created_at
        FROM reviews r
        JOIN products p ON r.product_id = p.product_id
        WHERE r.user_id = ${userId}
      )
      ORDER BY created_at DESC
      LIMIT 10
    `;

    return activities;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return [];
  }
}
