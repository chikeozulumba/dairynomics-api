module.exports = {
  Cart: {
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      quantity: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
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
  CartAdd: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: {
        type: 'integer',
        format: 'int64',
        minimum: 1,
        example: 1,
      },
      quantity: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
    },
  },
  CartUpdate: {
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
      productId: {
        type: 'integer',
        format: 'int64',
        minimum: 1,
        example: 1,
      },
      quantity: {
        type: 'number',
        format: 'integer',
        minimum: 1,
        example: 10,
      },
    },
  },
}
