import Image from 'next/image'
import Link from 'next/link'

/**
 * ProfilePreview Component
 * Show seller's profile preview with action buttons
 */
interface ProfilePreviewProps {
	sellerId: string
	name: string
	imageUrl: string
	bio: string
}

export default function ProfilePreview({
	sellerId,
	name,
	imageUrl,
	bio
}: ProfilePreviewProps) {
	return (
		<div className='profile-preview bg-white rounded-lg shadow-md p-6'>
			<h2 className='text-xl font-bold text-gray-900 mb-4'>
				Your Profile
			</h2>
			<div className='flex flex-col items-center text-center'>
				{/* Profile Image */}
				<div className='relative w-32 h-32 rounded-full overflow-hidden mb-4'>
					<Image
						src={imageUrl}
						alt={name}
						fill
						sizes='128px'
						className='object-cover'
					/>
				</div>

				{/* Name and Bio */}
				<h3 className='text-lg font-semibold text-gray-900 mb-2'>
					{name}
				</h3>
				<p className='text-sm text-gray-600 mb-4'>{bio}</p>

				{/* Action Buttons */}
				<Link
					href='/dashboard/seller/profile'
					className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors'>
					Edit Profile
				</Link>
				<Link
					href={`/seller/${sellerId}`}
					className='w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors'>
					View Public Profile
				</Link>
			</div>
		</div>
	)
}
