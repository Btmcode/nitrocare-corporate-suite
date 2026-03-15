import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const sections = [
    {
      title: 'Product Worlds',
      links: [
        { name: 'Hospital', href: '/products/hospital' },
        { name: 'Nursing Home', href: '/products/nursing-home' },
        { name: 'Homecare', href: '/products/homecare' },
        { name: 'All Products', href: '/products' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About us', href: '/about' },
        { name: 'Career', href: '/career' },
        { name: 'News', href: '/news' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Download Center', href: '/downloads' },
        { name: 'Contact', href: '/contact' },
      ]
    }
  ];

  return (
    <footer className="bg-[#002d5e] text-white pt-24 pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-sm">
                <span className="text-[#004a99] font-bold text-2xl">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-tighter text-white leading-none">
                  NITROCARE
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-blue-300 font-bold leading-none mt-1">
                  Medical Furniture
                </span>
              </div>
            </Link>
            <p className="text-blue-100/60 max-w-sm mb-10 leading-relaxed">
              Leading manufacturer of hospital furniture and medical equipment. Quality and innovation for more than 15 years. Engineered and manufactured in Turkey.
            </p>
            <div className="flex gap-4">
              {[Linkedin, Youtube, Instagram, Facebook].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#002d5e] transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-blue-300 mb-8">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-blue-100/70 hover:text-white transition-colors text-sm font-medium">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-blue-300 mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin size={20} className="text-blue-300 shrink-0" />
                <span className="text-sm text-blue-100/70 leading-relaxed">
                  Organize Sanayi Bölgesi,<br />
                  Sivas, Turkey
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-blue-300 shrink-0" />
                <span className="text-sm text-blue-100/70">+90 (346) 218 14 60</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-blue-300 shrink-0" />
                <span className="text-sm text-blue-100/70">info@nitrocare.com.tr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/40">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/downloads" className="hover:text-white transition-colors">Downloads</Link>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/30">
            © {new Date().getFullYear()} Nitrocare / Gökler Group.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
