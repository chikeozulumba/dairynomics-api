module.exports = {
  '/subscriptions': {
    post: {
      tags: ['subscriptions'],
      summary: 'Subscribe on the platform',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'userId',
          description: 'User Id',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'Service provider subscription',
          example: {
            status: 201,
            message: 'You are subscribed on the Dairynomics Platform',
          },
        },
        '400': {
          description: 'Service provider subscription of existing user',
          example: {
            status: 400,
            message: 'User is already subscribed on the Dairynomics Platform',
          },
        },
      },
    },
    get: {
      tags: ['subscriptions'],
      summary: 'Retrieve all subscriptions',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      responses: {
        '200': {
          description: 'All subscriptions fetched',
          example: {
            status: 200,
            serviceproviderSubscriptions: [
              {
                id: 'f2e6e85b-21db-4746-8900-902497d9c43d',
                userId: 2,
                plan: 'silver',
                dueDate: '2020-01-10T10:02:06.633Z',
                createdAt: '2019-07-10T10:00:13.129Z',
                updatedAt: '2019-07-10T10:02:06.646Z',
              },
            ],
          },
        },
      },
    },
  },

  '/subscriptions/user': {
    patch: {
      tags: ['subscription'],
      summary: 'Upgrade subscription plan',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'userId',
          description: 'User Id',
          required: true,
        },
        {
          in: 'body',
          name: 'plan',
          description: 'Subsription plan',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'Successful upgrade',
          example: {
            status: 200,
            message: 'You have upgraded to the ${plan} plan',
          },
        },
        '400': {
          description: 'Subscription of non-existing user',
          example: {
            status: 400,
            message: 'You are not subscribed on the Dairynomics Platform',
          },
        },
      },
    },
    get: {
      tags: ['subscription'],
      summary: 'Fetch user subscription',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'userId',
          description: 'User Id',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'User subscription fetched',
          example: {
            status: 200,
            subscribed: [
              {
                id: 'f2e6e85b-21db-4746-8900-902497d9c43d',
                userId: 2,
                plan: 'silver',
                dueDate: '2020-01-10T10:02:06.633Z',
                createdAt: '2019-07-10T10:00:13.129Z',
                updatedAt: '2019-07-10T10:02:06.646Z',
                expirationDays: 183,
              },
            ],
          },
        },
        '400': {
          description: 'Service provider subscription of non-existing user',
          example: {
            status: 400,
            message: 'You are not subscribed on the Dairynomics Platform',
          },
        },
      },
    },
    delete: {
      tags: ['subscription'],
      summary: 'Unsubscribe from the platform',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'userId',
          description: 'User Id',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'User subscription fetched',
          example: {
            status: 200,
            message: 'You have unsubscribed from the Dairynomics Platform',
          },
        },
        '400': {
          description: 'Service provider subscription of non-existing user',
          example: {
            status: 400,
            message: 'You are not subscribed on the Dairynomics Platform',
          },
        },
      },
    },
  },
}
