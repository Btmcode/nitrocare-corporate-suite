'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Mail, User, Clock, Trash2, CheckCircle, MessageSquare, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { getMessages, updateMessageStatus, deleteMessage } from '@/lib/actions/db-actions';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data as ContactMessage[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    try {
      await updateMessageStatus(id, 'read');
      fetchMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        fetchMessages();
        setSelectedMessage(null);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Messages & Inquiries</h1>
        <p className="text-slate-500">View and manage contact form submissions from the website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message List */}
        <div className="lg:col-span-1 border border-slate-100 bg-white rounded-sm shadow-sm overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Search messages..." className="bg-transparent text-sm focus:outline-none w-full" />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {messages.map((msg) => (
              <button 
                key={msg.id}
                onClick={() => { setSelectedMessage(msg); if(msg.status === 'new') markAsRead(msg.id); }}
                className={`w-full p-4 text-left hover:bg-slate-50 transition-colors relative ${selectedMessage?.id === msg.id ? 'bg-blue-50/50' : ''}`}
              >
                {msg.status === 'new' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                )}
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold uppercase tracking-widest ${msg.status === 'new' ? 'text-blue-600' : 'text-slate-400'}`}>
                    {msg.subject}
                  </span>
                  <span className="text-[10px] text-slate-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className={`text-sm mb-1 truncate ${msg.status === 'new' ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                  {msg.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{msg.message}</p>
              </button>
            ))}
            {messages.length === 0 && !loading && (
              <div className="p-8 text-center text-slate-400 italic text-sm">No messages found.</div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedMessage.subject}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-1.5"><User size={14} className="text-blue-600" /> {selectedMessage.name}</span>
                    <span className="flex items-center gap-1.5 text-blue-600"><Mail size={14} /> {selectedMessage.email}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-3 text-slate-400 hover:text-red-600 bg-white border border-slate-200 rounded-sm transition-colors shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-10">
                <div className="flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-8 rounded-sm text-slate-700 leading-relaxed font-serif text-lg">
                      {selectedMessage.message}
                    </div>
                    <div className="pt-6 flex gap-4">
                      <a 
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                      >
                        <Mail size={18} /> Reply via Email
                      </a>
                      <button 
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="px-8 py-3 text-slate-500 font-bold uppercase tracking-widest hover:bg-slate-50 transition-all rounded-sm flex items-center gap-2"
                      >
                        <CheckCircle size={18} /> Mark as Processed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full bg-slate-50 border border-slate-100 rounded-sm flex flex-col items-center justify-center p-20 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select a message</h3>
              <p className="text-slate-400 text-sm max-w-xs">Choose an inquiry from the list to read the full content and respond.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
