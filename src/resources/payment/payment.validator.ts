import { Joi, celebrate } from 'celebrate'

export const createOne = Joi.object().keys({
  amount: Joi.number()
    .min(1)
    .required(),
  currency: Joi.string().valid(['KES']),
  productId: Joi.string()
    .uuid({
      version: ['uuidv4'],
    })
    .required(),
  provider: Joi.string().valid(['M-Pesa']),
})

export const updateOne = Joi.object().keys({
  amount: Joi.number().min(1),
})

export const initiatePaymentValidator = celebrate({
  body: Joi.object().keys({
    Amount: Joi.string().required(),
    PhoneNumber: Joi.string().required(),
    AccountReference: Joi.string().required(),
    TransactionDesc: Joi.string().required(),
  }),
})
