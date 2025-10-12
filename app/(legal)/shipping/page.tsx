export const metadata = {
  title: 'Shipping Policy - Handcrafts Cottage',
}

export default function ShippingPolicy() {
  return (
    <main className="pt-32 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Shipping Methods</h2>
          <p className="text-gray-700">We offer standard and expedited shipping options. Shipping times and costs vary by destination.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Times</h2>
          <p className="text-gray-700">Orders are typically processed within 1-3 business days. Processing may take longer during peak seasons.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">International Shipping</h2>
          <p className="text-gray-700">International shipments may be subject to duties and taxes, which are the responsibility of the recipient.</p>
        </section>
      </div>
    </main>
  )
}
