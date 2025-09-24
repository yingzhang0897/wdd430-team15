'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('email@example.com');
  const [currency, setCurrency] = useState('United States (USD $)');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing with email:', email);
  };

  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links - Column 1 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Shop all</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Quick Links - Column 2 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Follow us</h3>
            <div className="flex space-x-4">
              
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Be the first to know about our biggest and best sales.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                placeholder="email@example.com"
              />
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Left side - Currency selector and copyright */}
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent border border-gray-300 text-gray-300 px-3 py-2 pr-8 appearance-none focus:outline-none focus:border-white"
                >
                  <option value="United States (USD $)">United States (USD $)</option>
                  <option value="Canada (CAD $)">Canada (CAD $)</option>
                  <option value="United Kingdom (GBP £)">United Kingdom (GBP £)</option>
                  <option value="Europe (EUR €)">Europe (EUR €)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-300 text-sm">© 2025, Cottage Shop | Powered by Team 15</p>
            </div>

            {/* Right side - Payment logos */}
            <div className="flex space-x-2">
              <div className="bg-white p-2 rounded">
                <svg className="w-8 h-5" viewBox="0 0 40 25">
                  <rect width="40" height="25" fill="#1A1F71"/>
                  <text x="20" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">VISA</text>
                </svg>
              </div>
              
              <div className="bg-white p-2 rounded">
                <svg className="w-8 h-5" viewBox="0 0 40 25">
                  <rect width="40" height="25" fill="#006FCF"/>
                  <text x="20" y="16" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">AMEX</text>
                </svg>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}