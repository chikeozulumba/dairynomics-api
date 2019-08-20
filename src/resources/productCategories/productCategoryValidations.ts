import { Joi } from 'celebrate'

export const createCategory = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(255)
    .trim()
    .required(),
  description: Joi.string()
    .min(10)
    .max(1000)
    .trim(),
})

export const updateCategory = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(255)
    .trim(),
  description: Joi.string()
    .min(10)
    .max(1000)
    .trim(),
})

export const categoryId = Joi.object().keys({
  id: Joi.string()
    .guid()
    .required(),
})
