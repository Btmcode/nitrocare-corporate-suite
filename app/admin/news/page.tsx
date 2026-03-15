'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon, Calendar, Tag, User } from 'lucide-react';
import { motion } from 'motion/react';
import { getNews, upsertNews, deleteNews } from '@/lib/actions/db-actions';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: Date;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[] | string;
}

const AdminNews = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNews();
      const parsedData = data.map(p => ({
        ...p,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags || [],
        date: new Date(p.date)
      })) as BlogPost[];
      setPosts(parsedData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.slug) return;

    try {
      await upsertNews(currentPost);
      setIsModalOpen(false);
      setCurrentPost({});
      setTagInput('');
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteNews(id);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const addTag = () => {
    const currentTags = Array.isArray(currentPost.tags) ? currentPost.tags : [];
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setCurrentPost({
        ...currentPost,
        tags: [...currentTags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = Array.isArray(currentPost.tags) ? currentPost.tags : [];
    setCurrentPost({
      ...currentPost,
      tags: currentTags.filter(t => t !== tag)
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">News & Blog Management</h1>
          <p className="text-slate-500">Create and manage your articles, news, and press releases.</p>
        </div>
        <button 
          onClick={() => { 
            setCurrentPost({ 
              date: new Date(), 
              tags: [], 
              author: 'Nitrocare Communications' 
            }); 
            setIsModalOpen(true); 
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} /> New Article
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-white border border-slate-200 rounded-sm py-2 px-4 pl-10 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Tags</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-sm bg-slate-100 relative overflow-hidden flex-shrink-0 border border-slate-200">
                        {post.image ? (
                          <img src={post.image} alt="" className="object-cover w-full h-full" />
                        ) : (
                          <ImageIcon className="absolute inset-0 m-auto text-slate-300" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{post.title}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[200px]">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <Calendar size={14} />
                       {post.date ? new Date(post.date).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      {post.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {(Array.isArray(post.tags) ? post.tags : []).map(tag => (
                        <span key={tag} className="bg-slate-100 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setCurrentPost(post); setIsModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white border border-slate-100 rounded-sm hover:border-blue-100 shadow-sm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white border border-slate-100 rounded-sm hover:border-red-100 shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                    No articles found. Start by creating your first post.
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="text-xl font-bold text-slate-900">
                {currentPost.id ? 'Edit Article' : 'New Article'}
              </h3>
              <button 
                onClick={() => { setIsModalOpen(false); setTagInput(''); }} 
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Article Title</label>
                    <input 
                      type="text" 
                      value={currentPost.title || ''}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        setCurrentPost({ ...currentPost, title, slug });
                      }}
                      className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                      placeholder="e.g. Innovation in Hospital Beds"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Slug</label>
                    <input 
                      type="text" 
                      value={currentPost.slug || ''}
                      onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                      className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors text-slate-400 bg-slate-50"
                      placeholder="URL-friendly-slug"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Date</label>
                      <input 
                        type="date" 
                        value={currentPost.date instanceof Date ? currentPost.date.toISOString().split('T')[0] : ''}
                        onChange={(e) => setCurrentPost({ ...currentPost, date: new Date(e.target.value) })}
                        className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Author</label>
                      <input 
                        type="text" 
                        value={currentPost.author || ''}
                        onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                        className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Thumbnail URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={currentPost.image || ''}
                        onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                        className="flex-1 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="h-32 bg-slate-50 border border-slate-200 rounded-sm relative overflow-hidden flex items-center justify-center">
                      {currentPost.image ? (
                        <img src={currentPost.image} alt="Preview" className="object-cover w-full h-full" />
                      ) : (
                        <div className="text-center text-slate-300">
                          <ImageIcon size={32} className="mx-auto mb-2" />
                          <p className="text-[10px] font-bold uppercase tracking-widest">Image Preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Excerpt</label>
                <textarea 
                  value={currentPost.excerpt || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 h-20 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  placeholder="Short summary for lists..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Main Content</label>
                <textarea 
                  value={currentPost.content || ''}
                  onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 h-64 focus:outline-none focus:border-blue-600 transition-colors font-serif"
                  placeholder="The full story starts here..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tags</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                    placeholder="Add a tag..."
                  />
                  <button 
                    onClick={addTag}
                    className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold uppercase tracking-widest text-xs rounded-sm transition-all shadow-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(currentPost.tags) ? currentPost.tags : []).map(tag => (
                    <span key={tag} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                      <Tag size={10} />
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4 sticky bottom-0 z-10">
              <button 
                onClick={() => { setIsModalOpen(false); setTagInput(''); }}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Save size={18} /> {currentPost.id ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;
