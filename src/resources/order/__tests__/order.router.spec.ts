import chai, { expect } from 'chai'
import uuid from 'uuid/v4'
import chaiHttp from 'chai-http'
import db from '../../../database/models'
import app from '../../../server'
import { token, userId, externalToken, productId, createOrder } from './__mocks__/data'
import * as statusCodes from '../../../constants/statusCodes'
import { OrderAttributes } from '../order.model'

chai.use(chaiHttp)

const prefix = '/api'
let order: OrderAttributes
let updateOrder: any
let destroyOrder: OrderAttributes
let createOrderItems: any

before(async () => {
  order = await db.Order.create(createOrder)
  updateOrder = await db.Order.create(createOrder)
  destroyOrder = await db.Order.create(createOrder)

  updateOrder = await db.Order.findOne({
    where: { id: updateOrder.id },
    include: [
      {
        model: db.OrderItem,
        as: 'orderItems',
      },
    ],
  })
  createOrderItems = await db.OrderItem.create({
    orderId: order.id || '',
    userId: 1923,
    quantity: 1923,
    productId: '351043bb-3460-4937-902c-e450ab2afc46',
  })
})

describe('order.router', () => {
  describe('POST /api/orders', () => {
    it('should return `Unauthorized access`', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/orders`)
        .send()
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `Unauthorized access`', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/orders`)
        .set('Authorization', token)
        .send()
      expect(res.body.message).to.equal('Bad Request')
      expect(res.body.errors[0].message).to.equal('"quantity" is required')
    })

    it('should return `the created order`', async () => {
      const newOrder = {
        quantity: 100,
        amount: 20,
        comments:
          'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
        orderItems: [
          {
            amount: 10,
            quantity: 50,
            productId: '351043bb-3460-4937-902c-e450ab2afc46',
          },
          {
            amount: 10,
            quantity: 50,
            productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
          },
        ],
      }
      const res = await chai
        .request(app)
        .post(`${prefix}/orders`)
        .set('Authorization', token)
        .send(newOrder)
      expect(res.body.status).to.equal(statusCodes.CREATED)
      expect(res.body.order).to.be.an('object')
      expect(res.body.order).to.haveOwnProperty('orderItems')
    })
  })

  describe('GET /api/orders/:id?', () => {
    it('should return all orders', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/orders`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.orders).to.be.an('array')
    })

    it('should return a specific order', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/orders/${order.id}`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.orders).to.be.an('array')
    })

    it('should return a specific order', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/orders/351043bb-3460-4937-902c-e450ab2afc42`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.NOT_FOUND)
    })

    it('should return a 404 specific order that does not exist', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/orders/${uuid()}`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.NOT_FOUND)
      expect(res.body.message).to.be.equal('Order was not found')
    })
  })

  describe('PUT /api/orders/:id', () => {
    let updateOrderData: any
    before(async () => {
      const newOrder = {
        quantity: 100,
        amount: 200000,
        comments:
          'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
        orderItems: [
          {
            amount: 100000,
            quantity: 50,
            productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
          },
          {
            amount: 100000,
            quantity: 50,
            productId: '351043bb-3460-4937-902c-e450ab2afc46',
          },
        ],
      }

      const res = await chai
        .request(app)
        .post(`${prefix}/orders`)
        .set('Authorization', token)
        .send(newOrder)
      updateOrderData = res.body.order
    })

    it('should update a specific order', async () => {
      let update = {
        quantity: 180,
        amount: 3600,
        comments:
          'Chlo is an ordinary girl, with a pretty ordinary life, but it all changes one day as she is taken along with several other people to live an abdl life with a daddy each, to which she unexpectedly falls heavily in love with, enjoy!.',
        orderItems: [
          {
            id: updateOrderData.orderItems[0].id,
            productId: '351043bb-3460-4937-902c-e450ab2afc46',
            quantity: 170,
            amount: 1800,
          },
          {
            id: updateOrderData.orderItems[1].id,
            productId: '351043bb-3460-4937-902c-e450ab2afc46',
            quantity: 10,
            amount: 1800,
          },
        ],
      }

      const res = await chai
        .request(app)
        .put(`${prefix}/orders/${updateOrder.id}`)
        .set('Authorization', token)
        .send(update)
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.message).to.be.equal('Order has been updated!')
    })
  })

  describe('DELETE /api/order/:id', () => {
    let updateOrderData: any
    before(async () => {
      const newOrder = {
        quantity: 100,
        amount: 200000,
        comments:
          'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
        orderItems: [
          {
            amount: 100000,
            quantity: 50,
            productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
          },
        ],
      }

      const res = await chai
        .request(app)
        .post(`${prefix}/orders`)
        .set('Authorization', token)
        .send(newOrder)
    })
    it('should delete a specific order', async () => {
      const res = await chai
        .request(app)
        .delete(`${prefix}/orders/${destroyOrder.id}`)
        .set('Authorization', token)
      expect(res.status).to.equal(statusCodes.NO_CONTENT)
    })
  })
  it('should delete a specific order item', async () => {
    const res = await chai
      .request(app)
      .delete(`${prefix}/orders/item/${createOrderItems.id}`)
      .set('Authorization', token)
    expect(res.status).to.equal(statusCodes.NO_CONTENT)
  })
})
