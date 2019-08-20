module.exports = {
  '/carts': {
    post: {
      tags: ['shopping cart', 'cart'],
      summary: 'Add item to shopping cart',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'productId',
          description: 'Id of product to be added to cart',
          required: true,
        },
        {
          in: 'body',
          name: 'quantity',
          description: 'Quantity of item to be added to cart (defaults to 1 is not defined)',
          required: false,
        },
      ],
      schema: {
        $ref: '#/definitions/CartAdd',
      },
      responses: {
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
        '404': {
          description: 'Product does not exist',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    get: {
      tags: ['shopping cart', 'cart'],
      summary: 'Retrieve all items in cart',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        $ref: '#/definitions/Cart',
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
    put: {
      tags: ['shopping cart', 'cart'],
      summary: 'Update Item In Cart',
      parameters: [
        { in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' },
        {
          in: 'body',
          name: 'productId',
          description: 'Id of product to be updated in cart',
          required: true,
        },
        {
          in: 'body',
          name: 'quantity',
          description: 'New quantity of item (deletes item from cart if set to 0)',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/CartUpdate',
      },
      responses: {
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
        '404': {
          description: 'Product does not exist',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    delete: {
      tags: ['shopping cart', 'cart'],
      summary: 'Remove all items in cart',
      parameters: [{ in: 'header', name: 'Authorization', description: 'JWT Token', required: true, type: 'string' }],
      schema: {
        cartItems: [],
      },
      responses: {
        '204': {
          descrition: 'Cart emptied successfully',
          example: {
            status: 204,
            product: 'Cart emptied successfully',
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
}
