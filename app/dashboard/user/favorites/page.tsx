'use client';

/**
 * User Favorites Page
 * 
 * Shows the user's favorite/saved products
 */
export default function UserFavorites() {
	// Mock favorite products data
	const favorites = [
		{
			id: '1',
			name: 'Elegant Athena Ring',
			price: 89.99,
			image_url: '/images/product1.jpg',
			seller: "Luna's Handcrafts",
			in_stock: true,
			added_date: '2024-10-01'
		},
		{
			id: '2',
			name: 'Heart Bezel Necklace',
			price: 75.00,
			image_url: '/images/product2.jpg',
			seller: "Crystal Dreams",
			in_stock: true,
			added_date: '2024-09-28'
		},
		{
			id: '3',
			name: 'Silver Moon Earrings',
			price: 45.50,
			image_url: '/images/product3.jpg',
			seller: "Moonlight Jewelry",
			in_stock: false,
			added_date: '2024-09-25'
		}
	]

	const removeFavorite = (productId: string) => {
		// TODO: Implement remove from favorites functionality
		console.log('Remove favorite:', productId)
	}

	return (
		<main className='pt-32 min-h-screen bg-gray-50'>
			<div className='container mx-auto max-w-6xl px-6 py-8'>
				{/* Page Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						My Favorites
					</h1>
					<p className='text-gray-600'>
						Products you've saved for later
					</p>
				</div>

				{/* Favorites Grid */}
				{favorites.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{favorites.map((product) => (
							<div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
								{/* Product Image */}
								<div className='relative h-48 bg-gray-200'>
									<div className='absolute inset-0 flex items-center justify-center'>
										<svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
										</svg>
									</div>
									{/* Remove from favorites button */}
									<button
										onClick={() => removeFavorite(product.id)}
										className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors'
									>
										<svg className='w-5 h-5 text-red-500' fill='currentColor' viewBox='0 0 24 24'>
											<path d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
										</svg>
									</button>
								</div>

								{/* Product Info */}
								<div className='p-4'>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{product.name}
									</h3>
									<p className='text-sm text-gray-600 mb-2'>
										by {product.seller}
									</p>
									<div className='flex items-center justify-between mb-3'>
										<span className='text-xl font-bold text-gray-900'>
											${product.price}
										</span>
										<span className={`px-2 py-1 rounded-full text-xs font-medium ${
											product.in_stock 
												? 'bg-green-100 text-green-800' 
												: 'bg-red-100 text-red-800'
										}`}>
											{product.in_stock ? 'In Stock' : 'Out of Stock'}
										</span>
									</div>
									<p className='text-xs text-gray-500 mb-4'>
										Added on {product.added_date}
									</p>

									{/* Action Buttons */}
									<div className='flex gap-2'>
										<button
											className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
												product.in_stock
													? 'bg-blue-600 text-white hover:bg-blue-700'
													: 'bg-gray-300 text-gray-500 cursor-not-allowed'
											}`}
											disabled={!product.in_stock}
										>
											Add to Cart
										</button>
										<button className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'>
											View
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					/* Empty State */
					<div className='text-center py-12'>
						<svg className='mx-auto h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
						</svg>
						<h3 className='mt-2 text-sm font-medium text-gray-900'>No favorites yet</h3>
						<p className='mt-1 text-sm text-gray-500'>Start browsing and save products you like!</p>
						<div className='mt-6'>
							<a href='/products' className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'>
								Browse Products
							</a>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}