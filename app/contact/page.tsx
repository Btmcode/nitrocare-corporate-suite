'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon.');
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">Contact Us</h1>
          <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">How can we help you?</h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Whether you have questions about our products, need technical support, or want to become a partner – we are here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-sm mb-6">
                <Phone size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-sm">Call Us</h4>
              <p className="text-slate-600 mb-1">+49 (0) 5221 185 - 0</p>
              <p className="text-xs text-slate-400">Mon - Fri, 8:00 - 17:00 CET</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-sm mb-6">
                <Mail size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-sm">Email Us</h4>
              <p className="text-slate-600 mb-1">info@stiegelmeyer.com</p>
              <p className="text-xs text-slate-400">We respond within 24 hours</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-sm mb-6">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-sm">Visit Us</h4>
              <p className="text-slate-600 mb-1">Ackerstraße 42</p>
              <p className="text-slate-600">32051 Herford, Germany</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-sm shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full border border-slate-200 rounded-sm p-4 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full border border-slate-200 rounded-sm p-4 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                <select 
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({...formState, subject: e.target.value})}
                  className="w-full border border-slate-200 rounded-sm p-4 focus:outline-none focus:border-blue-600 transition-colors bg-white"
                >
                  <option value="">Select a topic</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="career">Career Opportunities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                <textarea 
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full border border-slate-200 rounded-sm p-4 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Global Presence */}
        <div className="bg-slate-900 rounded-sm p-12 lg:p-20 text-white text-center">
          <Globe size={48} className="mx-auto text-blue-400 mb-8" />
          <h3 className="text-3xl font-serif font-bold mb-6">Global Presence</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-12">
            With subsidiaries and partners in over 60 countries, we are always close to our customers. Find your local contact person.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <span className="block text-2xl font-bold mb-1">Europe</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">12 Subsidiaries</span>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden md:block" />
            <div className="text-center">
              <span className="block text-2xl font-bold mb-1">Asia</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">8 Partners</span>
            </div>
            <div className="w-px h-12 bg-slate-800 hidden md:block" />
            <div className="text-center">
              <span className="block text-2xl font-bold mb-1">Americas</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">15 Partners</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
