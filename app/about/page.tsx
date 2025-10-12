export default function AboutPage() {
  return (
    <main className="pt-32 min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Welcome to Handcrafts Cottage, where authentic artistry meets modern convenience. We are a marketplace 
            dedicated to connecting skilled artisans with customers who appreciate the beauty and quality of handmade goods.
          </p>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Founded by a team of passionate developers and craft enthusiasts, our platform celebrates the timeless 
            tradition of handcrafted items while providing artisans with the tools they need to reach a global audience.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            To preserve and promote traditional craftsmanship by providing a platform where artisans can showcase 
            their unique creations and connect directly with customers who value authentic, handmade products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">For Artisans</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Showcase your unique handcrafted products</li>
              <li>• Connect directly with customers worldwide</li>
              <li>• Manage your inventory and orders easily</li>
              <li>• Build your brand and tell your story</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">For Customers</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Discover unique, handmade products</li>
              <li>• Support independent artisans</li>
              <li>• Find one-of-a-kind items</li>
              <li>• Experience authentic craftsmanship</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Handcrafts Cottage?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Quality Assured</h4>
              <p className="text-gray-600 text-sm">Every product is handcrafted with care and attention to detail</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Community Focused</h4>
              <p className="text-gray-600 text-sm">Supporting artisans and preserving traditional craftsmanship</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Unique Products</h4>
              <p className="text-gray-600 text-sm">Find one-of-a-kind items you won't see anywhere else</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}