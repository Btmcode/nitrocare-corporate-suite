'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { getProducts, upsertProduct, deleteProduct } from '@/lib/actions/db-actions';

interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  price: number;
  image: string;
  features: string[] | string;
  specs: Record<string, string> | string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    features: [],
    specs: {}
  });
  const [loading, setLoading] = useState(true);
  const [featureInput, setFeatureInput] = useState('');
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      // Parse JSON strings
      const parsedData = data.map(p => ({
        ...p,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [],
        specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs || {}
      })) as Product[];
      setProducts(parsedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = async () => {
    if (!currentProduct.name || !currentProduct.slug) return;

    try {
      await upsertProduct(currentProduct);
      setIsModalOpen(false);
      setCurrentProduct({ features: [], specs: {} });
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = Array.isArray(currentProduct.features) ? currentProduct.features : [];
      setCurrentProduct({
        ...currentProduct,
        features: [...currentFeatures, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const addSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      const currentSpecs = typeof currentProduct.specs === 'object' ? currentProduct.specs : {};
      setCurrentProduct({
        ...currentProduct,
        specs: { ...currentSpecs, [specKey.trim()]: specValue.trim() }
      });
      setSpecKey('');
      setSpecValue('');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Management</h1>
          <p className="text-slate-500">Configure your product catalog, technical specs, and pricing.</p>
        </div>
        <button 
          onClick={() => { setCurrentProduct({ features: [], specs: {} }); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 border-l-2 border-transparent group-hover:border-blue-600">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-sm bg-slate-50 flex-shrink-0 relative border border-slate-100 p-2">
                        {product.image ? (
                          <img src={product.image} alt="" className="object-contain w-full h-full" />
                        ) : (
                          <ImageIcon className="absolute inset-0 m-auto text-slate-200" size={20} />
                        )}
                      </div>
                      <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm italic">{product.slug}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border border-blue-100">
                      {product.categorySlug}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">${product.price?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setCurrentProduct(product); setIsModalOpen(true); }}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white border border-slate-100 rounded-sm shadow-sm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-white border border-slate-100 rounded-sm shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                    No products found. Start by adding one to your catalog.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden my-auto"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-900">
                {currentProduct.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-10 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Product Name</label>
                    <input 
                      type="text" 
                      value={currentProduct.name || ''}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        setCurrentProduct({ ...currentProduct, name, slug });
                      }}
                      className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Slug</label>
                    <input 
                      type="text" 
                      value={currentProduct.slug || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                      className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 bg-slate-50 text-slate-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Category</label>
                      <select 
                        value={currentProduct.categorySlug || ''}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, categorySlug: e.target.value })}
                        className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 bg-white"
                      >
                        <option value="">Select Category</option>
                        <option value="hospital">Hospital</option>
                        <option value="nursing-home">Nursing Home</option>
                        <option value="homecare">Home Care</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Price ($)</label>
                      <input 
                        type="number" 
                        value={currentProduct.price || 0}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseInt(e.target.value) })}
                        className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Image URL</label>
                  <input 
                    type="text" 
                    value={currentProduct.image || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 mb-4"
                  />
                  <div className="h-48 border border-slate-200 rounded-sm flex items-center justify-center bg-slate-50 p-6">
                    {currentProduct.image ? (
                      <img src={currentProduct.image} alt="Preview" className="max-h-full object-contain" />
                    ) : (
                      <ImageIcon size={40} className="text-slate-200" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Description</label>
                <textarea 
                  value={currentProduct.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-sm p-3 h-32 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Key Features</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                      className="flex-1 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 text-sm"
                      placeholder="e.g. Electric height adjustment"
                    />
                    <button onClick={addFeature} className="bg-slate-100 hover:bg-slate-200 px-4 rounded-sm transition-colors shadow-sm"><Plus size={18} /></button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(currentProduct.features) ? currentProduct.features : []).map((f, i) => (
                      <span key={i} className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                        {f}
                        <button onClick={() => setCurrentProduct({...currentProduct, features: (currentProduct.features as string[])?.filter((_, idx) => idx !== i)})} className="hover:text-red-500">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Technical Specs</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={specKey}
                      onChange={(e) => setSpecKey(e.target.value)}
                      className="w-1/3 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 text-sm"
                      placeholder="Key (e.g. Load)"
                    />
                    <input 
                      type="text" 
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 text-sm"
                      placeholder="Value (e.g. 200kg)"
                    />
                    <button onClick={addSpec} className="bg-slate-100 hover:bg-slate-200 px-4 rounded-sm transition-colors shadow-sm"><Plus size={18} /></button>
                  </div>
                  <div className="space-y-2">
                    {Object.entries((typeof currentProduct.specs === 'object' ? currentProduct.specs : {}) as Record<string, string>).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-sm group">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{k}</span>
                          <span className="text-sm font-medium text-slate-900">{v}</span>
                        </div>
                        <button onClick={() => {
                          const newSpecs = { ...(currentProduct.specs as Record<string, string>) };
                          delete newSpecs[k];
                          setCurrentProduct({ ...currentProduct, specs: newSpecs });
                        }} className="text-slate-300 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4 sticky bottom-0 z-10">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg"
              >
                <Save size={18} /> {currentProduct.id ? 'Update Product' : 'Add to Catalog'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
