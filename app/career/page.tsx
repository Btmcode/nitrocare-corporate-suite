'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap, Award } from 'lucide-react';

const CareerPage = () => {
  const jobs = [
    { title: 'Senior Product Designer', location: 'Sivas, Turkey', type: 'Full-time', department: 'R&D' },
    { title: 'Sales Manager International', location: 'Remote / Europe', type: 'Full-time', department: 'Sales' },
    { title: 'Production Engineer', location: 'Sivas, Turkey', type: 'Full-time', department: 'Operations' },
    { title: 'Customer Support Specialist', location: 'Istanbul, Turkey', type: 'Part-time', department: 'Service' },
  ];

  const benefits = [
    { icon: <Heart className="text-blue-600" />, title: 'Health & Wellness', desc: 'Comprehensive health programs and modern workplace ergonomics.' },
    { icon: <Zap className="text-blue-600" />, title: 'Innovation', desc: 'Work with state-of-the-art technology in a future-oriented industry.' },
    { icon: <Users className="text-blue-600" />, title: 'Team Spirit', desc: 'A family-owned company culture with flat hierarchies.' },
    { icon: <Award className="text-blue-600" />, title: 'Development', desc: 'Individual training and career advancement opportunities.' },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 mb-4">Careers</h1>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              Shape the Future <br />
              <span className="italic text-blue-600">of Healthcare.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Become part of a team that develops solutions for the most important people in the world: those in need of care and those who care for them.
            </p>
            <button className="bg-blue-600 text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2">
              View Open Positions <ArrowRight size={20} />
            </button>
          </div>
          <div className="relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/nitro-career/1000/800" 
              alt="Career at Nitrocare" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Why Nitrocare?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We offer more than just a job. We offer a meaningful career in a stable, family-owned company.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-sm shadow-sm border border-slate-100"
              >
                <div className="mb-6 w-12 h-12 bg-blue-50 flex items-center justify-center rounded-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Open Positions</h2>
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{jobs.length} Jobs found</span>
        </div>
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-100 p-8 rounded-sm hover:border-blue-200 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 block">{job.department}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                  <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {job.type}</span>
                </div>
              </div>
              <button className="bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-900 px-8 py-4 rounded-sm font-bold uppercase tracking-widest transition-all">
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture CTA */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        <Image 
          src="https://picsum.photos/seed/culture/1920/800" 
          alt="Company Culture" 
          fill 
          className="object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-3xl px-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Join our family.</h2>
          <p className="text-xl text-slate-200 mb-10">
            We are always looking for talented people who want to make a difference. If you don&apos;t find a suitable position, feel free to send us a speculative application.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-slate-900 px-10 py-5 rounded-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
          >
            Send Application
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
