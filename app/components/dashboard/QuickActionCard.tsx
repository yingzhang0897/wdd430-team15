import Link from 'next/link'

/**
 * QuickActionCard Component
 * Display one action card with icon, title, description
 */
interface QuickActionCardProps {
	href: string
	title: string
	description: string
	icon: React.ReactNode
	colorClass: string // e.g., 'blue', 'green', 'purple', 'orange'
}

export default function QuickActionCard({
	href,
	title,
	description,
	icon,
	colorClass
}: QuickActionCardProps) {
	return (
		<Link
			href={href}
			className={`action-card border-2 border-gray-200 hover:border-${colorClass}-500 rounded-lg p-6 transition-colors group`}>
			<div className='text-center'>
				{/* Icon Circle */}
				<div
					className={`w-12 h-12 bg-${colorClass}-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-${colorClass}-200 transition-colors`}>
					{icon}
				</div>

				{/* Title and Description */}
				<h3 className='font-semibold text-gray-900 mb-1'>{title}</h3>
				<p className='text-sm text-gray-600'>{description}</p>
			</div>
		</Link>
	)
}
