import { Joi } from 'celebrate'

export const validateRequest = Joi.object().keys({
  plan: Joi.string()
    .valid('bronze', 'silver', 'gold')
    .required(),
})
