import { Joi, celebrate } from 'celebrate'

export const createOrder = Joi.object().keys({
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
  amount: Joi.number()
    .integer()
    .min(1)
    .required(),
  comments: Joi.string(),
  orderItems: Joi.array()
    .items(
      Joi.object().keys({
        productId: Joi.string()
          .uuid({
            version: ['uuidv4'],
          })
          .required(),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required(),
        amount: Joi.number()
          .integer()
          .min(1)
          .required(),
      }),
    )
    .required(),
})

export const updateOrder = Joi.object().keys({
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
  amount: Joi.number()
    .integer()
    .min(1)
    .required(),
  comments: Joi.string(),
  orderItems: Joi.array()
    .items(
      Joi.object().keys({
        id: Joi.string()
          .uuid()
          .required(),
        productId: Joi.string()
          .uuid({
            version: ['uuidv4'],
          })
          .required(),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required(),
        amount: Joi.number()
          .integer()
          .min(1)
          .required(),
      }),
    )
    .required(),
})

export const validateOrderId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .uuid({
        version: ['uuidv4'],
      }),
  }),
})

export const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.number()
      .integer()
      .required()
      .min(1),
  }),
})
