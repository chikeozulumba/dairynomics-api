import { Joi } from 'celebrate'
import { expect } from 'chai'
import * as validator from '../product.validator'
import { userId } from './__mocks__/product'

let createProductParams = {
  quantity: 0,
}

describe('product parameters validator', () => {
  describe('createOne', () => {
    describe('userId', () => {
      it('should return "userId is required"', () => {
        const result = Joi.validate({}, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"userId" is required')
      })

      it('should return "userId must be a number"', () => {
        const result = Joi.validate({ userId: 'asjqu' }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"userId" must be a number')
        createProductParams['userId'] = userId
      })
    })

    describe('productName', () => {
      it('should return "productName is required"', () => {
        const result = Joi.validate({ ...createProductParams }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productName" is required')
      })

      it('should return "productName must be a number"', () => {
        const result = Joi.validate({ ...createProductParams, productName: 20 }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"productName" must be a string')
        createProductParams['productName'] = 'A random product name'
      })
    })

    describe('categoryId', () => {
      it('should return "categoryId is required"', () => {
        const result = Joi.validate({ ...createProductParams }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"categoryId" is required')
      })

      it('should return "categoryId must be a number"', () => {
        const result = Joi.validate({ ...createProductParams, categoryId: 'asjqu' }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"categoryId" must be a number')
        createProductParams['categoryId'] = 3
      })
    })
    describe('price should be provided', () => {
      it('should return "price is required"', () => {
        const result = Joi.validate({ ...createProductParams }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"price" is required')
      })

      it('should return "price must be a number"', () => {
        const result = Joi.validate({ ...createProductParams, price: 'random string' }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"price" must be a number')
        createProductParams['price'] = 2000
      })
    })

    describe('countyId', () => {
      it('should return "countyId is required"', () => {
        const result = Joi.validate({ ...createProductParams }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"countyId" is required')
      })

      it('should return "countyId must be a number"', () => {
        const result = Joi.validate({ ...createProductParams, countyId: 'asjqu' }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"countyId" must be a number')
        createProductParams['countyId'] = 10
      })
    })

    describe('description should be provided', () => {
      it('should return "description is required"', () => {
        const result = Joi.validate({ ...createProductParams }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"description" is required')
      })

      it('should return "description must be a number"', () => {
        const result = Joi.validate({ ...createProductParams, description: 20 }, validator.createProduct)
        expect(result.error.details.length).to.equal(1)
        expect(result.error.details[0].message).to.equal('"description" must be a string')
        createProductParams['description'] = 'A large tractor'.repeat(50)
      })
    })
  })

  describe('validateProductId', () => {
    it('should return "productId must be a number"', () => {
      const result = Joi.validate({ productId: 'fake uuid' }, validator.validateProductId)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"productId" is not allowed')
    })
  })

  describe('updateProduct', () => {
    it('should return "productId must be a string"', () => {
      const result = Joi.validate({ productName: 20 }, validator.updateProduct)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"productName" must be a string')
    })

    it('should return "categoryId must be a number"', () => {
      const result = Joi.validate({ categoryId: 'asdfg' }, validator.updateProduct)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"categoryId" must be a number')
    })

    it('should return "price must be a number"', () => {
      const result = Joi.validate({ price: 'asdfg' }, validator.updateProduct)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"price" must be a number')
    })

    it('should return "countyId must be a number"', () => {
      const result = Joi.validate({ countyId: 'asdfg' }, validator.updateProduct)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"countyId" must be a number')
    })

    it('should return "description must be a number"', () => {
      const result = Joi.validate({ description: 20 }, validator.updateProduct)
      expect(result.error.details.length).to.equal(1)
      expect(result.error.details[0].message).to.equal('"description" must be a string')
    })
  })
})
