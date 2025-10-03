'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AddProductPage() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image_url: ''
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Product submitted:', formData)
        // TODO: Send to API to save product
    }

    return (
        <main className='pt-32 min-h-screen bg-gray-50'>
            <div className='container mx-auto max-w-2xl px-6 py-8'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>
                    Add New Product
                </h1>
                <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-8 space-y-6'>
                    {/* Product Image */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Product Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            
                        </label>
                        {formData.image_url && (
                            <div className='mb-4'>
                                <Image
                                    src={formData.image_url}
                                    alt='Product preview'
                                    width={128}
                                    height={128}
                                    className='object-cover rounded'
                                />
                            </div>
                        )}
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

                    {/* Other product fields */}
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Product Name'
                        className='w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-500'
                        required
                    />
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        placeholder='Product Description'
                        className='w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-500'
                        required
                    />
                    <input
                        type='number'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        placeholder='Price'
                        className='w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-500'
                        required
                    />
                    <input
                        type='text'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        placeholder='Category'
                        className='w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-500'
                        required
                    />
                    <input
                        type='number'
                        name='stock'
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder='Stock'
                        className='w-full px-4 py-2 border border-gray-300 rounded placeholder-gray-500'
                        required
                    />

                    <button
                        type='submit'
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors'>
                        Add Product
                    </button>
                </form>
                <Link href='/dashboard/seller/products' className='block mt-6 text-blue-600 hover:underline'>
                    ← Back to Products
                </Link>
            </div>
        </main>
    )
}
