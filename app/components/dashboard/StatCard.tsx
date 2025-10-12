/**
 * StatCard Component
 * Reusable for any dashboard stat (products, views, sales, etc.)
 */
interface StatCardProps {
	title: string
	value: string | number
	color?: string
}

export default function StatCard({
	title,
	value,
	color = 'gray'
}: StatCardProps) {
	return (
		<div className='stat-card bg-white rounded-lg shadow-md p-6'>
			<h3 className='text-sm font-medium text-gray-500 uppercase tracking-wide mb-2'>
				{title}
			</h3>
			<p className={`text-3xl font-bold text-${color}-900`}>{value}</p>
		</div>
	)
}
