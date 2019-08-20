module.exports = {
  ErrorResponse: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
      },
      message: {
        type: 'string',
      },
    },
  },
  ValidationResponse: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: {
        type: 'integer',
        format: 'int32',
        example: 400,
      },
      message: {
        type: 'string',
        example: 'Bad Request',
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
        },
      },
    },
  },
}
