/**
 * ProductGridSkeleton Component
 */
export default function ProductGridSkeleton() {
	return (
		<div className='product-grid-skeleton'>
			<h2 className='text-3xl font-bold text-gray-900 mb-8 text-center animate-pulse'>
				<div className='h-8 bg-gray-200 rounded w-64 mx-auto'></div>
			</h2>

			{/* Skeleton grid - matches the real product grid layout */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{/* Show 4 skeleton cards */}
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='product-card-skeleton bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse'>
						{/* Image skeleton */}
						<div className='w-full h-64 bg-gray-200'></div>

						{/* Content skeleton */}
						<div className='p-4 space-y-3'>
							{/* Category badge skeleton */}
							<div className='h-4 bg-gray-200 rounded w-20'></div>

							{/* Title skeleton */}
							<div className='h-6 bg-gray-200 rounded w-3/4'></div>

							{/* Description skeleton - 2 lines */}
							<div className='space-y-2'>
								<div className='h-4 bg-gray-200 rounded w-full'></div>
								<div className='h-4 bg-gray-200 rounded w-2/3'></div>
							</div>

							{/* Price and button skeleton */}
							<div className='flex items-center justify-between pt-2'>
								<div className='h-8 bg-gray-200 rounded w-20'></div>
								<div className='h-10 bg-gray-200 rounded w-28'></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
