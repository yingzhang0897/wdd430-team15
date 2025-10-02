import Image from 'next/image'
import Link from 'next/link'

/**
 * TypeScript interface for Product
 */
interface ProductCardProps {
	product_id: string
	name: string
	description: string
	price: string
	stock: number
	category: string
	image_url: string
}

/**
 * ProductCard Component
 * - This component only handles displaying ONE product card
 * - It can be reused anywhere in the app (search results, featured products, etc.)
 * @param product - The product data to display
 * @param priority - Whether to load this image with priority (for LCP optimization)
 */
export default function ProductCard({
	product,
	priority = false
}: {
	product: ProductCardProps
	priority?: boolean
}) {
	return (
		<article className='product-card bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'>
			{/* Product Image */}
			<div className='product-card__image-wrapper relative w-full h-64 bg-gray-100'>
				<Image
					src={product.image_url}
					alt={product.name}
					fill
					sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 270px'
					className='product-card__image object-cover'
					priority={priority}
				/>
				{/* Stock Badge - only shows if stock is low */}
				{/* Why < 5: Creates urgency for users to buy */}
				{product.stock < 5 && (
					<span className='product-card__badge absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded'>
						Only {product.stock} left!
					</span>
				)}
			</div>

			{/* Product Info */}
			<div className='product-card__info p-4'>
				{/* Category badge */}
				<span className='product-card__category text-xs text-green-600 font-semibold uppercase tracking-wide'>
					{product.category}
				</span>

				{/* Product name */}
				<h3 className='product-card__name text-lg font-semibold text-gray-900 mt-2 mb-2'>
					{product.name}
				</h3>

				{/* Description */}
				<p className='product-card__description text-sm text-gray-600 mb-4 line-clamp-2'>
					{product.description}
				</p>

				{/* Price and CTA button */}
				<div className='product-card__footer flex items-center justify-between'>
					<span className='product-card__price text-2xl font-bold text-gray-900'>
						${parseFloat(product.price).toFixed(2)}
					</span>
					<Link
						href={`/product/${product.product_id}`}
						className='product-card__link bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded transition-colors duration-200'>
						View Details
					</Link>
				</div>
			</div>
		</article>
	)
}
