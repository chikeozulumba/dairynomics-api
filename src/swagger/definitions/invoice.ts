module.exports = {
  invoices: {
    type: 'object',
    required: ['amountRecieved', 'paymentStatus'],
    properties: {
      id: {
        type: 'string',
        format: 'bit64',
        example: '22fea233-4860-49ac-955e-c23fb05cd063',
      },
      orderId: {
        type: 'string',
        format: 'bit64',
        example: '22fea233-4860-49ac-955e-c23fb05cd063',
      },
      amountRecieved: {
        type: 'number',
        format: 'double',
        example: '5000',
      },
      paymentStatus: {
        type: 'string',
        example: 'pending',
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
  createInvoice: {
    type: 'object',
    required: ['amountReceive', 'paymentStatus'],
    properties: {
      amountReceive: {
        type: 'number',
        format: 'double',
        example: 300000,
      },
      paymentStatus: {
        type: 'string',
        example: ['paid', 'pending'],
      },
    },
  },
}
