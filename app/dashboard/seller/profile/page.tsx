'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/**
 * Seller Profile Edit Page
 *
 * This page allows sellers to edit their profile information.
 * For now, this is just the UI - form submission/saving will be added later.
 */
export default function EditSellerProfile() {
	// TODO: Later, get this from authenticated user session
	const [formData, setFormData] = useState({
		name: `Luna's Handcrafts`,
		bio: `Creating timeless handmade jewelry from natural gemstones.`,
		story: `Luna started crafting at 16, inspired by her grandmother's designs. Every piece is unique and eco-friendly.`,
		image_url: `/images/seller1.jpg`
	})

	// Handle input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		})
	}

	// Handle form submission (just console log for now)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('Form submitted:', formData)
		// TODO: Later, send to API to save to database
		alert('Changes saved! (This is just a demo - not actually saved yet)')
	}

	// Handle image upload (mock for now)
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			// TODO: Later, upload to server and get URL back
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData({
					...formData,
					image_url: reader.result as string
				})
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<main className='edit-profile pt-32 min-h-screen bg-gray-50'>
			<div className='container mx-auto max-w-4xl px-6 py-8'>
				{/* Page Header */}
				<div className='page-header mb-8 flex items-center justify-between'>
					<div>
						<h1 className='text-4xl font-bold text-gray-900 mb-2'>
							Edit Profile
						</h1>
						<p className='text-gray-600'>
							Update your seller information and branding
						</p>
					</div>
					<Link
						href='/dashboard/seller'
						className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors'>
						← Back to Dashboard
					</Link>
				</div>

				{/* Edit Form */}
				<form
					onSubmit={handleSubmit}
					className='edit-form bg-white rounded-lg shadow-md p-8'>
					{/* Profile Image Section */}
					<div className='form-section mb-8'>
						<label className='block text-sm font-semibold text-gray-700 mb-4'>
							Profile Picture
						</label>
						<div className='flex items-center gap-6'>
							<div className='relative w-32 h-32 rounded-full overflow-hidden bg-gray-100'>
								<Image
									src={formData.image_url}
									alt='Profile preview'
									fill
									sizes='128px'
									className='object-cover'
								/>
							</div>
							<div className='flex-1'>
								<p className='text-sm text-gray-600 mb-3'>
									Upload a profile picture that represents
									your brand. Square images work best.
								</p>
								<label className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block transition-colors'>
									Choose Image
									<input
										type='file'
										accept='image/*'
										onChange={handleImageUpload}
										className='hidden'
									/>
								</label>
								<p className='text-xs text-gray-500 mt-2'>
									JPG, PNG or GIF. Max 5MB.
								</p>
							</div>
						</div>
					</div>

					{/* Shop Name */}
					<div className='form-group mb-6'>
						<label
							htmlFor='name'
							className='block text-sm font-semibold text-gray-700 mb-2'>
							Shop Name *
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
							placeholder='Enter your shop name'
						/>
						<p className='text-xs text-gray-500 mt-1'>
							This is how customers will identify your shop
						</p>
					</div>

					{/* Bio */}
					<div className='form-group mb-6'>
						<label
							htmlFor='bio'
							className='block text-sm font-semibold text-gray-700 mb-2'>
							Bio *
						</label>
						<textarea
							id='bio'
							name='bio'
							value={formData.bio}
							onChange={handleChange}
							required
							rows={3}
							maxLength={150}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
							placeholder='Write a short bio about your craft'
						/>
						<div className='flex justify-between items-center mt-1'>
							<p className='text-xs text-gray-500'>
								A short tagline that appears under your name
							</p>
							<span className='text-xs text-gray-500'>
								{formData.bio.length}/150
							</span>
						</div>
					</div>

					{/* Story */}
					<div className='form-group mb-8'>
						<label
							htmlFor='story'
							className='block text-sm font-semibold text-gray-700 mb-2'>
							Your Story *
						</label>
						<textarea
							id='story'
							name='story'
							value={formData.story}
							onChange={handleChange}
							required
							rows={6}
							maxLength={500}
							className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
							placeholder='Tell customers about your journey, inspiration, and what makes your products special'
						/>
						<div className='flex justify-between items-center mt-1'>
							<p className='text-xs text-gray-500'>
								Share what makes your craft unique
							</p>
							<span className='text-xs text-gray-500'>
								{formData.story.length}/500
							</span>
						</div>
					</div>

					{/* Form Actions */}
					<div className='form-actions flex gap-4 pt-6 border-t border-gray-200'>
						<button
							type='submit'
							className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors'>
							Save Changes
						</button>
						<Link
							href='/dashboard/seller'
							className='flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors'>
							Cancel
						</Link>
					</div>
				</form>

				{/* Preview Section */}
				<div className='preview-section bg-white rounded-lg shadow-md p-8 mt-8'>
					<h2 className='text-xl font-bold text-gray-900 mb-4'>
						Preview
					</h2>
					<p className='text-sm text-gray-600 mb-6'>
						This is how your profile will appear to customers
					</p>

					<div className='preview-card bg-gradient-to-b from-green-50 to-white p-8 rounded-lg border border-gray-200'>
						<div className='flex flex-col md:flex-row gap-6 items-center md:items-start'>
							<div className='relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0'>
								<Image
									src={formData.image_url}
									alt={formData.name}
									fill
									sizes='128px'
									className='object-cover'
								/>
							</div>
							<div className='flex-1 text-center md:text-left'>
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>
									{formData.name}
								</h3>
								<p className='text-lg text-gray-700 mb-4 italic'>
									{formData.bio}
								</p>
								<div className='bg-white p-4 rounded-lg'>
									<h4 className='text-lg font-semibold text-gray-800 mb-2'>
										Our Story
									</h4>
									<p className='text-gray-600'>
										{formData.story}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
