import { Joi } from 'celebrate'

export const addItemToCart = Joi.object().keys({
  productId: Joi.string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
})

export const updateOne = Joi.object().keys({
  productId: Joi.string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
  quantity: Joi.number()
    .integer()
    .min(0)
    .required(),
})
