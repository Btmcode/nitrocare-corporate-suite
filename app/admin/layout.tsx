'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { LayoutDashboard, Package, Newspaper, Settings, LogOut, Home, Users, FileText, MessageSquare, Database } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Products', icon: <Package size={20} />, href: '/admin/products' },
    { name: 'News & Blog', icon: <Newspaper size={20} />, href: '/admin/news' },
    { name: 'Downloads', icon: <FileText size={20} />, href: '/admin/downloads' },
    { name: 'Messages', icon: <MessageSquare size={20} />, href: '/admin/messages' },
    { name: 'Users', icon: <Users size={20} />, href: '/admin/users' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
    { name: 'Database', icon: <Database size={20} />, href: 'https://vercel.com/coinamca-gmailcoms-projects/nitrocare-corporate-suite/stores', external: true },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-30 font-sans">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center rounded-sm">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-lg tracking-tight uppercase">NITROCARE Admin</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-sm transition-all"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              {item.icon}
              <span className="text-sm font-bold uppercase tracking-widest">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all">
            <Home size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Website</span>
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-10">
        {children}
      </main>
    </div>
  );
}
