import StatCard from '@/app/components/dashboard/StatCard'
import ProfilePreview from '@/app/components/dashboard/ProfilePreview'
import QuickActionCard from '@/app/components/dashboard/QuickActionCard'
import RecentActivity from '@/app/components/dashboard/RecentActivity'

/**
 * Seller Dashboard Page
 *
 * This is the private dashboard where sellers manage their profile and products.
 * For now, this is just the UI - authentication will be added later.
 */
export default function SellerDashboard() {
	// TODO: Later, get this from authenticated user session
	const mockSeller = {
		seller_id: '123',
		name: "Luna's Handcrafts",
		image_url: '/images/seller1.jpg',
		bio: 'Creating timeless handmade jewelry from natural gemstones.',
		story: "Luna started crafting at 16, inspired by her grandmother's designs. Every piece is unique and eco-friendly."
	}

	// Mock data for stats
	const stats = [
		{ title: 'Total Products', value: 12 },
		{ title: 'Profile Views', value: '1,234' },
		{ title: 'Total Sales', value: '$5,678' }
	]

	// Mock data for recent activity
	const activities = [
		{
			id: '1',
			message: 'New order received -',
			highlight: 'Elegant Athena Ring',
			time: '2h ago',
			color: 'green' as const
		},
		{
			id: '2',
			message: 'Product updated -',
			highlight: 'Heart Bezel Necklace',
			time: '5h ago',
			color: 'blue' as const
		},
		{
			id: '3',
			message: 'Profile viewed by 15 customers',
			time: '1d ago',
			color: 'purple' as const
		}
	]

	return (
		<main className='dashboard pt-32 min-h-screen bg-gray-50'>
			<div className='container mx-auto max-w-7xl px-6 py-8'>
				{/* Dashboard Header */}
				<div className='dashboard__header mb-8'>
					<h1 className='text-4xl font-bold text-gray-900 mb-2'>
						Seller Dashboard
					</h1>
					<p className='text-gray-600'>
						Manage your profile and products
					</p>
				</div>

				{/* Quick Stats Cards */}
				<div className='dashboard__stats grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
					{stats.map((stat, index) => (
						<StatCard
							key={index}
							title={stat.title}
							value={stat.value}
						/>
					))}
				</div>

				{/* Main Content Grid */}
				<div className='dashboard__content grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Left Column - Profile Preview */}
					<div className='lg:col-span-1'>
						<ProfilePreview
							sellerId={mockSeller.seller_id}
							name={mockSeller.name}
							imageUrl={mockSeller.image_url}
							bio={mockSeller.bio}
						/>
					</div>

					{/* Right Column - Quick Actions */}
					<div className='lg:col-span-2'>
						<div className='quick-actions bg-white rounded-lg shadow-md p-6'>
							<h2 className='text-xl font-bold text-gray-900 mb-4'>
								Quick Actions
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<QuickActionCard
									href='/dashboard/seller/products/new'
									title='Add Product'
									description='List a new item for sale'
									colorClass='blue'
									icon={
										<svg
											className='w-6 h-6 text-blue-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 4v16m8-8H4'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/seller/products'
									title='Manage Products'
									description='Edit or remove items'
									colorClass='green'
									icon={
										<svg
											className='w-6 h-6 text-green-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/seller/orders'
									title='View Orders'
									description='Check pending orders'
									colorClass='purple'
									icon={
										<svg
											className='w-6 h-6 text-purple-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/seller/analytics'
									title='Analytics'
									description='View your stats'
									colorClass='orange'
									icon={
										<svg
											className='w-6 h-6 text-orange-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
											/>
										</svg>
									}
								/>
							</div>
						</div>

						{/* Recent Activity */}
						<div className='mt-6'>
							<RecentActivity activities={activities} />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
