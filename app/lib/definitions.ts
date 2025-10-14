export type UUID = string;

// ────────────────────────────────
// User
// ────────────────────────────────
export interface User {
  user_id: UUID;
  name: string;
  email: string;
  password: string; // plain here, will be hashed later
}

// ────────────────────────────────
// Seller
// ────────────────────────────────
export interface Seller {
  seller_id: UUID;
  name: string;
  image_url: string;
  bio: string;
  story: string;
}

// ────────────────────────────────
// Product
// ────────────────────────────────
export interface Product {
  product_id: UUID;
  seller_id: UUID;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
}

// ────────────────────────────────
// Review
// ────────────────────────────────
export interface Review {
  review_id: UUID;
  product_id: UUID;
  user_id: UUID;
  rating: number;
  comment: string;
  created_at?: Date;
}

// ────────────────────────────────
// Order
// ────────────────────────────────
export interface Order {
  order_id: UUID;
  user_id: UUID;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: Date;
  updated_at: Date;
}

// ────────────────────────────────
// Order Item
// ────────────────────────────────
export interface OrderItem {
  order_item_id: UUID;
  order_id: UUID;
  product_id: UUID;
  quantity: number;
  price: number;
}

// ────────────────────────────────
// Favorite
// ────────────────────────────────
export interface Favorite {
  favorite_id: UUID;
  user_id: UUID;
  product_id: UUID;
  created_at: Date;
}

// ────────────────────────────────
// User Activity
// ────────────────────────────────
export interface UserActivity {
  activity_type: 'order_placed' | 'order_delivered' | 'favorite_added' | 'review_posted';
  message: string;
  highlight?: string;
  created_at: Date;
}

export type Users = User[];
export type Sellers = Seller[];
export type Products = Product[];
export type Reviews = Review[];
export type Orders = Order[];
export type OrderItems = OrderItem[];
export type Favorites = Favorite[];
export type UserActivities = UserActivity[];
