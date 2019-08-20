import { Joi } from 'celebrate'
import { expect } from 'chai'
import * as validator from '../subscription.validator'

describe('subscription.controller', () => {
  describe('updateSubscription', () => {
    describe('plan', () => {
      it('should return "plan is required"', () => {
        const result = Joi.validate({ plan: 'diamond' }, validator.validateRequest)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"plan" must be one of [bronze, silver, gold]')
      })
    })
  })
})
