'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { LayoutDashboard, Package, Newspaper, Settings, LogOut, Home, Users, FileText } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
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
    { name: 'Users', icon: <Users size={20} />, href: '/admin/users' },
    { name: 'Settings', icon: <Settings size={20} />, href: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-30">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
              <span className="text-slate-900 font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg tracking-tight">ADMIN PANEL</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-sm transition-all"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-all">
            <Home size={20} />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>
          <button 
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-all"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
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
