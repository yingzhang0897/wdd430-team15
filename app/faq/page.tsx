'use client'

import { useState } from 'react'

const faqData = [
  {
    id: 1,
    question: "How do I create an account?",
    answer: "You can create an account by clicking the 'Register' button in the top navigation. Fill out the required information including your name, email, and password. Once registered, you can start browsing and purchasing products immediately."
  },
  {
    id: 2,
    question: "How do I become a seller on your platform?",
    answer: "To become a seller, first create a regular account, then navigate to the seller dashboard. You'll need to provide additional information about your business, upload product photos, and set up your seller profile. Once approved, you can start listing your handcrafted items."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallet payments. All transactions are processed securely through our encrypted payment system."
  },
  {
    id: 4,
    question: "How long does shipping take?",
    answer: "Shipping times vary depending on the seller's location and your delivery address. Most domestic orders arrive within 3-7 business days, while international orders can take 7-21 business days. You'll receive tracking information once your order ships."
  },
  {
    id: 5,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be in original condition and packaging. Since many items are handmade and unique, please contact the seller directly first to resolve any issues. Custom or personalized items may not be eligible for returns."
  },
  {
    id: 6,
    question: "Are the products really handmade?",
    answer: "Yes! All sellers on our platform are verified artisans who create their products by hand. We have a strict vetting process to ensure authenticity. Each product listing includes information about the artisan and their crafting process."
  },
  {
    id: 7,
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive an email with tracking information. You can also log into your account and view order status in the 'My Orders' section of your dashboard."
  },
  {
    id: 8,
    question: "Can I request custom orders?",
    answer: "Many of our artisans accept custom orders! Look for the 'Custom Orders' option on their product pages or contact them directly through their seller profile. Custom orders may require additional time and have different pricing."
  },
  {
    id: 9,
    question: "How do I contact a seller?",
    answer: "You can contact sellers through their profile pages or product listings. Click on the 'Contact Seller' button to send them a message. They typically respond within 24-48 hours."
  },
  {
    id: 10,
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged item, please contact us within 48 hours of delivery with photos of the damage. We'll work with the seller to provide a replacement or full refund. Your satisfaction is our priority."
  },
  {
    id: 11,
    question: "Are there any fees for buyers?",
    answer: "No, there are no additional fees for buyers beyond the product price and shipping costs. The prices you see include all applicable taxes and fees."
  },
  {
    id: 12,
    question: "How do I leave a review?",
    answer: "After receiving your order, you can leave a review by going to your order history and clicking 'Leave Review' next to the purchased item. Reviews help other customers and support our artisans."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const isOpen = (id: number) => openItems.includes(id)

  return (
    <main className="pt-32 min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our platform, orders, and policies
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          {faqData.map((faq, index) => (
            <div key={faq.id} className={`border-b border-gray-200 ${index === faqData.length - 1 ? 'border-b-0' : ''}`}>
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                      isOpen(faq.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen(faq.id) ? 'max-h-96 pb-5' : 'max-h-0'
                }`}
              >
                <div className="px-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
            <a
              href="mailto:support@handcraftscottage.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-blue-600 font-semibold rounded-lg border-2 border-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}