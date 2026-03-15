import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@nitrocare.com.tr';
  const adminPassword = await hash('admin123', 12);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: adminPassword,
        isAdmin: true,
      },
    });
    console.log(`✅ Default admin created. Email: ${adminEmail} | Password: admin123`);
  } else {
    console.log(`ℹ️ Admin user already exists. Email: ${adminEmail}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
