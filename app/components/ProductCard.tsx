import Image from 'next/image'
import Link from 'next/link'

/**
 * TypeScript interface for Product
 */
interface ProductCardProps {
	product_id: string
	name: string
	description: string
	price: string
	stock: number
	category: string
	image_url: string
}

/**
 * ProductCard Component
 * - This component only handles displaying ONE product card
 * - It can be reused anywhere in the app (search results, featured products, etc.)
 * @param product - The product data to display
 * @param priority - Whether to load this image with priority (for LCP optimization)
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: ProductCardProps;
  priority?: boolean;
}) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.2)]">
      {/* Image */}
      <div className="relative w-full h-56 bg-neutral-light">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 314px"
          className="object-cover"
          priority={priority}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-neutral-dark mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-neutral-dark/70 mb-4">
          Starting at ${parseFloat(product.price).toFixed(0)}
        </p>

        <div className="flex items-center gap-3">
          <button className="bg-accent text-neutral-light px-4 py-2 rounded-md shadow-sm hover:brightness-95">
            Add to Cart
          </button>
          <Link
            href={`/product/${product.product_id}`}
            className="px-4 py-2 rounded-md border border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)] text-[var(--color-neutral-dark)] hover:brightness-95 transition-all"

          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
