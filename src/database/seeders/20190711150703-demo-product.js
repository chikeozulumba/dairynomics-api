module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'products',
      [
        {
          id: '351043bb-3460-4937-902c-e450ab2afc47',
          categoryId: 3,
          productName: 'test-product',
          price: 202,
          countyId: 3,
          photos: ['abcd.jpg', 'abcdef.jpg'],
          description: 'zxcv',
          userId: 1923,
          updatedAt: '2019-07-01T06:51:46.357Z',
          createdAt: '2019-07-01T06:51:46.357Z',
        },
        {
          id: '351043bb-3460-4937-902c-e450ab2afc48',
          categoryId: 3,
          productName: 'test-product',
          price: 202,
          countyId: 3,
          photos: ['abcd.jpg', 'abcdef.jpg'],
          description: 'zxcv',
          userId: 1923,
          updatedAt: '2019-07-01T06:51:46.357Z',
          createdAt: '2019-07-01T06:51:46.357Z',
        },
      ],
      {},
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('products', null, {})
  },
}
