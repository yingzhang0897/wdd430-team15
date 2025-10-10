'use client';

import { signOutAction } from '@/app/lib/actions';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Facebook,
  Instagram,
  Music2,
  ChevronDown,
  User,
  ShoppingBag,
  Menu,
  X,
  Power,
} from 'lucide-react';
import { signOut } from '@/auth';

export default function HeaderClient({
  session,
  categories = [],
}: {
  session: any;
  categories: string[];
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '';
  const useDarkMode = !isHome || scrolled;
  const linkBase = useDarkMode ? 'text-gray-800' : 'text-white';
  const linkHover = 'hover:text-green-600';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
        <p className="absolute left-1/2 transform -translate-x-1/2 text-center hidden md:block">
          Free shipping when you spend over $50 · Save up to 50% off with code: ADORE
        </p>
        <div className="flex space-x-3">
          <Link href="https://facebook.com"><Facebook className="h-4 w-4" /></Link>
          <Link href="https://instagram.com"><Instagram className="h-4 w-4" /></Link>
          <Link href="https://tiktok.com"><Music2 className="h-4 w-4" /></Link>
        </div>
      </div>

      {/* Main Nav */}
      <div
        className={`transition-colors ${
          useDarkMode ? 'bg-white shadow' : 'bg-transparent'
        } group`}
      >
        <div className="container relative mx-auto flex items-center justify-between h-20 px-6">
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium relative">
            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu('shop')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className={`${linkBase} ${linkHover} flex items-center`}>
                Shop <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openMenu === 'shop' && (
                <div className="absolute top-full left-0 w-screen bg-white shadow-lg p-6 grid grid-cols-3 gap-6 z-50">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products`}
                        className="hover:underline"
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No categories yet</p>
                  )}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu('about')}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className={`${linkBase} ${linkHover} flex items-center`}>
                About <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openMenu === 'about' && (
                <div className="absolute top-full left-0 w-screen bg-white shadow-lg p-6 grid grid-cols-3 gap-6 z-50">
                  <Link href="/pages/discover" className="hover:underline">
                    Discover Artisans
                  </Link>
                  <Link href="/pages/contact-us" className="hover:underline">
                    Contact Us
                  </Link>
                  <Link href="/pages/our-story" className="hover:underline">
                    Our Story
                  </Link>
                </div>
              )}
            </div>

            <Link href="/faqs" className={`${linkBase} ${linkHover}`}>
              FAQs
            </Link>
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="logo_image"
                style={{ width: '110px' }}
              />
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex items-center space-x-6">
            {/* Account */}
            <Link href="/account/login" className={`${linkBase} ${linkHover}`}>
              <User className="inline h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link href="/cart" className={`${linkBase} ${linkHover} flex items-center`}>
              <ShoppingBag className="h-5 w-5 mr-1" /> Cart (0)
            </Link>

            {/* Sign Out if logged in */}
           {session?.user && (
                <form action={signOutAction}>
                    <button
                        type="submit"
                        className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
                    >
                        <Power className="w-5" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            )}
            

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className={`${linkBase} h-6 w-6`} />
            </button>
          </div>
        </div>
      </div>

      {/*Mobile Menu Drawer (Dynamic Categories) */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col">
            {/* Close Button */}
            <button
              className="self-end mb-6"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-4 text-gray-800 text-lg">
              <details>
                <summary className="cursor-pointer">Shop</summary>
                <div className="ml-4 flex flex-col gap-2">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No categories yet</p>
                  )}
                </div>
              </details>

              <details>
                <summary className="cursor-pointer">About</summary>
                <div className="ml-4 flex flex-col gap-2">
                  <Link href="/pages/discover" onClick={() => setMobileOpen(false)}>
                    Discover Artisans
                  </Link>
                  <Link href="/pages/contact-us" onClick={() => setMobileOpen(false)}>
                    Contact Us
                  </Link>
                  <Link href="/pages/our-story" onClick={() => setMobileOpen(false)}>
                    Our Story
                  </Link>
                </div>
              </details>

              <Link href="/faqs" onClick={() => setMobileOpen(false)}>FAQs</Link>
              <Link href="/account/login" onClick={() => setMobileOpen(false)}>Account</Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart (0)</Link>

              {/* Optional: Sign Out button for mobile */}
            {session?.user && (
                <form action={signOutAction}>
                    <button
                        type="submit"
                        className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
                    >
                        <Power className="w-5" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
