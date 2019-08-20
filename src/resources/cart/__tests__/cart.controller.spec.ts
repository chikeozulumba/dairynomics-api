import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import controller from '../cart.controller'
import db from '../../../database/models'
import * as statusCodes from '../../../constants/statusCodes'
import { userId, productId, secondProductId, invalidProductId } from './__mocks__/data'

chai.use(sinonChai)

before(async () => {
  await db.Cart.destroy({ where: {}, truncate: true })
  await db.Cart.create({ quantity: 1, userId, productId: secondProductId })
})

after(async () => {
  await db.Cart.destroy({ where: {}, truncate: true })
})

describe('cart.controller', () => {
  describe('addToCart', () => {
    it('should add item to cart if productId is valid', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId,
          quantity: 1,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.addToCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.CREATED)
    })

    it('should update item in cart if item exists already', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId,
          quantity: 3,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.addToCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('updateCart', () => {
    it('should handle a scenario where product does not exist`', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId: invalidProductId,
          quantity: 3,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.updateCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.NOT_FOUND)
    })

    it('should handle a scenario where product id is valid but item does not exist in cart`', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId: secondProductId,
          quantity: 3,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.updateCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.NOT_FOUND)
    })

    it('should update the item in cart`', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId,
          quantity: 2,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.updateCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.OK)
    })
    it('should remove item from cart if quantity is set to 0`', async () => {
      const request = {
        currentUser: { id: 1 },
        body: {
          productId,
          quantity: 0,
        },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.updateCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('getUserCart', () => {
    it('should return items in cart`', async () => {
      const request = {
        currentUser: { id: 1 },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.getUserCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('emptyCart', () => {
    it('should delete items in cart`', async () => {
      const request = {
        currentUser: { id: 1 },
      }
      const req = mockReq(request)
      const res = mockRes()

      await controller.emptyCart(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.NO_CONTENT)
    })
  })
})
