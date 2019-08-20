module.exports = {
  ProductCategory: {
    type: 'object',
    required: ['name'],
    properties: {
      productCategoryID: {
        type: 'string',
        format: 'uuid',
      },
      name: {
        type: 'string',
        minimum: 3,
        maximum: 20,
      },
      description: {
        type: 'string',
        minimum: 10,
        maximum: 100,
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
  productCategoryAdd: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minimum: 3,
        example: 10,
      },
      description: {
        type: 'string',
        minimum: 10,
        example: 100,
      },
    },
  },
  productCategoryUpdate: {
    type: 'object',
    required: ['name'],
    properties: {
      name: {
        type: 'string',
        minimum: 3,
        example: 10,
      },
      description: {
        type: 'string',
        minimum: 10,
        example: 100,
      },
    },
  },
  productCategoryDelete: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
  },
}
