import StatCard from '@/app/components/dashboard/StatCard'
import ProfilePreview from '@/app/components/dashboard/ProfilePreview'
import QuickActionCard from '@/app/components/dashboard/QuickActionCard'
import RecentActivity from '@/app/components/dashboard/RecentActivity'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUserById, getUserStats, getUserRecentActivity } from '@/app/lib/data'

// Database interfaces for real data
interface User {
	user_id: string
	name: string
	email: string
	image_url: string | null
	member_since: string
	created_at: Date
	updated_at: Date
}

interface UserStats {
	total_orders: number
	favorite_items: number
	total_spent: number
}

interface UserActivity {
	id: string
	user_id: string
	activity_type: 'order_placed' | 'order_delivered' | 'favorite_added' | 'review_posted'
	message: string
	highlight?: string
	created_at: Date
}

/**
 * User Dashboard Page
 *
 * This is the private dashboard where users manage their orders and account.
 * Now connected to real database!
 */
export default async function UserDashboard() {
	// Check authentication server-side
	const session = await auth()
	
	// If not authenticated, redirect to login
	if (!session?.user) {
		redirect('/account/login/user')
	}
	
	// Get the logged-in user's ID
	const userId = session.user.id || session.user.user_id
	
	if (!userId) {
		redirect('/account/login/user')
	}
	
	console.log('Dashboard for user:', userId, session.user.name) // Debug log
	
	// Get real data from database using the authenticated user's ID
	let userData, userStats, activities;
	
	try {
		// Get user data directly from database functions
		userData = await getUserById(userId)
		if (!userData) {
			redirect('/account/login/user')
		}
		
		userStats = await getUserStats(userId)
		activities = await getUserRecentActivity(userId)
	} catch (error) {
		console.error('Error loading user data:', error);
		// Redirect to login if there's an error
		redirect('/account/login/user')
	}

	// Format stats for display
	const stats = [
		{ title: 'Total Orders', value: userStats.total_orders },
		{ title: 'Favorite Items', value: userStats.favorite_items },
		{ title: 'Money Spent', value: `$${userStats.total_spent.toFixed(2)}` }
	]
	
	// Format member since date
	const memberSince = userData.created_at 
		? new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
		: 'Unknown'



	// Helper function to get activity color based on type
	const getActivityColor = (activityType: string): 'green' | 'blue' | 'purple' | 'orange' => {
		switch (activityType) {
			case 'order_delivered':
				return 'green'
			case 'order_placed':
				return 'blue'
			case 'favorite_added':
				return 'purple'
			case 'review_posted':
				return 'orange'
			default:
				return 'blue'
		}
	}

	// Helper function to format time ago
	const getTimeAgo = (date: Date): string => {
		const now = new Date()
		const diffMs = now.getTime() - new Date(date).getTime()
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
		
		if (diffDays === 0) return 'Today'
		if (diffDays === 1) return '1 day ago'
		if (diffDays < 7) return `${diffDays} days ago`
		if (diffDays < 14) return '1 week ago'
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
		return `${Math.floor(diffDays / 30)} months ago`
	}

	// Format activities for frontend
	const formattedActivities = activities.map((activity, index) => ({
		id: (index + 1).toString(),
		message: activity.message,
		highlight: activity.highlight,
		time: getTimeAgo(activity.created_at),
		color: getActivityColor(activity.activity_type)
	}))

	return (
		<main className='dashboard pt-32 min-h-screen bg-gray-50'>
			<div className='container mx-auto max-w-7xl px-6 py-8'>
				{/* Dashboard Header */}
				<div className='dashboard__header mb-8'>
					<h1 className='text-4xl font-bold text-gray-900 mb-2'>
						My Dashboard
					</h1>
					<p className='text-gray-600'>
						Welcome back, {userData.name}! Manage your orders and account.
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
					{/* Left Column - User Profile */}
					<div className='lg:col-span-1'>
						<div className='user-profile bg-white rounded-lg shadow-md p-6'>
							<div className='flex items-center mb-4'>
								<div className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center'>
									<svg className='w-8 h-8 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
									</svg>
								</div>
								<div className='ml-4'>
									<h3 className='text-lg font-semibold text-gray-900'>
										{userData.name}
									</h3>
									<p className='text-sm text-gray-600'>
										{userData.email}
									</p>
									<p className='text-xs text-gray-500'>
										Member since {memberSince}
									</p>
								</div>
							</div>
							<button className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'>
								Edit Profile
							</button>
						</div>
					</div>

					{/* Right Column - Quick Actions */}
					<div className='lg:col-span-2'>
						<div className='quick-actions bg-white rounded-lg shadow-md p-6'>
							<h2 className='text-xl font-bold text-gray-900 mb-4'>
								Quick Actions
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<QuickActionCard
									href='/dashboard/user/orders'
									title='My Orders'
									description='View your order history'
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
												d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/user/favorites'
									title='Favorites'
									description='Your saved products'
									colorClass='red'
									icon={
										<svg
											className='w-6 h-6 text-red-600'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/user/addresses'
									title='Addresses'
									description='Manage shipping addresses'
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
												d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									}
								/>
								<QuickActionCard
									href='/dashboard/user/settings'
									title='Account Settings'
									description='Update your preferences'
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
												d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									}
								/>
							</div>
						</div>

						{/* Recent Activity */}
						<div className='mt-6'>
							<RecentActivity activities={formattedActivities} />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}