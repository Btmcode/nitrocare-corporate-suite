'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, User, Shield, Mail, Calendar, Check, X, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { getUsers, updateUserRole } from '@/lib/actions/db-actions';

interface UserData {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  lastLogin?: Date | null;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data as UserData[]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    if (confirm(`Are you sure you want to ${currentStatus ? 'remove' : 'grant'} admin privileges?`)) {
      try {
        await updateUserRole(userId, !currentStatus);
        fetchUsers();
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Failed to update user role.');
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
        <p className="text-slate-500">Manage administrative access and view registered users.</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Search by email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-sm py-2 px-4 pl-10 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${user.isAdmin ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.email}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {user.id.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <span className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-blue-100 w-fit">
                        <Shield size={12} /> Administrator
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-slate-100 w-fit">
                        Standard User
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-300" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={14} className="text-slate-300" />
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleAdmin(user.id, user.isAdmin)}
                      className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all ${
                        user.isAdmin 
                        ? 'text-red-500 hover:bg-red-50 border border-red-100' 
                        : 'text-blue-600 hover:bg-blue-50 border border-blue-100'
                      }`}
                    >
                      {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-amber-50 border border-amber-100 rounded-sm flex gap-4">
        <ShieldAlert className="text-amber-600 shrink-0" size={24} />
        <div>
          <h4 className="text-sm font-bold text-amber-900 mb-1">Security Warning</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            Granting administrator privileges allows users to create, modify, and delete products, news articles, and other system settings. 
            Exercise caution when promoting users. User roles are managed via Prisma/SQLite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
