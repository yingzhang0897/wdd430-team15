import { NextResponse } from 'next/server'
import { products } from '../../lib/placeholder-data'
import postgres from 'postgres';

const sql = process.env.POSTGRES_URL
  ? postgres(process.env.POSTGRES_URL, { ssl: 'require' })
  : null;

// TODO: Replace with Prisma when team decides
// import { prisma } from '../../../lib/prisma'

let productList = [...products]

export async function GET() {
  try {
    if (!sql) throw new Error("Database not connected");

    const products = await sql`SELECT * FROM products`;
    
    // Serialize the products data to handle PostgreSQL types
    const serializedProducts = products.map(product => ({
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
    }));

    return NextResponse.json(serializedProducts);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}


export async function POST(request: Request) {
  const data = await request.json()
  const product_id = Math.random().toString(36).substr(2, 9)
  const newProduct = { ...data, product_id }
  productList.push(newProduct)
  return NextResponse.json(newProduct, { status: 201 })
}

// Prisma version (commented out for now):
// export async function GET() {
//   const products = await prisma.product.findMany()
//   return NextResponse.json(products)
// }

// export async function POST(request: Request) {
//   const data = await request.json()
//   const newProduct = await prisma.product.create({ data })
//   return NextResponse.json(newProduct, { status: 201 })
// }
