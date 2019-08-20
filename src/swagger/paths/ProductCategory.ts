module.exports = {
  '/categories': {
    post: {
      tags: ['category'],
      summary: 'create a new productCategory',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'body',
          description: 'description object optional to create new product Category',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/productCategoryAdd',
      },
      responses: {
        '201': {
          description: 'ProductCategory created successfully',
          exapmple: {
            status: 201,
            productCategory: '#/definitions/productCategory',
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
            reason: 'ACCESS_LEVEL',
          },
        },
      },
    },
    get: {
      tags: ['productCategory'],
      summary: 'Retrieve all product categories',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        $ref: '#/definitions/ProductCategory',
      },
      responses: {
        '200': {
          description: 'ProductCategories retrieved successfully',
          exapmple: {
            status: 200,
            productCategory: '#/definitions/ProductCategory',
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
  '/categories/{id}': {
    put: {
      tags: ['productCategory'],
      summary: 'Update a single productCategory',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'ProductCategory ID',
          required: true,
        },
        {
          in: 'body',
          name: 'body',
          description: 'ProductCategory object with the name or description',
          required: true,
          schema: {
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
          },
        },
      ],
      responses: {
        '200': {
          description: 'ProductCategory updated successfully',
          exapmple: {
            status: 200,
            productCategory: '#/definitions/productCategoryUpdate',
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
      tags: ['productCategory'],
      summary: 'Retrieve a single productCategory',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'ProductCategory ID',
          required: true,
        },
      ],
      responses: {
        '200': {
          description: 'ProductCategory retrieved successfully',
          example: {
            status: 200,
            productCategory: '#/definitions/productCategory',
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
          description: 'ProductCategory not found',
          example: {
            status: 404,
            message: 'ProductCategory was not found',
          },
        },
      },
    },
    delete: {
      tags: ['productCategory'],
      summary: 'Delete a single productCategory',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'path',
          name: 'id',
          description: 'ProductCategory ID',
          required: true,
        },
      ],
      responses: {
        '204': {
          description: 'ProductCategory deleted successfully',
          example: {
            status: 204,
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
          description: 'ProductCategory not found',
          example: {
            status: 404,
            message: 'ProductCategory was not found',
          },
        },
      },
    },
  },
}
