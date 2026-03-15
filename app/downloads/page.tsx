'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Search, Filter, ChevronRight, FileCode, FileImage } from 'lucide-react';
import { motion } from 'motion/react';

const DownloadsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const downloadCategories = [
    'All', 'Brochures', 'Technical Data', 'User Manuals', 'Certificates'
  ];

  const files = [
    { name: 'Corporate Brochure 2026', type: 'PDF', size: '4.2 MB', category: 'Brochures' },
    { name: 'Evario Hospital Bed - Technical Specs', type: 'PDF', size: '1.8 MB', category: 'Technical Data' },
    { name: 'Seta pro User Manual v2.1', type: 'PDF', size: '5.5 MB', category: 'User Manuals' },
    { name: 'ISO 9001 Certificate', type: 'PDF', size: '0.8 MB', category: 'Certificates' },
    { name: 'Puro Bed Product Sheet', type: 'PDF', size: '2.1 MB', category: 'Brochures' },
    { name: 'Care Bed Accessories Catalog', type: 'PDF', size: '8.4 MB', category: 'Brochures' },
    { name: 'Safety Instructions for Staff', type: 'PDF', size: '1.2 MB', category: 'User Manuals' },
    { name: 'Sustainability Report 2025', type: 'PDF', size: '3.7 MB', category: 'Certificates' },
  ];

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">Service & Support</h1>
          <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Download Center</h2>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Find all relevant documents, brochures, technical data sheets and certificates in one place.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search documents by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm py-4 px-6 pl-12 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {downloadCategories.map((cat) => (
              <button 
                key={cat}
                className="whitespace-nowrap px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file, idx) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-slate-100 p-6 rounded-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center rounded-sm transition-colors">
                  <FileText size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-sm">
                  {file.category}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {file.name}
              </h4>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  {file.type} • {file.size}
                </span>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Download <Download size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-slate-400 italic">No documents found matching your search.</p>
          </div>
        )}

        {/* Technical Support CTA */}
        <div className="mt-24 bg-slate-50 rounded-sm p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100">
          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Need technical assistance?</h3>
            <p className="text-slate-600">Our service team is available for all technical questions regarding our products.</p>
          </div>
          <Link 
            href="/contact" 
            className="bg-slate-900 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            Contact Support <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;
