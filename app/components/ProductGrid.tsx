import ProductCard from './ProductCard'

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
 * ProductGrid Component
 * @param products - Array of products to display
 * @param sellerName - Optional seller name for the title
 */
export default function ProductGrid({
	products,
	sellerName
}: {
	products: Product[]
	sellerName?: string
}) {
	// If no products, show a helpful message
	if (products.length === 0) {
		return (
			<p className='product-grid__no-products text-center text-gray-500 text-lg'>
				{sellerName
					? `${sellerName} doesn't have any products listed yet.`
					: 'No products available.'}
			</p>
		)
	}

	return (
		<>
			{/* Section Title - only shows if sellerName is provided */}
			{sellerName && (
				<h2 className='product-grid__title text-3xl font-bold text-gray-900 mb-8 text-center'>
					Products by {sellerName}
				</h2>
			)}

			{/* Responsive Grid */}
			<div className='product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{products.map((product, index) => (
					<ProductCard
						key={product.product_id}
						product={product}
						priority={index === 0}
					/>
				))}
			</div>
		</>
	)
}
