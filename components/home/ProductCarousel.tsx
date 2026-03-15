'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 1,
    title: 'Modern Hospital Suites',
    description: 'Ergonomic design meets advanced medical technology for superior patient care.',
    image: 'https://picsum.photos/seed/nitro-carousel-1/1920/1080',
    tag: 'Hospital Solutions'
  },
  {
    id: 2,
    title: 'Premium Care Facilities',
    description: 'Creating a homely atmosphere with professional-grade medical functionality.',
    image: 'https://picsum.photos/seed/nitro-carousel-2/1920/1080',
    tag: 'Nursing Home'
  },
  {
    id: 3,
    title: 'Intensive Care Excellence',
    description: 'Precision-engineered beds for the most demanding clinical environments.',
    image: 'https://picsum.photos/seed/nitro-carousel-3/1920/1080',
    tag: 'ICU Solutions'
  }
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] bg-slate-900 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <Image
            src={carouselItems[currentIndex].image}
            alt={carouselItems[currentIndex].title}
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          
          <div className="container-custom relative h-full flex items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1 mb-6">
                  {carouselItems[currentIndex].tag}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                  {carouselItems[currentIndex].title}
                </h2>
                <p className="text-xl text-slate-200 mb-10 leading-relaxed">
                  {carouselItems[currentIndex].description}
                </p>
                <Link href="/products" className="btn-primary group">
                  View Solutions <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-12 flex gap-3 z-20">
        {carouselItems.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1 transition-all duration-500 ${
              currentIndex === i ? 'w-12 bg-blue-600' : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
