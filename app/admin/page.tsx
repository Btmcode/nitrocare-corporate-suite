'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Newspaper, 
  FileText, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Plus, 
  Shield, 
  Database,
  Search,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { getProducts, getNews, getDownloads, getMessages } from '@/lib/actions/db-actions';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    news: 0,
    downloads: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, news, downloads, messages] = await Promise.all([
          getProducts(),
          getNews(),
          getDownloads(),
          getMessages(),
        ]);
        setStats({
          products: products.length,
          news: news.length,
          downloads: downloads.length,
          messages: messages.length,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: <Package className="text-blue-600" />, href: '/admin/products', color: 'bg-blue-50' },
    { label: 'News Articles', value: stats.news, icon: <Newspaper className="text-emerald-600" />, href: '/admin/news', color: 'bg-emerald-50' },
    { label: 'Files & Downloads', value: stats.downloads, icon: <FileText className="text-amber-600" />, href: '/admin/downloads', color: 'bg-amber-50' },
    { label: 'Customer Inquiries', value: stats.messages, icon: <MessageSquare className="text-rose-600" />, href: '/admin/messages', color: 'bg-rose-50' },
  ];

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Command Center</h1>
          <p className="text-slate-500 font-medium">Welcome back to the Nitrocare administration portal.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/products"
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg"
          >
            <Plus size={16} /> New Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <Link key={idx} href={stat.href}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 border border-slate-100 rounded-sm shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-sm ${stat.color} transition-colors group-hover:bg-slate-900 group-hover:text-white`}>
                  {React.cloneElement(stat.icon as any, { size: 24, className: 'group-hover:text-white transition-colors' })}
                </div>
                <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health */}
        <div className="lg:col-span-1 bg-white border border-slate-100 rounded-sm p-8 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-8 flex items-center gap-2">
            <Database size={16} className="text-blue-600" /> Infrastructure Status
          </h3>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Database Engine</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full">SQLite Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Resource Budget</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Free Tier</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Content Integrity</span>
              <span className="text-sm font-bold text-slate-900">100% Verified</span>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-50">
            <div className="flex gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-blue-600"></div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest">Storage Utilization</p>
          </div>
        </div>

        {/* Quick Access */}
        <div className="lg:col-span-2 bg-slate-900 rounded-sm p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-serif">Administrative Suite</h3>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Welcome to the new Nitrocare management platform. All data is now securely stored locally, 
                eliminating external cloud costs while maintaining enterprise-grade performance.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
               <Link href="/admin/users" className="bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/10 transition-all text-center">
                  <Shield size={20} className="mx-auto mb-2 text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Security</span>
               </Link>
               <Link href="/admin/settings" className="bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/10 transition-all text-center">
                  <Database size={20} className="mx-auto mb-2 text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Config</span>
               </Link>
               <Link href="/admin/messages" className="bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/10 transition-all text-center">
                  <MessageSquare size={20} className="mx-auto mb-2 text-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Inquiry</span>
               </Link>
               <Link href="/" className="bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/10 transition-all text-center">
                  <ArrowRight size={20} className="mx-auto mb-2 text-rose-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live Site</span>
               </Link>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
