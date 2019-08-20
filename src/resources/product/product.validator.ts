import { Joi } from 'celebrate'

export const createProduct = Joi.object().keys({
  userId: Joi.number()
    .integer()
    .required(),
  productName: Joi.string()
    .min(10)
    .max(200)
    .required(),
  categoryId: Joi.number()
    .integer()
    .min(1)
    .required(),
  price: Joi.number()
    .min(1)
    .required(),
  quantity: Joi.number()
    .min(0)
    .required(),
  countyId: Joi.number()
    .integer()
    .min(1)
    .required(),
  description: Joi.string()
    .min(100)
    .max(1000)
    .required(),
  photos: Joi.array()
    .min(0)
    .max(5),
})

export const validateProductId = Joi.object().keys({
  id: Joi.string().uuid({
    version: ['uuidv4'],
  }),
})

export const updateProduct = Joi.object().keys({
  productName: Joi.string()
    .min(10)
    .max(200),
  categoryId: Joi.number()
    .integer()
    .min(1),
  price: Joi.number().min(1),
  countyId: Joi.number()
    .integer()
    .min(1),
  description: Joi.string()
    .min(100)
    .max(1000),
  photos: Joi.array()
    .min(0)
    .max(5),
})
