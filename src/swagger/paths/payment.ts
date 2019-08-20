module.exports = {
  '/payment': {
    post: {
      tags: ['payment'],
      summary: 'Make a new payment',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'body',
          description: 'Payment object needed to process the payment',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/PaymentCreate',
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
      tags: ['payment'],
      summary: 'Retrieve all payments',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        $ref: '#/definitions/PaymentCreate',
      },
      responses: {
        '401': {
          description: 'Unauthorized access',
          example: {
            status: 401,
            message: 'Unauthoorized Access',
          },
        },
      },
    },
  },
  '/payment/{id}': {
    put: {
      tags: ['payment'],
      summary: 'Update a single payment',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Payment ID',
          required: true,
        },
        {
          in: 'body',
          name: 'body',
          description: 'Payment object with the amount only',
          required: true,
          schema: {
            amount: {
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
      tags: ['payment'],
      summary: 'Retrieve a single payment',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Payment ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          descrition: 'Payment retrieved successfully',
          example: {
            status: 200,
            payment: '#/definitions/Payment',
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
          description: 'Payment not found',
          example: {
            status: 404,
            message: 'Payment not found',
          },
        },
      },
    },
  },
}
