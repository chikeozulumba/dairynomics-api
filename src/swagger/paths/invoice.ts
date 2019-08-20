import { NONAME } from 'dns'

module.exports = {
  '/invoices': {
    post: {
      tags: ['invoices'],
      summary: 'creates invoices',
      parameters: [
        {
          in: 'headers',
          name: 'Authorization',
          description: 'JWT token',
          required: true,
          type: 'string',
        },
        {
          in: 'body',
          name: 'body',
          description: 'Invoice objects need for the payments',
          required: true,
          example: {
            amountRecieved: '30000',
            paymentStatus: 'pending',
          },
        },
      ],
      schema: {
        $ref: '#/definitions/createInvoice',
      },
      responses: {
        '400': {
          description: 'Bad request',
          schema: {
            $ref: '#/definitions/ValidationResponse',
          },
        },
      },
    },
    get: {
      tags: ['invoices'],
      summary: 'get all the invoices',
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'JWToken',
          required: true,
          type: 'string',
        },
      ],
      schema: {
        $ref: '#/definitions/createInvoice',
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
  '/invoices/{id}': {
    put: {
      tags: ['invoices'],
      summary: 'get single invoice by id',
      parameters: [
        {
          in: 'head',
          name: 'Authorization',
          description: 'JWTToken',
          required: true,
          type: 'string',
        },
        {
          in: 'path',
          name: 'id',
          description: 'invoice id',
          required: true,
        },
        {
          in: 'body',
          name: 'body',
          example: {
            amountRecieved: '30000',
            paymentStatus: 'pending',
          },
        },
      ],
      schema: {
        $ref: '#/definitions/createInvoice',
      },
      responses: {
        '200': {
          description: 'your invoces was updated successfully',
          example: {
            status: 200,
            invoces: '#/definitions/createInvoice',
          },
        },
      },
    },
    get: {
      tags: ['invoices'],
      summary: 'get single invoices by id',
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          description: 'JWT-Token',
          required: true,
          type: 'string',
        },
        {
          in: 'path',
          name: 'id',
          description: 'invoice id',
          required: true,
        },
      ],
      schema: {
        $ref: '#/definitions/createInvoice',
      },
      responses: {
        '200': {
          description: 'succesful',
          example: {
            status: 200,
            invoice: '#/definitions/createInvoice',
          },
        },
      },
    },
  },
}
