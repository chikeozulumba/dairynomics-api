module.exports = {
  Payment: {
    type: 'object',
    required: ['productId', 'currency', 'amount', 'provider'],
    properties: {
      productId: {
        type: 'string',
        format: 'UUID',
        minimum: 1,
        example: 1,
      },
      amount: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      currency: {
        type: 'string',
        enum: ['KES'],
      },
      provider: {
        type: 'string',
        enum: ['M-Pesa'],
      },
      createdAt: {
        type: 'date',
        format: 'date-time',
      },
      updatedAt: {
        type: 'date',
        format: 'date-time',
      },
    },
  },
  PaymentCreate: {
    type: 'object',
    required: ['productId', 'amount'],
    properties: {
      productId: {
        type: 'string',
        format: 'UUID',
        minimum: 1,
        example: 1,
      },
      amount: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      currency: {
        type: 'string',
        enum: ['KES'],
      },
      provider: {
        type: 'string',
        enum: ['M-Pesa'],
      },
    },
  },
}
