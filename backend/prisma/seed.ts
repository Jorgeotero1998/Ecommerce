import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: { email: 'admin@ind.store', password: hash, name: 'ADMIN_UNIT_01' }
  });

  const categories = ['Hardware', 'Security', 'Interface', 'Energy', 'Robotics'];
  const images = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=500',
    'https://images.unsplash.com/photo-1591405351990-4726e33df58d?q=80&w=500',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500'
  ];

  console.log('Generating 500 industrial assets...');

  // Definimos el tipo explícitamente para evitar el error de 'never'
  const products: any[] = [];
  
  for (let i = 1; i <= 500; i++) {
    products.push({
      name: `ASSET_ID_${i.toString().padStart(3, '0')}`,
      description: `High-performance industrial component grade-${Math.floor(Math.random() * 10)}. Optimized for high-scale operations.`,
      price: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,
      stock: Math.floor(Math.random() * 50) + 1,
      category: categories[Math.floor(Math.random() * categories.length)],
      images: [images[Math.floor(Math.random() * images.length)]]
    });
  }

  await prisma.product.createMany({ data: products });
}

main()
  .then(() => console.log('SEED_SUCCESS: 500 Products Generated'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());