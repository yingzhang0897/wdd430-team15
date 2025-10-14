import { NextRequest, NextResponse } from 'next/server'
import { getUserById, getUserStats, getUserRecentActivity } from '@/app/lib/data'
import { auth } from '@/auth'

/**
 * User Dashboard API Route
 * 
 * GET /api/user/dashboard
 * Returns user dashboard data including stats and recent activity
 */
export async function GET(request: NextRequest) {
	try {
		// Get user ID from authenticated session
		const session = await auth()
		console.log('Session in dashboard API:', session) // Debug log
		
		// Require authentication - no fallback to test user
		if (!session?.user) {
			console.log('No authenticated session found')
			return NextResponse.json({ error: 'Unauthorized - Please log in' }, { status: 401 })
		}
		
		// Use the logged-in user's ID
		const userId = session.user.id || session.user.user_id
		
		if (!userId) {
			console.log('No user ID found in session')
			return NextResponse.json({ error: 'Invalid session - No user ID' }, { status: 401 })
		}
		
		console.log('Using authenticated userId:', userId) // Debug log

		// Get user data from database
		const user = await getUserById(userId)
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		// Get user statistics
		const stats = await getUserStats(userId)
		
		// Get recent activities
		const activities = await getUserRecentActivity(userId)

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

		// Helper function to get activity color
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

		// Format activities for frontend
		const formattedActivities = activities.map((activity, index) => ({
			id: (index + 1).toString(),
			message: activity.message,
			highlight: activity.highlight,
			time: getTimeAgo(activity.created_at),
			color: getActivityColor(activity.activity_type)
		}))

		// Format member since date
		const memberSince = user.created_at 
			? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
			: 'Unknown'

		const dashboardData = {
			user: {
				user_id: user.user_id,
				name: user.name,
				email: user.email,
				image_url: null, // TODO: Add image_url field to users table
				member_since: memberSince,
				created_at: user.created_at,
				updated_at: user.updated_at
			},
			stats: {
				total_orders: stats.total_orders,
				favorite_items: stats.favorite_items,
				total_spent: stats.total_spent
			},
			recent_activities: formattedActivities
		}

		return NextResponse.json(dashboardData)

	} catch (error) {
		console.error('Dashboard API error:', error)
		return NextResponse.json(
			{ error: 'Failed to load dashboard data' },
			{ status: 500 }
		)
	}
}