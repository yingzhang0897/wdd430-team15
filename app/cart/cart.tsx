import Link from 'next/link';

export default function Cart() {
  return (
    <main className="min-h-screen bg-neutral-light pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-6">
            You haven&apos;t added anything to your cart yet. Browse our handcrafted goods and
            discover something you love.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-semibold shadow transition hover:opacity-90"
            >
              Explore Products
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-primary font-semibold transition hover:bg-secondary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}