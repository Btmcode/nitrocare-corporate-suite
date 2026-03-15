'use client';

import React, { useState, useEffect } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Share2, Shield, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { getSettings, updateSetting } from '@/lib/actions/db-actions';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Nitrocare',
    siteDescription: 'Professional Medical Furniture & Equipment',
    contactEmail: 'info@nitrocare.com.tr',
    contactPhone: '+90 222 236 02 00',
    address: 'Eskisehir OSB 22. Cadde No: 7 Eskisehir / TURKIYE',
    socialMedia: {
      facebook: '',
      linkedin: '',
      instagram: '',
      youtube: ''
    },
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        if (data && data.general) {
          setSettings(data.general);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSetting('general', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Site Settings</h1>
        <p className="text-slate-500">Configure global metadata and contact information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">General Identity</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Site Name</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tagline / Description</label>
              <textarea 
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full border border-slate-200 rounded-sm p-3 h-24 focus:outline-none focus:border-blue-600 transition-colors resize-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Contact Details</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Public Email</label>
              <input 
                type="email" 
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
                placeholder="info@nitrocare.com.tr"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</label>
              <input 
                type="text" 
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full border border-slate-200 rounded-sm p-3 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Office Address</label>
              <textarea 
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full border border-slate-200 rounded-sm p-3 h-20 focus:outline-none focus:border-blue-600 transition-colors resize-none text-sm"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Social Presence</h2>
          </div>
          
          <div className="space-y-4">
            {Object.keys(settings.socialMedia).map((platform) => (
              <div key={platform} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{platform}</label>
                <input 
                  type="text" 
                  value={(settings.socialMedia as any)[platform]}
                  onChange={(e) => setSettings({ 
                    ...settings, 
                    socialMedia: { ...settings.socialMedia, [platform]: e.target.value } 
                  })}
                  className="w-full border border-slate-200 rounded-sm p-2 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                  placeholder={`https://${platform}.com/nitrocare`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900">System Control</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm">
              <div>
                <p className="text-sm font-bold text-slate-900">Maintenance Mode</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Public site will be disabled</p>
              </div>
              <button 
                onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-sm flex gap-3">
              <Bell className="text-blue-600 shrink-0" size={18} />
              <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
                Settings saved here will affect the global configuration of the website, including SEO tags and contact form recipients. Managed via SQLite.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
        >
          <Save size={20} /> {saving ? 'Saving...' : 'Save Site Settings'}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
