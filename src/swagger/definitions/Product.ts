const productProperties = [
  'productId',
  'productName',
  'price',
  'description',
  'photos',
  'userId',
  'categoryId',
  'countyId',
]

const productObject = {
  productId: {
    type: 'string',
    format: 'uuid',
  },
  categoryId: {
    type: 'number',
  },
  countyId: {
    type: 'number',
  },
  userId: {
    type: 'number',
  },
  productName: {
    type: 'string',
  },
  price: {
    type: 'integer',
  },
  description: {
    type: 'string',
  },
  photos: {
    type: 'array',
  },
  createdAt: {
    type: 'date',
    format: 'date-time',
  },
  updatedAt: {
    type: 'date',
    format: 'date-time',
  },
}

module.exports = {
  Product: {
    type: 'object',
    required: productProperties,
    properties: {
      ...productObject,
    },
  },
  Products: {
    type: 'array',
    required: productProperties,
    properties: [productObject],
  },
  ProductCreate: {
    type: 'object',
    required: productProperties,
    properties: {
      productId: {
        type: 'string',
        format: 'uuid',
      },
      categoryId: {
        type: 'number',
      },
      countyId: {
        type: 'number',
      },
      userId: {
        type: 'number',
      },
      productName: {
        type: 'string',
      },
      price: {
        type: 'integer',
      },
      description: {
        type: 'string',
      },
      photos: {
        type: 'array',
      },
    },
  },
  ProductUpdate: {
    type: 'object',
    properties: {
      ...productObject,
    },
  },
}
