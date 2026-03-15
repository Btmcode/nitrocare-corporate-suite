'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Award, Globe, ShieldCheck, Zap, Play, ArrowUpRight } from 'lucide-react';
import ProductCarousel from '@/components/home/ProductCarousel';

export default function HomePage() {
  const categories = [
    {
      title: 'Hospital',
      subtitle: 'Acute Care',
      description: 'Innovative beds and furniture for clinics and hospitals.',
      image: 'https://picsum.photos/seed/nitro-hosp/1200/800',
      href: '/products/hospital'
    },
    {
      title: 'Nursing Home',
      subtitle: 'Long-term Care',
      description: 'Comfort and safety for residents and nursing staff.',
      image: 'https://picsum.photos/seed/nitro-care/1200/800',
      href: '/products/nursing-home'
    },
    {
      title: 'Homecare',
      subtitle: 'Private Care',
      description: 'Independence and comfort in your own four walls.',
      image: 'https://picsum.photos/seed/nitro-home/1200/800',
      href: '/products/homecare'
    }
  ];

  const highlights = [
    {
      icon: <Award className="text-[#004a99]" size={32} />,
      title: '15+ Years',
      description: 'Tradition and experience since 2009.'
    },
    {
      icon: <Globe className="text-[#004a99]" size={32} />,
      title: 'Global Presence',
      description: 'Present in over 60 countries worldwide.'
    },
    {
      icon: <ShieldCheck className="text-[#004a99]" size={32} />,
      title: 'Turkish Quality',
      description: 'Engineered and manufactured in Turkey.'
    },
    {
      icon: <Zap className="text-[#004a99]" size={32} />,
      title: 'Innovation Leader',
      description: 'Leading the market with smart digital solutions.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/nitro-hero/1920/1080" 
            alt="Nitrocare Hero" 
            fill 
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002d5e]/80 via-[#002d5e]/40 to-transparent" />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.5em] text-blue-300 mb-6">
                Quality for Better Care
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[0.9] mb-8">
                Innovating <br />
                <span className="text-blue-400 italic">Healthcare.</span>
              </h1>
              <p className="text-xl text-blue-50/80 mb-12 max-w-xl leading-relaxed">
                We develop pioneering solutions for hospitals and care facilities that set new standards in safety, comfort, and efficiency.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/products" className="btn-primary group">
                  Discover Products <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-[#004a99]">
                  Our Mission
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-12 right-12 hidden lg:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Featured Product</span>
            <span className="text-sm font-bold text-white">HB 6000 Hospital Bed</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#004a99] transition-all cursor-pointer">
            <Play size={16} fill="currentColor" />
          </div>
        </div>
      </section>

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Product Worlds - Bento Grid Style */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#004a99] mb-4 block">Product Worlds</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#002d5e] leading-tight">
                Tailored solutions for every care environment.
              </h2>
            </div>
            <Link href="/products" className="group flex items-center gap-3 text-[#004a99] font-bold uppercase tracking-widest text-xs border-b-2 border-[#004a99]/10 pb-2 hover:border-[#004a99] transition-all">
              Explore All Solutions <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[700px]">
            {/* Hospital - Large Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative group overflow-hidden rounded-sm shadow-2xl"
            >
              <Image 
                src={categories[0].image} 
                alt={categories[0].title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d5e] via-[#002d5e]/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300 mb-2 block">{categories[0].subtitle}</span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{categories[0].title}</h3>
                <p className="text-blue-100/70 max-w-md mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {categories[0].description}
                </p>
                <Link href={categories[0].href} className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-[10px] bg-[#004a99] px-6 py-3 hover:bg-white hover:text-[#004a99] transition-all">
                  View Products <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Nursing Home */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative flex-1 group overflow-hidden rounded-sm shadow-xl"
              >
                <Image 
                  src={categories[1].image} 
                  alt={categories[1].title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002d5e] via-[#002d5e]/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300 mb-2 block">{categories[1].subtitle}</span>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">{categories[1].title}</h3>
                  <Link href={categories[1].href} className="text-white font-bold uppercase tracking-widest text-[10px] border-b border-white/30 pb-1 hover:border-white transition-all">
                    Explore <ArrowRight size={12} className="inline ml-1" />
                  </Link>
                </div>
              </motion.div>

              {/* Homecare */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative flex-1 group overflow-hidden rounded-sm shadow-xl"
              >
                <Image 
                  src={categories[2].image} 
                  alt={categories[2].title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002d5e] via-[#002d5e]/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-300 mb-2 block">{categories[2].subtitle}</span>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">{categories[2].title}</h3>
                  <Link href={categories[2].href} className="text-white font-bold uppercase tracking-widest text-[10px] border-b border-white/30 pb-1 hover:border-white transition-all">
                    Explore <ArrowRight size={12} className="inline ml-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section - Modern Split */}
      <section className="py-32 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-sm overflow-hidden shadow-2xl z-10">
                <Image 
                  src="https://picsum.photos/seed/nitro-innov/1000/1000" 
                  alt="Innovation" 
                  fill 
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#004a99] -z-0 opacity-10 rounded-full blur-3xl" />
              <div className="absolute -top-12 -left-12 w-48 h-48 border-2 border-[#004a99]/10 -z-0" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#004a99] mb-6 block">Future of Care</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002d5e] mb-8 leading-tight">
                Smart solutions for the digital age.
              </h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                From digital assistance systems to ergonomic designs, we are constantly working on the future of care. Our goal is to relieve the burden on nursing staff and increase the well-being of patients through intelligent technology.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {highlights.map((item, idx) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h5 className="font-bold text-[#002d5e] mb-2">{item.title}</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Highlight */}
      <section className="relative py-32 bg-[#002d5e] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-blue-300 mb-6 block">Product Highlight</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                The Evario <br />
                <span className="text-blue-400 italic">Hospital Furniture.</span>
              </h2>
              <p className="text-xl text-blue-100/70 mb-10 leading-relaxed">
                A versatile solution for all hospital areas. With its intelligent control concepts and high safety standards, it supports both patients and staff in their daily lives.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  'Integrated digital assistance systems',
                  'Excellent hygiene properties with easy-to-clean surfaces',
                  'Intuitive operation for nursing staff',
                  'Protega safety sides for maximum protection'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-4 text-blue-50">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/products/hospital/evario" className="btn-primary !bg-white !text-[#002d5e] hover:!bg-blue-400 hover:!text-white">
                View Technical Details <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <Image 
                  src="https://picsum.photos/seed/nitro-hb6000/1200/800" 
                  alt="HB 6000 Bed" 
                  width={1200}
                  height={800}
                  className="rounded-sm shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* News Section - Editorial Style */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#004a99] mb-4 block">Updates</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002d5e]">Latest from Nitrocare</h2>
            </div>
            <Link href="/news" className="group flex items-center gap-2 text-[#004a99] font-bold uppercase tracking-widest text-xs">
              All News Articles <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                date: 'March 14, 2026',
                title: 'Award-winning start to life',
                excerpt: 'The Jovie newborn cot receives the prestigious Red Dot Design Award.',
                image: 'https://picsum.photos/seed/nitro-news1/800/600'
              },
              {
                date: 'March 10, 2026',
                title: 'New production facility opened',
                excerpt: 'Nitrocare continues to invest in the future and expands its capacities.',
                image: 'https://picsum.photos/seed/nitro-news2/800/600'
              },
              {
                date: 'March 05, 2026',
                title: 'Sustainability Report 2025',
                excerpt: 'Discover our progress towards a more sustainable future in healthcare.',
                image: 'https://picsum.photos/seed/nitro-news3/800/600'
              }
            ].map((news, idx) => (
              <motion.div 
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] mb-8 overflow-hidden rounded-sm">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#002d5e]/0 group-hover:bg-[#002d5e]/10 transition-colors duration-500" />
                </div>
                <span className="text-[10px] font-bold text-[#004a99] uppercase tracking-[0.2em] mb-4 block">{news.date}</span>
                <h4 className="text-2xl font-serif font-bold text-[#002d5e] mb-4 group-hover:text-[#004a99] transition-colors leading-tight">
                  {news.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {news.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#002d5e] border-b border-[#002d5e]/20 pb-1 group-hover:border-[#002d5e] transition-all">
                  Read Article <ArrowRight size={12} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence - Map Style */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-6 block">Global Network</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                At home in <br />
                <span className="text-blue-400 italic">the whole world.</span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                With subsidiaries and partners in over 60 countries, we are always close to our customers. Our global network ensures fast service and expert advice.
              </p>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <span className="text-5xl font-serif font-bold text-white block mb-2">60+</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Countries</span>
                </div>
                <div>
                  <span className="text-5xl font-serif font-bold text-white block mb-2">10</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Subsidiaries</span>
                </div>
              </div>
              <Link href="/contact" className="btn-outline !border-white/20 !text-white hover:!bg-white hover:!text-slate-900 mt-12">
                Find Your Local Partner
              </Link>
            </div>
            <div className="relative opacity-30 lg:opacity-100">
              <Image 
                src="https://picsum.photos/seed/nitro-map/1000/600" 
                alt="World Map" 
                width={1000}
                height={600}
                className="w-full h-auto grayscale invert opacity-20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#002d5e] mb-10 leading-tight">
              Ready to improve <br />your care facility?
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our experts are ready to help you find the perfect solution for your specific needs. Let&apos;s work together for better care.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="btn-primary">
                Contact Our Sales Team
              </Link>
              <Link href="/products" className="btn-outline">
                Browse Product Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
