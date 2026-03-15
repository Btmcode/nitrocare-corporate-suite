'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, FileText, Download, Globe, HardDrive, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { getDownloads, upsertDownload, deleteDownload } from '@/lib/actions/db-actions';

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  type: string;
  size: string;
  language: string;
  url: string;
  createdAt: Date;
}

const AdminDownloads = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDownload, setCurrentDownload] = useState<Partial<DownloadItem>>({});
  const [loading, setLoading] = useState(true);

  const fetchDownloads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDownloads();
      setDownloads(data as DownloadItem[]);
    } catch (error) {
      console.error('Error fetching downloads:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleSave = async () => {
    if (!currentDownload.title || !currentDownload.url) return;

    try {
      await upsertDownload(currentDownload);
      setIsModalOpen(false);
      setCurrentDownload({});
      fetchDownloads();
    } catch (error) {
      console.error('Error saving download:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this file reference?')) {
      try {
        await deleteDownload(id);
        fetchDownloads();
      } catch (error) {
        console.error('Error deleting download:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Download Center Management</h1>
          <p className="text-slate-500">Manage technical documents, brochures, and user manuals.</p>
        </div>
        <button 
          onClick={() => { setCurrentDownload({ type: 'PDF', language: 'Global (EN)' }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} /> Add File
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full bg-white border border-slate-200 rounded-sm py-2 px-4 pl-10 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">File Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Format</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {downloads.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-slate-500">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-bold text-xs">{item.type}</td>
                  <td className="px-6 py-4 text-slate-400 text-xs">{item.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                      <Globe size={12} className="text-slate-300" />
                      {item.language}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setCurrentDownload(item); setIsModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white border border-slate-100 rounded-sm shadow-sm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white border border-slate-100 rounded-sm shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {downloads.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-400 italic">
                    No files found in the download center.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="text-xl font-bold text-slate-900">
                {currentDownload.id ? 'Edit File Reference' : 'Add New File'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">File Title</label>
                <input 
                  type="text" 
                  value={currentDownload.title || ''}
                  onChange={(e) => setCurrentDownload({ ...currentDownload, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder="e.g. Evario technical manual"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</label>
                  <select 
                    value={currentDownload.category || ''}
                    onChange={(e) => setCurrentDownload({ ...currentDownload, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="">Select Category</option>
                    <option value="Brochure">Brochure</option>
                    <option value="Manual">Manual</option>
                    <option value="Certificates">Certificates</option>
                    <option value="Technical Data">Technical Data</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Language</label>
                  <input 
                    type="text" 
                    value={currentDownload.language || ''}
                    onChange={(e) => setCurrentDownload({ ...currentDownload, language: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="e.g. EN / DE / TR"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">File Format</label>
                  <select 
                    value={currentDownload.type || ''}
                    onChange={(e) => setCurrentDownload({ ...currentDownload, type: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="ZIP">ZIP</option>
                    <option value="JPG">JPG</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">File Size</label>
                  <input 
                    type="text" 
                    value={currentDownload.size || ''}
                    onChange={(e) => setCurrentDownload({ ...currentDownload, size: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="e.g. 2.4 MB"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Download URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={currentDownload.url || ''}
                    onChange={(e) => setCurrentDownload({ ...currentDownload, url: e.target.value })}
                    className="flex-1 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="https://example.com/file.pdf"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-100 p-8 text-center rounded-sm hover:border-blue-200 transition-colors cursor-pointer group">
                <HardDrive size={32} className="mx-auto text-slate-200 group-hover:text-blue-400 mb-3" />
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Upload File to Storage</p>
                <p className="text-[10px] text-slate-300 mt-1">(Work in progress - Local Storage upload coming soon)</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4 sticky bottom-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
              >
                <Save size={18} /> Save Reference
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDownloads;
