'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchProducts();
    };
    init();
  }, [fetchProducts]);

  const handleSave = async () => {
    if (!currentProduct.name || !currentProduct.slug) return;

    try {
      if (currentProduct.id) {
        await updateDoc(doc(db, 'products', currentProduct.id), currentProduct);
      } else {
        await addDoc(collection(db, 'products'), currentProduct);
      }
      setIsModalOpen(false);
      setCurrentProduct({});
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Management</h1>
          <p className="text-slate-500">Add, edit or remove products from your catalog.</p>
        </div>
        <button 
          onClick={() => { setCurrentProduct({}); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white border border-slate-200 rounded-sm py-2 px-4 pl-10 focus:outline-none focus:border-blue-600 transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <div className="flex gap-4">
            <select className="bg-white border border-slate-200 rounded-sm py-2 px-4 text-sm focus:outline-none">
              <option>All Categories</option>
              <option>Hospital</option>
              <option>Care</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{product.slug}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                    {product.categoryId}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setCurrentProduct(product); setIsModalOpen(true); }}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">
                  No products found. Start by adding one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Product Name</label>
                  <input 
                    type="text" 
                    value={currentProduct.name || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. Evario Bed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Slug</label>
                  <input 
                    type="text" 
                    value={currentProduct.slug || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600"
                    placeholder="e.g. evario-bed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</label>
                <select 
                  value={currentProduct.categoryId || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600"
                >
                  <option value="">Select Category</option>
                  <option value="hospital">Hospital</option>
                  <option value="care">Care</option>
                  <option value="homecare">Home Care</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</label>
                <textarea 
                  value={currentProduct.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 h-32 focus:outline-none focus:border-blue-600"
                  placeholder="Product description..."
                />
              </div>

              <div className="border-2 border-dashed border-slate-100 p-8 text-center rounded-sm hover:border-blue-200 transition-colors cursor-pointer group">
                <ImageIcon size={40} className="mx-auto text-slate-200 group-hover:text-blue-400 mb-4" />
                <p className="text-sm text-slate-400 font-medium">Click to upload product images</p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                <Save size={18} /> Save Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
