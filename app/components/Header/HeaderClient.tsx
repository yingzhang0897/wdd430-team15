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
  
  // Force dark text on light backgrounds for better visibility
  // Use dark text for all non-home pages or when scrolled
  const linkBase = 'text-black font-bold';
  const linkHover = 'hover:text-green-600';
  
  // Inline styles with !important to override any conflicting CSS
  const forceVisible: React.CSSProperties = {
    color: '#000000',
    fontWeight: 'bold',
    textDecoration: 'none',
    opacity: '1'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      {/* Announcement Bar (smooth collapse) */}
      <div
        className={`bg-primary text-neutral-light text-xs px-4 flex justify-between items-center overflow-hidden transition-all duration-300 ease-out ${
          scrolled ? 'max-h-0 opacity-0 -translate-y-2 py-0' : 'max-h-10 opacity-100 translate-y-0 py-2'
        }`}
      >
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
        className="bg-white shadow-lg border-b border-gray-200 transition-all duration-300 group"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : '#ffffff',
          backdropFilter: scrolled ? 'saturate(180%) blur(8px)' : undefined,
          zIndex: 9999,
        }}
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
              <button className={`${linkBase} ${linkHover} flex items-center`} style={forceVisible}>
                Shop <ChevronDown className="ml-1 h-4 w-4" style={{color: '#000000'}} />
              </button>
              {openMenu === 'shop' && (
                <div className="absolute top-full left-0 w-screen bg-white shadow-lg p-6 grid grid-cols-3 gap-6 z-50">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/products`}
                        className="text-gray-900 font-semibold hover:text-green-600 hover:underline"
                        style={{color: '#000000', fontWeight: 'bold'}}
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-900 italic" style={{color: '#000000'}}>No categories yet</p>
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
              <button className={`${linkBase} ${linkHover} flex items-center`} style={forceVisible}>
                About <ChevronDown className="ml-1 h-4 w-4" style={{color: '#000000'}} />
              </button>
              {openMenu === 'about' && (
                <div className="absolute top-full left-0 w-screen bg-white shadow-lg p-6 grid grid-cols-3 gap-6 z-50">
                  <Link href="/about" className="text-gray-900 font-semibold hover:text-green-600 hover:underline" style={{color: '#000000', fontWeight: 'bold'}}>
                    About Us
                  </Link>
                  <Link href="/contact" className="text-gray-900 font-semibold hover:text-green-600 hover:underline" style={{color: '#000000', fontWeight: 'bold'}}>
                    Contact Us
                  </Link>
                  <Link href="/products" className="text-gray-900 font-semibold hover:text-green-600 hover:underline" style={{color: '#000000', fontWeight: 'bold'}}>
                    Browse Products
                  </Link>
                </div>
              )}
            </div>

            <Link href="/faq" className={`${linkBase} ${linkHover}`} style={forceVisible}>
              FAQs
            </Link>
          </nav>

          {/* Mobile Logo (left-aligned) */}
          <div className="md:hidden">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop/Tablet Centered Logo */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
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
            {/* Account - Show Dashboard/Login based on session */}
            {session?.user ? (
              <div className="flex items-center space-x-4">
                {/* User Dashboard Link */}
                <Link href="/dashboard/user" className={`${linkBase} ${linkHover} flex items-center gap-1`} style={{color: '#000000', fontWeight: 'bold'}}>
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                {/* Logout Button */}
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className={`${linkBase} ${linkHover} flex items-center gap-1`}
                    style={{color: '#000000', fontWeight: 'bold'}}
                  >
                    <Power className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/account/login" className={`${linkBase} ${linkHover} flex items-center gap-1`} style={{color: '#000000', fontWeight: 'bold'}}>
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className={`${linkBase} ${linkHover} flex items-center`} style={{color: '#000000', fontWeight: 'bold'}}>
              <ShoppingBag className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Cart (0)</span>
            </Link>
            

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              style={{color: '#000000'}}
            >
              <Menu className={`${linkBase} h-6 w-6`} style={{color: '#000000'}} />
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
                        href={`/products`}
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
                  <Link href="/about" onClick={() => setMobileOpen(false)}>
                    About Us
                  </Link>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Contact Us
                  </Link>
                  <Link href="/products" onClick={() => setMobileOpen(false)}>
                    Browse Products
                  </Link>
                </div>
              </details>

              <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQs</Link>
              
              {/* Account - Dashboard/Login for mobile */}
              {session?.user ? (
                <>
                  <Link href="/dashboard/user" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="text-left text-gray-800 text-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/account/login" onClick={() => setMobileOpen(false)}>Login</Link>
              )}
              
              <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart (0)</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

