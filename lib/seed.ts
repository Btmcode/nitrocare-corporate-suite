import prisma from './prisma';
import { hash } from 'bcryptjs';

export const seedData = async () => {
  // Check if already seeded
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  
  if (productCount > 0 && categoryCount > 0) {
    console.log('Data already seeded. Skipping.');
    return;
  }

  const categories = [
    {
      id: 'hospital',
      name: 'Hospital',
      slug: 'hospital',
      description: 'Innovative hospital beds, intensive care beds, and paediatric furniture.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/1/6/csm_navigation-evario_01_0159aeda9f.webp'
    },
    {
      id: 'nursing-home',
      name: 'Nursing Home',
      slug: 'nursing-home',
      description: 'Beds and furniture designed for long-term care facilities, emphasizing safety.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/c/5/csm_Stiegelmeyer-Evario-one-FS-Titel_0035_b2bc7c63d5.webp'
    },
    {
      id: 'homecare',
      name: 'Homecare',
      slug: 'homecare',
      description: 'Comfortable and functional beds for private home care settings.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/b/2/csm_Puro_weiss_c808c184a2.webp'
    }
  ];

  const products = [
    {
      id: 'evario',
      name: 'Evario',
      slug: 'evario',
      categorySlug: 'hospital',
      price: 4800,
      description: 'The Evario hospital bed is distinguished by innovative control units, high level of safety and comfort, and excellent hygiene properties.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/1/6/csm_navigation-evario_01_0159aeda9f.webp',
      features: JSON.stringify([
        'Innovative control units',
        'High level of safety',
        'Excellent hygiene properties',
        'Ergonomic design'
      ]),
      specs: JSON.stringify({
        'Safe working load': '270 kg',
        'Height adjustment': '32 - 91 cm'
      })
    },
    {
      id: 'evario-one',
      name: 'Evario one',
      slug: 'evario-one',
      categorySlug: 'hospital',
      price: 4200,
      description: 'The Evario one is our versatile hospital bed that offers high quality at an attractive price.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/c/5/csm_Stiegelmeyer-Evario-one-FS-Titel_0035_b2bc7c63d5.webp',
      features: JSON.stringify(['High quality', 'Attractive price', 'Versatile use']),
      specs: JSON.stringify({
        'Max patient weight': '220 kg',
        'Casters': '125 mm'
      })
    },
    {
      id: 'puro',
      name: 'Puro',
      slug: 'puro',
      categorySlug: 'hospital',
      price: 3900,
      description: 'The Puro sets high standards in hygiene, ease of use, comfort, and modern design.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/b/2/csm_Puro_weiss_c808c184a2.webp',
      features: JSON.stringify(['Hygiene standards', 'Comfortable positioning', 'Modern design']),
      specs: JSON.stringify({
        'Safe working load': '260 kg',
        'Total length': '218 cm'
      })
    },
    {
      id: 'sicuro-tera',
      name: 'Sicuro tera',
      slug: 'sicuro-tera',
      categorySlug: 'hospital',
      price: 8500,
      description: 'The Sicuro tera intensive care bed supports optimal patient positioning and care in critical settings.',
      image: 'https://www.nitrocare.com.tr/fileadmin/_processed_/7/f/csm_Stiegelmeyer-Sicuro-tera-FS-Titel-1_SLT_c77732e4f9.webp',
      features: JSON.stringify(['Critical care support', 'Optimal positioning', 'Integrated scale']),
      specs: JSON.stringify({
        'Lateral tilting': 'upto 25°',
        'Safe working load': '280 kg'
      })
    }
  ];

  // Seed Admin User
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@nitrocare.com.tr';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const hashedPassword = await hash('admin123', 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        isAdmin: true
      }
    });
    console.log('Admin user created:', adminEmail);
  }

  // Seed Categories
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }
  console.log('Categories seeded');

  // Seed Products
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }
  console.log('Products seeded');

  // Seed Settings
  await prisma.setting.upsert({
    where: { key: 'siteConfig' },
    update: { value: JSON.stringify({ name: 'Nitrocare', description: 'Innovative Medical Solutions' }) },
    create: { key: 'siteConfig', value: JSON.stringify({ name: 'Nitrocare', description: 'Innovative Medical Solutions' }) }
  });

  console.log('Seeding completed successfully');
};
