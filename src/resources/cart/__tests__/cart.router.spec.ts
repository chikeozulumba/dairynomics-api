import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../../../database/models'
import app from '../../../server'
import { token, userId, externalToken, productId, secondProductId, invalidProductId } from './__mocks__/data'
import { CartAttributes } from '../cart.model'

import * as statusCodes from '../../../constants/statusCodes'

chai.use(chaiHttp)

const prefix = '/api'

before(async () => {
  await db.Cart.destroy({ where: {}, truncate: true })
  await db.Cart.create({ quantity: 1, userId, productId: secondProductId })
})

after(async () => {
  await db.Cart.destroy({ where: {}, truncate: true })
})

describe('cart.router', () => {
  describe('PUT /api/carts', () => {
    it('should return `Unauthorized access` when request is made without token', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/carts`)
        .send({ productId })

      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should update the item in cart', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId: secondProductId, quantity: 4 })
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.message).to.equal('Cart Item updated')
      const cartItem = res.body.cartItems.find((item: CartAttributes) => item.productId === secondProductId)
      expect(cartItem.quantity).to.equal(4)
    })

    it('should remove the item from cart when quantity is 0', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId: secondProductId, quantity: 0 })
      expect(res.body.status).to.equal(statusCodes.OK)
      const cartItem = res.body.cartItems.find((item: CartAttributes) => item.productId === secondProductId)
      expect(cartItem).to.equal(undefined)
      expect(res.body.message).to.equal('Item removed from cart successfully')
    })

    it('should return `Cart item was not found` when item does not exist in cart', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId, quantity: 0 })
      expect(res.body.status).to.equal(statusCodes.NOT_FOUND)
      expect(res.body.message).to.equal('Cart item was not found')
    })
  })
  describe('POST /api/carts', () => {
    it('should return `Unauthorized access` when request is made without token', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/carts`)
        .send()
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `"productId" is required', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/carts`)
        .set('Authorization', token)
        .send()
      expect(res.body.errors[0].message).to.equal('"productId" is required')
    })

    it('should return `Product does not exist` if invalid product id is passed', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId: invalidProductId, quantity: 1 })
      expect(res.body.message).to.equal('Product does not exist')
    })

    it("should add the item to cart and return the user's updated cart", async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId, quantity: 3 })
      expect(res.body.status).to.equal(statusCodes.CREATED)
      expect(res.body.message).to.equal('Item successfully added to cart')
      expect(res.body.cartItems).to.be.an('array')
    })
    it('should update the item in cart if item already exists', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/carts`)
        .set('Authorization', token)
        .send({ productId, quantity: 2 })
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.message).to.equal('Cart Item Updated')
    })
  })

  describe('GET /api/carts', () => {
    it('should return `Unauthorized access` when request is made without token', async () => {
      const res = await chai.request(app).get(`${prefix}/carts`)
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `Unauthorized access` with an external token', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/carts`)
        .set('Authorization', externalToken)
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it("should return the user's cart", async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/carts`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.cartItems).to.be.an('array')
    })
  })

  describe('DELETE /api/carts', () => {
    it('should return `Unauthorized access` when request is made without token', async () => {
      const res = await chai.request(app).delete(`${prefix}/carts`)
      expect(res.body.message).to.equal('Unauthorized access')
    })
    it('should empty the cart', async () => {
      const res = await chai
        .request(app)
        .delete(`${prefix}/carts`)
        .set('Authorization', token)
      expect(res.status).to.equal(statusCodes.NO_CONTENT)
    })
  })
})
