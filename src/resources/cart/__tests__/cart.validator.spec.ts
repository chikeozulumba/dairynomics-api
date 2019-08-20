import { Joi } from 'celebrate'
import { expect } from 'chai'
import * as validator from '../cart.validator'
import { invalidProductId } from './__mocks__/data'

describe('cart.controller', () => {
  describe('addItemToCart', () => {
    describe('productId', () => {
      it('should return "productId is required"', () => {
        const result = Joi.validate({}, validator.addItemToCart)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" is required')
      })

      it('should return "productId must be a string"', () => {
        const result = Joi.validate({ productId: true }, validator.addItemToCart)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" must be a string')
      })
    })

    describe('quantity', () => {
      it('should return "quantity must be a number"', () => {
        const result = Joi.validate({ quantity: 'ab', productId: invalidProductId }, validator.addItemToCart)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"quantity" must be a number')
      })
    })
  })

  describe('updateOne', () => {
    describe('productId', () => {
      it('should return "productId is required"', () => {
        const result = Joi.validate({ quantity: 2 }, validator.updateOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" is required')
      })

      it('should return "productId must be a string"', () => {
        const result = Joi.validate({ quantity: 2, productId: true }, validator.updateOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productId" must be a string')
      })
    })

    describe('quantity', () => {
      it('should return "quantity is required"', () => {
        const result = Joi.validate({ productId: invalidProductId }, validator.updateOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"quantity" is required')
      })

      it('should return "quantity must be a number"', () => {
        const result = Joi.validate({ productId: invalidProductId, quantity: 'true' }, validator.updateOne)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"quantity" must be a number')
      })
    })
  })
})
