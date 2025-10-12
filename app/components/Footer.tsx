"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter 
    console.log("Subscribing with email:", email);
  };

  return (
    <footer>
      {/* Newsletter CTA */}
      <section className="bg-neutral-light">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="md:max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Join our community of craft lovers</h2>
            <p className="mt-2 text-neutral-dark/80">Get early access to new arrivals, artisan stories, and exclusive offers.</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex items-center gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-64 md:w-80 rounded-md border border-neutral-dark/10 bg-white px-4 py-3 text-neutral-dark shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button
              type="submit"
              className="bg-accent text-neutral-light px-5 py-3 rounded-md shadow-sm hover:brightness-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <section className="bg-primary text-neutral-light">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold">Handcrafts Cottage</h3>
              <p className="mt-2 text-neutral-light/80">Thoughtfully made goods for everyday living.</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="hover:text-white transition-colors">
                    Shop all
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-white transition-colors">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Follow us</h4>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05 0-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-neutral-light/80">
            © 2025, Handcrafts Cottage · All rights reserved
          </div>
        </div>
      </section>
    </footer>
  );
}

