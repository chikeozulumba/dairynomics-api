const faker = require('faker')
const randomFloat = Math.floor(Math.random() * (1000 - 100) + 100) / 100

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: '351043bb-3460-4937-902c-e450ab2afc46',
          userId: 1923,
          categoryId: faker.random.number(),
          productName: faker.lorem.words(),
          countyId: faker.random.number(),
          description: faker.lorem.text(),
          quantity: faker.random.number(),
          price: randomFloat,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
          userId: 1924,
          categoryId: faker.random.number(),
          productName: faker.lorem.words(),
          countyId: faker.random.number(),
          description: faker.lorem.text(),
          quantity: faker.random.number(),
          price: randomFloat,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {},
    )
  },

  down: queryInterface => queryInterface.bulkDelete('products', null, {}),
}
