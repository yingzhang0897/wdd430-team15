export const metadata = {
  title: 'Refund Policy - Handcrafts Cottage',
}

export default function RefundPolicy() {
  return (
    <main className="pt-32 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Overview</h2>
          <p className="text-gray-700">This Refund Policy describes when customers may receive refunds for purchases made on Handcrafts Cottage. This is placeholder text.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Eligibility</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Items must be returned within 30 days of delivery.</li>
            <li>Items must be in original condition.</li>
            <li>Proof of purchase is required.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">How to Request a Refund</h2>
          <p className="text-gray-700">Contact our support team with your order number and reason for the refund. We'll review and respond within a reasonable time.</p>
        </section>
      </div>
    </main>
  )
}
