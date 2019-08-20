import { Joi } from 'celebrate'

export const validateInvoiceSchema = Joi.object().keys({
  amountReceived: Joi.number()
    .min(0)
    .required(),
})

export const validateInvoiceUpdateSchema = Joi.object().keys({
  paymentStatus: Joi.string()
    .valid(['paid', 'pending'])
    .required(),
})
