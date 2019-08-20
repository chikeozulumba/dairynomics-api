import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import ProductController from '../product.controller'
import * as statusCodes from '../../../constants/statusCodes'
import { userId, productParams } from './__mocks__/product'
import db from '../../../database/models'
import { ProductAttributes } from '../product.model'

chai.use(sinonChai)

let product: ProductAttributes
let productId: string

before(async () => {
  product = await db.Product.create({
    ...productParams,
  })
  productId = product.id as string
})

after(async () => {
  const product = await db.Product.findByPk(productId)
  if (product) {
    product.destroy()
  }
})

describe('Product controller', () => {
  describe('checkProduct', () => {
    it('should trigger the `check product` method', async () => {
      const request = {
        currentUser: { id: userId },
        params: { id: '3a798e47-5e2c-413f-a785-603e20f11b34' },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.spy()

      const response = await ProductController.checkRecord(req, res, next)
      expect(response['status']).to.have.been.calledWith(statusCodes.NOT_FOUND)
    })
  })

  describe('checkProduct', () => {
    it('should trigger the `get products` method', async () => {
      const request = {
        currentUser: { id: 1923 },
      }
      const req = mockReq(request)
      const res = mockRes()

      const response = await ProductController.getSellerProducts(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('createOne', () => {
    it('should trigger the `created` product method', async () => {
      const request = {
        currentUser: { id: userId },
        body: productParams,
      }
      const req = mockReq(request)
      const res = mockRes()
      const response = await ProductController.createOne(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.CREATED)
    })
  })

  describe('updateOne', () => {
    it('should trigger the `update` product method', async () => {
      const request = {
        currentUser: { id: userId },
        product,
        body: {
          price: 30000,
        },
        params: {
          id: product.id,
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      const response = await ProductController.updateOne(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('deleteOne', () => {
    it('should trigger the `delete` product method', async () => {
      const request = {
        product,
        currentUser: { id: userId },
        params: { id: productId },
      }
      const req = mockReq(request)
      const res = mockRes()
      const response = await ProductController.deleteOne(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.NO_CONTENT)
    })
  })
})
