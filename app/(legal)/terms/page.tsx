export const metadata = {
  title: 'Terms of Service - Handcrafts Cottage',
}

export default function TermsOfService() {
  return (
    <main className="pt-32 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceptance of Terms</h2>
          <p className="text-gray-700">By using Handcrafts Cottage, you agree to these Terms of Service. This is placeholder content and should be replaced with full terms.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Provide accurate information when creating an account.</li>
            <li>Comply with all applicable laws when using the service.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Limitation of Liability</h2>
          <p className="text-gray-700">Handcrafts Cottage is not liable for indirect or consequential damages to the fullest extent permitted by law.</p>
        </section>
      </div>
    </main>
  )
}
