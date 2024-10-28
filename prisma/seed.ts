import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: adminPassword,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: 'User One',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: 'User Two',
      password: hashedPassword,
    },
  });

  const image1 = await prisma.image.create({
    data: {
      url: 'https://example.com/image1.jpg',
      userId: user1.id,
    },
  });

  const image2 = await prisma.image.create({
    data: {
      url: 'https://example.com/image2.jpg',
      userId: user2.id,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        text: 'Great image!',
        userId: user2.id,
        imageId: image1.id,
      },
      {
        text: 'Nice shot!',
        userId: user1.id,
        imageId: image2.id,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
