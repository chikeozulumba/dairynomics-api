import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import Orders from '../order.controller'
import Users from '../../user/user.controller'
import db from '../../../database/models'
import * as statusCodes from '../../../constants/statusCodes'
import { createOrder, userId } from './__mocks__/data'
import uuid = require('uuid/v4')

chai.use(sinonChai)

let order: any

before(async () => {
  order = await db.Order.create(createOrder)
})

describe('order.controller', () => {
  describe('Place an order', () => {
    it('should successfully return a placed order ', done => {
      const request = {
        currentUser: { id: userId },
        body: createOrder,
      }
      const req = mockReq(request)
      const res = mockRes()
      Orders.createOneWithHasManyAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.CREATED)
        done()
      })
    })
  })

  describe('get all orders', () => {
    it('should return a collection of orders', done => {
      const request = {
        currentUser: { id: userId },
      }
      const req = mockReq(request)
      const res = mockRes()
      Orders.getRecordsWithAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('get a specific order', () => {
    it('should return an order', done => {
      const request = {
        currentUser: { id: userId },
        params: { id: order.id },
      }
      const req = mockReq(request)
      const res = mockRes()
      Orders.getRecordsWithAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('get a specific order that does not exist', () => {
    it('should return a not found message: 404 status code', done => {
      const request = {
        currentUser: { id: userId },
        params: { id: uuid() },
      }
      const req = mockReq(request)
      const res = mockRes()
      Orders.getRecordsWithAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('get orders made by a specific user', () => {
    it('should return orders made by a particular user', done => {
      const request = {
        currentUser: { id: userId },
        params: { id: userId },
      }
      const req = mockReq(request)
      const res = mockRes()
      Users.getRecordsWithAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('get orders that do not exist made by a specific user', () => {
    it('should return orders not found', done => {
      const request = {
        currentUser: { id: userId },
        params: { id: 132 },
      }
      const req = mockReq(request)
      const res = mockRes()
      Users.getRecordsWithAssociations(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })
})
