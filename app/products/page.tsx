'use client'

import ProductGrid from '../components/ProductGrid'
import { useState, useEffect } from 'react'
import type { Product } from '@/app/lib/definitions'

export default function ShopPage() {
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }
                const data = await response.json()
                setProducts(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    // Normalize products so price is a string for filtering
    const normalizedProducts = products.map((product) => ({
        ...product,
        price: product.price.toString()
    }))

    // Filter products by category and price
    const filteredProducts = normalizedProducts.filter((product) => {
        const matchesCategory = category ? product.category === category : true
        const matchesMinPrice = minPrice ? parseFloat(product.price) >= parseFloat(minPrice) : true
        const matchesMaxPrice = maxPrice ? parseFloat(product.price) <= parseFloat(maxPrice) : true
        return matchesCategory && matchesMinPrice && matchesMaxPrice
    })

    // Get unique categories for filter dropdown
    const categories = Array.from(new Set(products.map((p) => p.category)))

    // Show loading state
    if (loading) {
        return (
            <main className="pt-32 min-h-screen bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Products</h1>
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 text-lg">Loading products...</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    // Show error state
    if (error) {
        return (
            <main className="pt-32 min-h-screen bg-gray-50">
                <div className="container mx-auto max-w-7xl px-6 py-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Products</h1>
                    <div className="text-center py-12">
                        <p className="text-red-600 text-lg mb-4">Error loading products: {error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="pt-32 min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Products</h1>
                <div className="flex gap-4 mb-8">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border px-3 py-2 rounded w-32"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border px-3 py-2 rounded w-32"
                    />
                </div>
                <ProductGrid products={filteredProducts} />
            </div>
        </main>
    )
}
