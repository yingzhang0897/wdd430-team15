import postgres from 'postgres'
import ProductGrid from './ProductGrid'

/**
 * TypeScript interface for Product
 */
interface Product {
	product_id: string
	seller_id: string
	name: string
	description: string
	price: string
	stock: number
	category: string
	image_url: string
}

/**
 * SellerProducts Component
 * @param sellerId - The seller's ID to fetch products for
 * @param sellerName - The seller's name for display
 */
export default async function SellerProducts({
	sellerId,
	sellerName
}: {
	sellerId: string
	sellerName: string
}) {
	// Initialize database connection
	const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

	try {
		// Fetch products for this seller
		const products = await sql`
      SELECT * FROM products
      WHERE seller_id = ${sellerId}
      ORDER BY name
    `

		await sql.end()

		// Map database results to our Product interface
		const mappedProducts: Product[] = products.map((p) => ({
			product_id: p.product_id,
			seller_id: p.seller_id,
			name: p.name,
			description: p.description,
			price: p.price,
			stock: p.stock,
			category: p.category,
			image_url: p.image_url
		}))

		return <ProductGrid products={mappedProducts} sellerName={sellerName} />
	} catch (error) {
		console.error('Error fetching products:', error)
		await sql.end()

		// Error state
		return (
			<p className='text-center text-red-500 text-lg'>
				Failed to load products. Please try again later.
			</p>
		)
	}
}
