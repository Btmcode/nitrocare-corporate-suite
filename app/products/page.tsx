'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { getCategories } from '@/lib/actions/db-actions';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

const ProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data as Category[]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return (
    <div className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 font-sans">Our Portfolio</h1>
          <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">Product Worlds</h2>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Discover our wide range of products for hospitals, care facilities and home care. We offer the right solution for every requirement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <Link href={`/products/${cat.slug}`} className="block">
                <div className="relative h-[400px] overflow-hidden rounded-sm mb-6">
                  {cat.image ? (
                    <Image 
                      src={cat.image} 
                      alt={cat.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-600 mb-4 max-w-md">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-transform font-sans">
                  Explore Category <ChevronRight size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
