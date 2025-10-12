/**
 * RecentActivity Component
 * Display recent activity feed
 */
interface ActivityItem {
	id: string
	message: string
	highlight?: string
	time: string
	color: 'green' | 'blue' | 'purple' | 'orange'
}

interface RecentActivityProps {
	activities: ActivityItem[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
	return (
		<div className='recent-activity bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-xl font-bold text-gray-900 mb-4'>
				Recent Activity
			</h2>
			<div className='space-y-4'>
				{activities.map((activity) => (
					<div
						key={activity.id}
						className='activity-item flex items-center gap-3 p-3 bg-gray-50 rounded'>
						{/* Status Dot */}
						<div
							className={`w-2 h-2 bg-${activity.color}-500 rounded-full`}></div>

						{/* Message */}
						<p className='text-sm text-gray-700'>
							{activity.message}{' '}
							{activity.highlight && (
								<span className='font-semibold'>
									{activity.highlight}
								</span>
							)}
						</p>

						{/* Time */}
						<span className='text-xs text-gray-500 ml-auto'>
							{activity.time}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
