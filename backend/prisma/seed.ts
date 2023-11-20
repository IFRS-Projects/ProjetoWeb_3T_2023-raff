import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
async function main() {
  const jsonArray = [];

  for (let i = 0; i < 15; i++) {
    const json = {
      title: faker.lorem.slug(),
      description: faker.lorem.text(),
      love_amount: faker.number.int({ min: -10, max: 20 }),
      image_url:
        'http://127.0.0.1:4000/img/1698900344725-bcefb3aa-5b9b-45a9-91ae-6d457e4eca1c.png',
    };

    jsonArray.push(json);
  }

  console.log(jsonArray);
  await prisma.movies.createMany({
    data: jsonArray,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
