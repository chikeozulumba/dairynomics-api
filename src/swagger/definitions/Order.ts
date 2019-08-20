module.exports = {
  Order: {
    type: 'object',
    required: ['id', 'userId'],
    properties: {
      id: {
        type: 'string',
        enum: ['UUID'],
      },
      userId: {
        type: 'string',
        enum: ['UUID'],
      },
      amount: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      quantity: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      orderItems: {
        type: 'array',
        format: 'array of objects',
        example: [
          {
            productId: 'UUID',
            quantity: 1,
          },
        ],
      },
      status: {
        type: 'string',
        enum: ['paid', 'pending', 'aborted'],
      },
      comments: { type: 'string' },
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
  OrderPlace: {
    type: 'object',
    required: ['userId', 'quantity', 'amount'],
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
      amount: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      quantity: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
      orderItems: {
        type: 'array',
        format: 'array of objects',
        example: [
          {
            productId: 'UUID',
            quantity: 1,
          },
        ],
      },
    },
  },
}
