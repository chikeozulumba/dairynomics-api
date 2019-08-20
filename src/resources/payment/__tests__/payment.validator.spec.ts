import { Joi } from 'celebrate'
import { expect } from 'chai'
import * as validator from '../payment.validator'
import { productId } from '../__mocks__/data'

describe('payment.controller', () => {
  describe('createOne', () => {
    describe('amount', () => {
      it('should return "amount is required"', () => {
        const result = Joi.validate({}, validator.createOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"amount" is required')
      })

      it('should return "amount must be a number"', () => {
        const result = Joi.validate({ amount: 'amount' }, validator.createOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"amount" must be a number')
      })
    })

    describe('productId', () => {
      it('should return "productId is required"', () => {
        const result = Joi.validate({ amount: 20 }, validator.createOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" is required')
      })

      it('should return "productId must be a string"', () => {
        const result = Joi.validate({ amount: 20, productId: 1 }, validator.createOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" must be a string')
      })
    })

    describe('provider', () => {
      it('should return "provider must be one of [M-Pesa]"', () => {
        const result = Joi.validate({ amount: 20, productId, provider: 'Pesa' }, validator.createOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"provider" must be one of [M-Pesa]')
      })
    })
  })

  describe('updateOne', () => {
    describe('amount', () => {
      it('should return "amount must be a number"', () => {
        const result = Joi.validate({ amount: 'amount' }, validator.updateOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"amount" must be a number')
      })
    })
  })
})
