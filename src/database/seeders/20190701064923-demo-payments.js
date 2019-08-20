module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'payments',
      [
        {
          id: '351043bb-3460-4937-902c-e450ab2afc47',
          currency: 'KES',
          provider: 'M-Pesa',
          status: 'pending',
          amount: '200',
          productId: '351043bb-3460-4937-902c-e450ab2afc46', // First Base Product ID
          userId: 1923, // First Base User ID
          updatedAt: '2019-07-01T06:51:46.357Z',
          createdAt: '2019-07-01T06:51:46.357Z',
        },
        {
          id: '2dc3cec6-f6a1-43d2-ac90-d22ea0897083',
          currency: 'KES',
          provider: 'M-Pesa',
          status: 'pending',
          amount: '200',
          productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081', // Second Base Product ID
          userId: 1924, // Second Base User ID
          updatedAt: '2019-07-01T06:51:46.357Z',
          createdAt: '2019-07-01T06:51:46.357Z',
        },
      ],
      {},
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('payments', null, {})
  },
}
