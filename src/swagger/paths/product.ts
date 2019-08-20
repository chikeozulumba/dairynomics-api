module.exports = {
  '/products': {
    post: {
      tags: ['product'],
      summary: 'Upload a new product',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'body',
          description: 'Product object needed to create new product',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/ProductCreate',
      },
      responses: {
        '201': {
          description: 'Product created successfully',
          exapmple: {
            status: 201,
            product: '#/definitions/Product',
          },
        },
        '400': {
          description: 'Bad Request',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
        '401': {
          description: 'Unauthorized access',
          example: {
            status: 401,
            message: 'Unauthorized Access',
          },
        },
      },
    },
    get: {
      tags: ['product'],
      summary: 'Retrieve a sellers products',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        $ref: '#/definitions/Products',
      },
      responses: {
        '200': {
          description: 'Products retrieved successfully',
          exapmple: {
            status: 200,
            product: '#/definitions/Products',
          },
        },
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
  '/products/{id}': {
    put: {
      tags: ['product'],
      summary: 'Update a single product',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Product ID',
          required: true,
        },
        {
          in: 'body',
          name: 'body',
          description: 'Product object with the price only',
          required: true,
          schema: {
            price: {
              type: 'number',
            },
          },
        },
      ],
      responses: {
        '200': {
          description: 'Products updated successfully',
          exapmple: {
            status: 200,
            product: '#/definitions/Product',
          },
        },
        '400': {
          description: 'Bad Request',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    get: {
      tags: ['product'],
      summary: 'Retrieve a single product',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Product ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          descrition: 'Product retrieved successfully',
          example: {
            status: 200,
            product: '#/definitions/Product',
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
          description: 'Product not found',
          example: {
            status: 404,
            message: 'Product was not found',
          },
        },
      },
    },
    delete: {
      tags: ['product'],
      summary: 'Delete a single product',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'Product ID',
          required: true,
        },
      ],
      responses: {
        '204': {
          description: 'Product deleted successfully',
          example: {
            status: 204,
            product: 'Product was successfully deleted.',
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
          description: 'Product not found',
          example: {
            status: 404,
            message: 'Product was not found',
          },
        },
      },
    },
  },
}
