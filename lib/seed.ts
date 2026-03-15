import { db } from './firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

export const seedData = async () => {
  const categories = [
    {
      id: 'hospital',
      name: 'Hospital',
      slug: 'hospital',
      description: 'Innovative beds and furniture for clinics and acute care.',
      image: 'https://picsum.photos/seed/nitro-hosp/1200/800'
    },
    {
      id: 'nursing-home',
      name: 'Nursing Home',
      slug: 'nursing-home',
      description: 'Comfort and safety for residents and nursing staff in long-term care.',
      image: 'https://picsum.photos/seed/nitro-care/1200/800'
    },
    {
      id: 'homecare',
      name: 'Homecare',
      slug: 'homecare',
      description: 'Independence and comfort in your own four walls.',
      image: 'https://picsum.photos/seed/nitro-home/1200/800'
    }
  ];

  const products = [
    {
      id: 'hb-6000',
      name: 'HB 6000',
      slug: 'hb-6000',
      categorySlug: 'hospital',
      price: 4500,
      description: 'The premium hospital bed for intensive care and general wards. The HB 6000 is the intelligent solution for modern healthcare facilities, offering maximum safety and comfort.',
      image: 'https://picsum.photos/seed/nitro-hb6000/1200/800',
      features: [
        'Lateral tilt function',
        'Integrated weighing system',
        'X-ray translucent',
        'Advanced nurse control',
        'Electric height adjustment',
        'Trendelenburg position'
      ],
      specs: {
        'External dimensions': '225 x 105 cm',
        'Mattress base': '200 x 90 cm',
        'Safe working load': '270 kg',
        'Height adjustment': '40 - 85 cm'
      },
      downloads: [
        { name: 'HB 6000 Brochure', url: '#' },
        { name: 'Technical Manual', url: '#' }
      ]
    },
    {
      id: 'hb-4000',
      name: 'HB 4000',
      slug: 'hb-4000',
      categorySlug: 'hospital',
      price: 3200,
      description: 'The efficient and reliable hospital bed for general wards. The HB 4000 combines high durability with ease of use.',
      image: 'https://picsum.photos/seed/nitro-hb4000/1200/800',
      features: [
        'Electric height adjustment',
        'Central locking castors',
        'Easy to clean',
        'Battery backup',
        'Trendelenburg position'
      ],
      specs: {
        'External dimensions': '215 x 100 cm',
        'Mattress base': '190 x 85 cm',
        'Safe working load': '230 kg',
        'Height adjustment': '45 - 80 cm'
      },
      downloads: [
        { name: 'Product Sheet', url: '#' }
      ]
    },
    {
      id: 'nts-100',
      name: 'NTS 100',
      slug: 'nts-100',
      categorySlug: 'hospital',
      price: 1800,
      description: 'The high-performance patient transfer stretcher. Designed for rapid response and safe transport within the hospital.',
      image: 'https://picsum.photos/seed/nitro-nts100/1200/800',
      features: [
        'Hydraulic height adjustment',
        'Trendelenburg position',
        'Foldable side rails',
        'Oxygen cylinder holder',
        'Central locking castors'
      ],
      specs: {
        'External dimensions': '210 x 80 cm',
        'Safe working load': '200 kg',
        'Castor diameter': '200 mm'
      },
      downloads: [
        { name: 'NTS Series Catalog', url: '#' }
      ]
    }
  ];

  const news = [
    {
      id: 'news-1',
      title: 'Nitrocare Expands Global Reach',
      slug: 'nitrocare-expands-global-reach',
      date: new Date('2026-03-14'),
      excerpt: 'Nitrocare continues its international growth with new partnerships in Southeast Asia and Latin America.',
      content: 'Nitrocare is proud to announce its expansion into new markets. Our commitment to providing high-quality medical furniture has led to significant growth in international exports...',
      image: 'https://picsum.photos/seed/nitro-news1/800/600',
      author: 'Corporate Communications',
      tags: ['Corporate', 'Global']
    },
    {
      id: 'news-2',
      title: 'Innovation Award for HB Series',
      slug: 'innovation-award-for-hb-series',
      date: new Date('2026-03-10'),
      excerpt: 'The HB 6000 series has been recognized for its innovative design and patient-centric features.',
      content: 'At the latest international medical equipment fair, Nitrocare was honored with the Innovation Award for our HB 6000 hospital bed series. The jury highlighted the lateral tilt function...',
      image: 'https://picsum.photos/seed/nitro-news2/800/600',
      author: 'Corporate Communications',
      tags: ['Award', 'Innovation']
    }
  ];

  try {
    // Seed Categories
    for (const cat of categories) {
      await setDoc(doc(db, 'categories', cat.id), cat);
    }

    // Seed Products
    for (const prod of products) {
      await setDoc(doc(db, 'products', prod.id), prod);
    }

    // Seed News
    for (const item of news) {
      await setDoc(doc(db, 'blogPosts', item.id), item);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
