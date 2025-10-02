import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import postgres from 'postgres'
import SellerProducts from '@/app/components/SellerProducts'
import ProductGridSkeleton from '@/app/components/ProductGridSkeleton'

/**
 * TypeScript interface for Seller (without products)
 */
interface Seller {
	seller_id: string
	name: string
	image_url: string
	bio: string
	story: string
}

/**
 * Fetch seller data directly from the database
 * @param id - The seller's unique identifier
 * @returns Seller object with products, or null if not found
 */
async function getSellerData(id: string): Promise<Seller | null> {
	// Initialize database connection
	const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

	try {
		// Fetch ONLY the seller info (not products)
		const sellers = await sql`
      SELECT * FROM sellers
      WHERE seller_id = ${id}
    `

		// Close the database connection
		await sql.end()

		// If no seller found, return null
		if (sellers.length === 0) {
			return null
		}

		const seller = sellers[0]

		// Return seller info only
		return {
			seller_id: seller.seller_id,
			name: seller.name,
			image_url: seller.image_url,
			bio: seller.bio,
			story: seller.story
		}
	} catch (error) {
		console.error('Error fetching seller:', error)
		await sql.end()
		return null
	}
}

/**
 * Seller Profile Page Component
 * @param params - Route parameters containing the seller ID
 */
export default async function SellerProfilePage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	// Wait for the params to be resolved
	const { id } = await params

	// Fetch the seller data
	const seller = await getSellerData(id)

	// If seller not found, show Next.js 404 page
	if (!seller) {
		notFound()
	}

	return (
		<main className='seller-profile pt-32'>
			{/* Hero Section with Seller Info */}
			<section className='seller-profile__hero bg-gradient-to-b from-green-50 to-white py-16 px-6'>
				<div className='seller-profile__container container mx-auto max-w-6xl'>
					<div className='seller-profile__hero-content flex flex-col md:flex-row gap-8 items-center md:items-start'>
						{/* Seller Profile Image */}
						<div className='seller-profile__image-wrapper relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg flex-shrink-0'>
							<Image
								src={seller.image_url}
								alt={`${seller.name} profile picture`}
								fill
								sizes='(max-width: 768px) 192px, 256px'
								className='seller-profile__image object-cover'
								priority
							/>
						</div>

						{/* Seller Info */}
						<div className='seller-profile__info flex-1 text-center md:text-left'>
							<h1 className='seller-profile__name text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
								{seller.name}
							</h1>
							<p className='seller-profile__bio text-xl text-gray-700 mb-6 italic'>
								{seller.bio}
							</p>
							<div className='seller-profile__story-wrapper bg-white p-6 rounded-lg shadow-md'>
								<h2 className='seller-profile__story-title text-2xl font-semibold text-gray-800 mb-3'>
									Our Story
								</h2>
								<p className='seller-profile__story-text text-gray-600 leading-relaxed'>
									{seller.story}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Products Section with Suspense */}
			<section className='seller-profile__products py-16 px-6 bg-white'>
				<div className='seller-profile__container container mx-auto max-w-6xl'>
					<Suspense fallback={<ProductGridSkeleton />}>
						<SellerProducts
							sellerId={seller.seller_id}
							sellerName={seller.name}
						/>
					</Suspense>
				</div>
			</section>
		</main>
	)
}
