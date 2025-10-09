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
}


export type Users = User[];
export type Sellers = Seller[];
export type Products = Product[];
export type Reviews = Review[];
