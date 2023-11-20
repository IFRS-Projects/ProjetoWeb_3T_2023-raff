"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function main() {
    const jsonArray = [];
    for (let i = 0; i < 15; i++) {
        const json = {
            title: faker_1.faker.lorem.slug(),
            description: faker_1.faker.lorem.text(),
            love_amount: faker_1.faker.number.int({ min: -10, max: 20 }),
            image_url: 'http://127.0.0.1:4000/img/1698900344725-bcefb3aa-5b9b-45a9-91ae-6d457e4eca1c.png',
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
//# sourceMappingURL=seed.js.map