'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Facebook, Twitter, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import { getNews } from '@/lib/actions/db-actions';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: any;
  image: string;
  author: string;
  tags: string | null;
}

const NewsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    setAppUrl(window.location.origin);
  }, []);

  const getParsedTags = (post: BlogPost): string[] => {
    try {
      return post.tags ? JSON.parse(post.tags) : [];
    } catch {
      return [];
    }
  };

  const shareOnSocial = (platform: string, post: BlogPost) => {
    const url = `${appUrl}/news/${post.slug}`;
    const text = encodeURIComponent(post.title);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getNews();
        setPosts(data as BlogPost[]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 font-sans">News & Media</h1>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Latest from Nitrocare</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Stay informed about our latest innovations, company news, and events in the healthcare world.
            </p>
          </div>
          <div className="relative w-full lg:w-80">
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-sm py-3 px-4 pl-10 focus:outline-none focus:border-blue-600 transition-colors font-sans"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {posts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative h-[600px] overflow-hidden rounded-sm mb-20 shadow-2xl cursor-pointer"
          >
            <Image 
              src={posts[0].image} 
              alt={posts[0].title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-12 w-full lg:w-2/3">
              <div className="flex gap-4 mb-6">
                {getParsedTags(posts[0]).map(tag => (
                  <span key={tag} className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm font-sans">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                {posts[0].title}
              </h3>
              <p className="text-slate-300 text-lg mb-8 line-clamp-2">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-slate-400 text-sm mb-8 font-sans">
                <span className="flex items-center gap-2"><Calendar size={16} /> {format(new Date(posts[0].date), 'MMMM dd, yyyy')}</span>
                <span className="flex items-center gap-2"><User size={16} /> {posts[0].author}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link 
                  href={`/news/${posts[0].slug}`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all font-sans"
                >
                  Read Article <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2 font-sans">Share:</span>
                  <button onClick={() => shareOnSocial('facebook', posts[0])} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all">
                    <Facebook size={16} />
                  </button>
                  <button onClick={() => shareOnSocial('twitter', posts[0])} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-400 transition-all">
                    <Twitter size={16} />
                  </button>
                  <button onClick={() => shareOnSocial('linkedin', posts[0])} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-700 transition-all">
                    <Linkedin size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.slice(1).map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/news/${post.slug}`} className="block">
                <div className="relative h-64 overflow-hidden rounded-sm mb-6 shadow-md">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm font-sans">
                      {getParsedTags(post)[0]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 font-sans">
                  <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span>{post.author}</span>
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-transform font-sans">
                    Read more <ArrowRight size={14} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.preventDefault(); shareOnSocial('facebook', post); }} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Facebook size={14} />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); shareOnSocial('twitter', post); }} className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                      <Twitter size={14} />
                    </button>
                    <button onClick={(e) => { e.preventDefault(); shareOnSocial('linkedin', post); }} className="p-2 text-slate-400 hover:text-blue-700 transition-colors">
                      <Linkedin size={14} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
