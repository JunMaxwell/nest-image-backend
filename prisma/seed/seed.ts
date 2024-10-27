import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      name: 'User One',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      name: 'User Two',
    },
  });

  // Create images
  const image1 = await prisma.image.create({
    data: {
      url: 'https://example.com/image1.jpg',
    },
  });

  const image2 = await prisma.image.create({
    data: {
      url: 'https://example.com/image2.jpg',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post',
      userId: user1.id,
      imageId: image1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the second post',
      userId: user2.id,
      imageId: image2.id,
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Great post!',
      userId: user1.id,
      imageId: image1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      content: 'Nice image!',
      userId: user2.id,
      imageId: image2.id,
    },
  });

  console.log({
    user1,
    user2,
    image1,
    image2,
    post1,
    post2,
    comment1,
    comment2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
