'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { History, Target, Users, Award, ShieldCheck, Globe } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: 'Our Mission',
      description: 'To provide the best possible care environment for patients and residents through innovative technology and ergonomic design.'
    },
    {
      icon: <History className="text-blue-600" size={32} />,
      title: 'Our History',
      description: 'Since 2009, we have been a company that combines tradition with future-oriented innovation.'
    },
    {
      icon: <Users className="text-blue-600" size={32} />,
      title: 'Our People',
      description: 'Over 1,200 employees worldwide work every day to improve the lives of people in need of care.'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Founded by Gökler Group in Sivas, Turkey.' },
    { year: '2013', event: 'Expansion of production area to 45,000 m2.' },
    { year: '2015', event: 'First international design awards received.' },
    { year: '2018', event: 'Global expansion with exports to over 60 countries.' },
    { year: '2024', event: 'Launch of the next generation smart medical furniture.' }
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">About Nitrocare</h1>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              Innovation and Quality <br />
              <span className="italic text-blue-600">Since 2009.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Nitrocare is a leading manufacturer of hospital furniture and medical equipment. For over 15 years, we have been developing products that make life easier for patients and nursing staff.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="block text-4xl font-bold text-slate-900 mb-1">15+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Years Experience</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-slate-900 mb-1">1.2k</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Employees</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-slate-900 mb-1">60+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Countries</span>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/nitro-factory/1000/1200" 
              alt="Nitrocare Factory" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-sm shadow-sm border border-slate-100"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-16 text-center">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 hidden md:block" />
          <div className="space-y-12">
            {milestones.map((m, idx) => (
              <div key={m.year} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                  <div className={`p-8 bg-white border border-slate-100 rounded-sm shadow-sm max-w-md ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                    <span className="text-2xl font-bold text-blue-600 mb-2 block">{m.year}</span>
                    <p className="text-slate-600">{m.event}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm z-10 hidden md:block" />
                <div className="w-full md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400 mb-4">Quality Assurance</h2>
              <h3 className="text-4xl font-serif font-bold mb-8">Made in Turkey.</h3>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Our products are developed and manufactured in Turkey under the strictest quality standards. We are certified according to ISO 9001 and ISO 13485 for medical devices.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-400" />
                  <span className="font-bold uppercase tracking-widest text-xs">ISO 9001</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-400" />
                  <span className="font-bold uppercase tracking-widest text-xs">ISO 13485</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-blue-400" />
                  <span className="font-bold uppercase tracking-widest text-xs">Red Dot Award</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-blue-400" />
                  <span className="font-bold uppercase tracking-widest text-xs">Global Standards</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-sm overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/quality/800/600" 
                alt="Quality Control" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
