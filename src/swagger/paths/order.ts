// test
module.exports = {
  '/order': {
    post: {
      tags: ['order'],
      summary: 'Place an order',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'body',
          description: 'Order object needed to process the order',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/OrderPlace',
      },
      responses: {
        '400': {
          description: 'Bad Request',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    get: {
      tags: ['order'],
      summary: 'Retrieve all orders',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        $ref: '#/definitions/OrderPlace',
      },
      responses: {
        '401': {
          description: 'Unauthorized access',
          example: {
            status: 401,
            message: 'Unauthorized Access',
          },
        },
      },
    },
  },
  '/order/{id}': {
    put: {
      tags: ['order'],
      summary: 'Update an order',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Order ID',
          required: true,
        },
        {
          in: 'body',
          name: 'body',
          description: 'Order object with the amount and the quantity',
          required: true,
          schema: {
            amount: {
              type: 'number',
              format: 'integer',
            },
            quantity: {
              type: 'number',
              format: 'integer',
            },
          },
        },
      ],
      responses: {
        '400': {
          description: 'Bad Request',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    get: {
      tags: ['order'],
      summary: 'Retrieve an order',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Order ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'Order retrieved successfully',
          example: {
            status: 200,
            order: '#/definitions/Order',
          },
        },
        '401': {
          description: 'Unauthorized access',
          example: {
            status: 401,
            message: 'Unauthorized access',
          },
        },
        '404': {
          description: 'Order not found',
          example: {
            status: 404,
            message: 'Order not found',
          },
        },
      },
    },
  },
  '/order/{userId}': {
    get: {
      tags: ['order'],
      summary: 'Retrieve the orders made by user',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'User ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'Orders retrieved successfully',
          example: {
            status: 200,
            order: '#/definitions/Order',
          },
        },
        '401': {
          description: 'Unauthorized access',
          example: {
            status: 401,
            message: 'Unauthorized access',
          },
        },
        '404': {
          description: 'Order not found',
          example: {
            status: 404,
            message: 'Orders not foud',
          },
        },
      },
    },
  },
}
