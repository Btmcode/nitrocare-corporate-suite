'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'motion/react';
import { ArrowLeft, Download, CheckCircle2, ChevronRight, Share2, Printer } from 'lucide-react';

interface ProductData {
  name: string;
  tagline?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image?: string;
  images?: string[];
  downloads?: { name: string; size: string }[];
}

const ProductDetailPage = () => {
  const { category, product: productSlug } = useParams();
  const [activeTab, setActiveTab] = useState('description');
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(collection(db, 'products'), where('slug', '==', productSlug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setProductData(querySnapshot.docs[0].data() as ProductData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="pt-48 pb-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="pt-48 pb-24 text-center">
        <h2 className="text-2xl font-serif font-bold">Product not found</h2>
        <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const images = productData.images || (productData.image ? [productData.image] : []);
  const features = productData.features || [];
  const specs = productData.specs || {};
  const downloads = productData.downloads || [
    { name: 'Product Brochure (PDF)', size: '2.4 MB' },
    { name: 'Technical Data Sheet', size: '1.1 MB' },
    { name: 'User Manual', size: '4.5 MB' }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link href={`/products/${category}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to {category} beds
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative h-[500px] bg-slate-50 rounded-sm overflow-hidden border border-slate-100">
              {images.length > 0 && (
                <Image 
                  src={images[0]} 
                  alt={productData.name} 
                  fill 
                  className="object-contain p-8"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative h-32 bg-slate-50 rounded-sm overflow-hidden border border-slate-100 cursor-pointer hover:border-blue-400 transition-colors">
                  <Image src={img} alt={`${productData.name} ${i}`} fill className="object-contain p-2" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">Product Detail</h1>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-4">{productData.name}</h2>
            {productData.tagline && <p className="text-xl text-slate-500 mb-8 italic">{productData.tagline}</p>}
            
            <div className="flex gap-4 mb-10">
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
                <Share2 size={16} /> Share
              </button>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
                <Printer size={16} /> Print
              </button>
            </div>

            <div className="space-y-6 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-all"
            >
              Request a Quote <ChevronRight size={20} />
            </Link>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-slate-200 mb-12">
          <div className="flex gap-12">
            {['description', 'specifications', 'downloads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[300px]">
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {productData.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="bg-slate-50 p-8 rounded-sm">
                  <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">Key Benefits</h4>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li>• Ergonomic design for staff health</li>
                    <li>• High safety for fall prevention</li>
                    <li>• Easy to clean and disinfect</li>
                    <li>• Long service life and durability</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-8 rounded-sm">
                  <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">Application Areas</h4>
                  <ul className="space-y-3 text-slate-600 text-sm">
                    <li>• Intensive care units</li>
                    <li>• General hospital wards</li>
                    <li>• Specialized clinics</li>
                    <li>• High-end care facilities</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'specifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <div className="divide-y divide-slate-100">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="py-4 flex justify-between gap-4">
                    <span className="font-medium text-slate-500">{key}</span>
                    <span className="font-bold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloads.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-6 border border-slate-100 rounded-sm hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm text-blue-600">
                      <Download size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900">{file.name}</h5>
                      <span className="text-xs text-slate-400 uppercase tracking-widest">{file.size}</span>
                    </div>
                  </div>
                  <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={24} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
