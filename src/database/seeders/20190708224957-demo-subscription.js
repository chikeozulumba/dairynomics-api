'use strict'

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'subscriptions',
      [
        {
          id: 'be44b0ed-7538-4600-9b73-7ae4dd75837b',
          userId: 2174,
          dueDate: '2019-10-07T14:36:43.645Z',
          createdAt: '2019-07-07T14:35:43.663Z',
          updatedAt: '2019-07-07T14:35:43.663Z',
        },
        {
          id: 'be44b0ed-7548-4690-9b73-7ae4dd75837b',
          userId: 1878,
          dueDate: '2019-06-07T14:36:43.663Z',
          createdAt: '2019-07-07T14:35:43.663Z',
          updatedAt: '2019-07-07T14:35:43.663Z',
        },
      ],
      {},
    )
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('subscriptions', null, {})
  },
}
