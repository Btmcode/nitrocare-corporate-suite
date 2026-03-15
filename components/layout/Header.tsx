'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Search, Globe, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      name: 'Products', 
      href: '/products',
      dropdown: [
        { name: 'Hospital', href: '/products/hospital' },
        { name: 'Nursing Home', href: '/products/nursing-home' },
        { name: 'Homecare', href: '/products/homecare' },
      ]
    },
    { name: 'Company', href: '/about' },
    { name: 'News', href: '/news' },
    { name: 'Career', href: '/career' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/80 backdrop-blur-md py-5'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-[#004a99] flex items-center justify-center rounded-sm transition-transform group-hover:rotate-12">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl tracking-tighter text-[#004a99] leading-none">
              NITROCARE
            </span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold leading-none mt-1">
              Medical Furniture
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-widest transition-all flex items-center gap-1 py-2 ${
                  pathname.startsWith(link.href) ? 'text-[#004a99]' : 'text-slate-600 hover:text-[#004a99]'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
              </Link>
              
              {link.dropdown && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-2xl border-t-2 border-[#004a99] py-4 px-2"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#004a99] transition-all rounded-sm"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-4 border-r border-slate-200 pr-8">
            <button className="text-slate-600 hover:text-[#004a99] transition-colors">
              <Search size={20} />
            </button>
            <button className="text-slate-600 hover:text-[#004a99] transition-colors">
              <Globe size={20} />
            </button>
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link href="/admin" className="text-[10px] font-bold uppercase tracking-widest text-[#004a99] bg-blue-50 px-3 py-1 rounded-full">
                  Admin
                </Link>
              )}
              <button 
                onClick={() => signOut(auth)} 
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#004a99] hover:text-white transition-all"
              >
                <User size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin} 
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-[#004a99] px-6 py-3 rounded-sm hover:bg-[#002d5e] transition-all"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-[#004a99] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-[60] lg:hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#004a99] flex items-center justify-center rounded-sm">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <span className="font-serif font-bold text-xl text-[#004a99]">NITROCARE</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-slate-900 p-2">
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-serif font-bold text-slate-900 flex justify-between items-center"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="mt-4 ml-4 flex flex-col gap-3 border-l-2 border-slate-100 pl-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-500 font-medium"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-slate-100">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <span className="font-bold text-slate-900">{user.email}</span>
                    </div>
                    <button onClick={() => signOut(auth)} className="text-red-600 font-bold uppercase tracking-widest text-xs">Logout</button>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin} 
                    className="w-full bg-[#004a99] text-white py-5 rounded-sm font-bold uppercase tracking-widest"
                  >
                    Login to Account
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
