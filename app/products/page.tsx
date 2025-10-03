'use client'

import ProductGrid from '../components/ProductGrid'
import { products } from '../lib/placeholder-data'
import { useState } from 'react'

export default function ShopPage() {
    const [category, setCategory] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // Normalize products so price is a string
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
    const categories = Array.from(new Set(normalizedProducts.map((p) => p.category)))

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
