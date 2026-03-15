'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronRight, Filter } from 'lucide-react';
import { getProducts, getCategoryBySlug } from '@/lib/actions/db-actions';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  categorySlug: string;
  price: number | null;
  features: string | null;
}

const CategoryPage = () => {
  const { category: categorySlug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Parse features safely
  const getParsedFeatures = (product: Product): string[] => {
    try {
      return product.features ? JSON.parse(product.features) : [];
    } catch {
      return [];
    }
  };

  const allFeatures = Array.from(new Set(products.flatMap(p => getParsedFeatures(p))));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, catData] = await Promise.all([
          getProducts(categorySlug as string),
          getCategoryBySlug(categorySlug as string)
        ]);
        setProducts(productsData as Product[]);
        setFilteredProducts(productsData as Product[]);
        setCategory(catData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  useEffect(() => {
    let result = products;

    // Price Filter
    result = result.filter(p => {
      const price = p.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Features Filter
    if (selectedFeatures.length > 0) {
      result = result.filter(p => {
        const pFeatures = getParsedFeatures(p);
        return selectedFeatures.every(f => pFeatures.includes(f));
      });
    }

    setFilteredProducts(result);
  }, [priceRange, selectedFeatures, products]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  if (loading) return (
    <div className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 mb-12 transition-colors font-sans">
          <ArrowLeft size={16} /> Back to categories
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 font-sans">Category</h1>
            <h2 className="text-5xl font-serif font-bold text-slate-900 capitalize">{category?.name || categorySlug}</h2>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 border px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-widest transition-colors font-sans ${showFilters ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 hover:bg-slate-50'}`}
          >
            <Filter size={16} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full lg:w-64 flex-shrink-0"
              >
                <div className="sticky top-32 space-y-10">
                  {/* Price Range */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-2 font-sans">Price Range</h4>
                    <div className="space-y-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="10000" 
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs font-bold text-slate-500 font-sans">
                        <span>$0</span>
                        <span>Up to ${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-2 font-sans">Key Features</h4>
                    <div className="space-y-3">
                      {allFeatures.map(feature => (
                        <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={selectedFeatures.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setSelectedFeatures([]);
                    }}
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors font-sans"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-slate-200 rounded-sm">
                <p className="text-slate-500">No products match your current filters.</p>
                <button 
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedFeatures([]);
                  }}
                  className="mt-4 text-blue-600 font-bold uppercase tracking-widest text-xs font-sans"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group border border-slate-100 p-4 hover:border-blue-200 hover:shadow-xl transition-all duration-300 bg-white"
                  >
                    <Link href={`/products/${categorySlug}/${product.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden rounded-sm mb-6 bg-slate-50">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        {product.price && (
                          <span className="text-sm font-bold text-slate-900 font-sans">${product.price}</span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {getParsedFeatures(product).slice(0, 2).map(f => (
                          <span key={f} className="text-[9px] font-bold uppercase tracking-widest bg-slate-50 text-slate-400 px-2 py-1 rounded-full font-sans">
                            {f}
                          </span>
                        ))}
                        {getParsedFeatures(product).length > 2 && (
                          <span className="text-[9px] font-bold uppercase tracking-widest bg-slate-50 text-slate-400 px-2 py-1 rounded-full font-sans">
                            +{getParsedFeatures(product).length - 2} More
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Model Series</span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-blue-600 font-sans">
                          Details <ChevronRight size={14} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
