import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'test@gmail.com' },
    update: { password: 'testtest' },
    create: {
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'testtest',
    },
  });

  console.log('Seed complete: test user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
