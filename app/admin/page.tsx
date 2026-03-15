'use client';

import React from 'react';
import { Package, Newspaper, Users, Eye, TrendingUp, ShoppingCart, Settings, Info, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      name: 'Total Products', 
      value: '42', 
      icon: <Package size={24} />, 
      color: 'bg-blue-500',
      description: 'Total number of active products in the catalog.'
    },
    { 
      name: 'Blog Posts', 
      value: '128', 
      icon: <Newspaper size={24} />, 
      color: 'bg-emerald-500',
      description: 'Total published news articles and blog posts.'
    },
    { 
      name: 'Active Users', 
      value: '1,240', 
      icon: <Users size={24} />, 
      color: 'bg-violet-500',
      description: 'Users who have visited the site in the last 30 days.'
    },
    { 
      name: 'Page Views', 
      value: '45.2k', 
      icon: <Eye size={24} />, 
      color: 'bg-amber-500',
      description: 'Total page views across all sections of the website.'
    },
  ];

  const activities = [
    { id: 1, type: 'product', title: 'New product added', detail: 'HB 6000 Hospital Bed', time: '2 hours ago', user: 'Admin', status: 'success' },
    { id: 2, type: 'post', title: 'Blog post published', detail: 'Nitrocare Expands Global Reach', time: '5 hours ago', user: 'Editor', status: 'success' },
    { id: 3, type: 'user', title: 'New user registered', detail: 'john.doe@example.com', time: 'Yesterday', user: 'System', status: 'info' },
    { id: 4, type: 'alert', title: 'Inventory Alert', detail: 'HB 4000 stock is low', time: '2 days ago', user: 'System', status: 'warning' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Admin. Here&apos;s what&apos;s happening with your site today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="group relative bg-white p-6 rounded-sm shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-sm text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp size={12} /> +12%
                </span>
                <div className="relative group/tooltip">
                  <Info size={14} className="text-slate-300 cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-sm text-slate-500 font-medium">{stat.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Timeline */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Recent Activity</h3>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-200 before:to-transparent">
            {activities.map((activity) => (
              <div key={activity.id} className="relative flex items-start gap-6 pl-2">
                <div className={`relative z-10 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shrink-0 ${
                  activity.status === 'success' ? 'bg-emerald-500' : 
                  activity.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  {activity.type === 'product' && <Package size={10} className="text-white" />}
                  {activity.type === 'post' && <Newspaper size={10} className="text-white" />}
                  {activity.type === 'user' && <Users size={10} className="text-white" />}
                  {activity.type === 'alert' && <AlertCircle size={10} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{activity.detail}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">By {activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-blue-50 hover:border-blue-200 transition-all group">
              <Package size={32} className="text-slate-400 group-hover:text-blue-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Add Product</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
              <Newspaper size={32} className="text-slate-400 group-hover:text-emerald-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">New Post</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-violet-50 hover:border-violet-200 transition-all group">
              <Users size={32} className="text-slate-400 group-hover:text-violet-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Manage Users</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-amber-50 hover:border-amber-200 transition-all group">
              <Settings size={32} className="text-slate-400 group-hover:text-amber-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Settings</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-blue-50 hover:border-blue-200 transition-all group">
              <Package size={32} className="text-slate-400 group-hover:text-blue-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Add Product</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-emerald-50 hover:border-emerald-200 transition-all group">
              <Newspaper size={32} className="text-slate-400 group-hover:text-emerald-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">New Post</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-violet-50 hover:border-violet-200 transition-all group">
              <Users size={32} className="text-slate-400 group-hover:text-violet-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Manage Users</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-sm hover:bg-amber-50 hover:border-amber-200 transition-all group">
              <Settings size={32} className="text-slate-400 group-hover:text-amber-600 mb-3" />
              <span className="text-sm font-bold text-slate-900">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
