import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import controller from '../payment.controller'
import db from '../../../database/models'
import * as statusCodes from '../../../constants/statusCodes'
import { userId, productId } from '../__mocks__/data'
import { PaymentAttributes } from '../payment.model'

import chaiHttp from 'chai-http'

chai.use(chaiHttp)

let http: any

chai.use(sinonChai)

let payment: PaymentAttributes
let paymentId = '2a58630b-e3ce-44ff-886d-98265643a257'

describe('PAYMENT CONTROLLER', () => {
  before(async () => {
    payment = await db.Payment.create({ amount: 20, userId: 1, productId: '351043bb-3460-4937-902c-e450ab2afc46' })
    payment = await db.Payment.create({
      id: paymentId,
      amount: 20,
      userId: 1,
      productId: '351043bb-3460-4937-902c-e450ab2afc46',
    })
  })

  after(async () => {
    await db.Payment.findByPk(paymentId).then(payment => {
      if (payment) {
        payment.destroy()
      }
    })
  })

  describe('checkPayment', () => {
    it('should return the `Payment not found`', done => {
      const request = {
        currentUser: { id: 1923 },
        body: {
          amount: 20,
        },
        params: {
          id: '3a798e47-5e2c-413f-a785-603e20f11b34',
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.spy()

      controller.checkRecord(req, res, next).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.NOT_FOUND)
        done()
      })
    })

    it('should return call `next` on Payment found', done => {
      const request = {
        currentUser: { id: 1923 },
        body: {
          amount: 20,
        },
        params: {
          id: payment.id,
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.fake()

      controller.checkRecord(req, res, next).then(() => {
        expect(next.called).to.be.true
        done()
      })
    })
  })

  describe('checkPaymentOwner', () => {
    it('should return the `Unauthorized access`', () => {
      const request = {
        currentUser: { id: 1 },
        payment: {
          userId: 2,
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.fake()
      controller.checkOwnership(req, res, next)
      expect(res.status).to.have.been.calledWith(statusCodes.UNAUTHORIZED)
    })

    it('should return call `next` on Onwership confirmed', done => {
      const request = {
        currentUser: { id: 1923 },
        payment: { userId: 1923 },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.fake()

      controller.checkOwnership(req, res, next)
      expect(next.called).to.be.true
      done()
    })
  })

  describe('CREATE ONE', () => {
    it('should return the `created` payment', done => {
      const request = {
        currentUser: { id: userId },
        body: {
          amount: 20,
          productId: '351043bb-3460-4937-902c-e450ab2afc46',
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      controller.createOne(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.CREATED)
        done()
      })
    })
  })

  describe('getOne', () => {
    it('should return the a single `payment`', done => {
      const request = {
        currentUser: { id: 1923 },
        payment,
      }
      const req = mockReq(request)
      const res = mockRes()
      controller.getOne(req, res)
      expect(res.status).to.have.been.calledWith(statusCodes.OK)
      done()
    })
  })

  describe('updateOne', () => {
    it('should return the `updated` payment', done => {
      const request = {
        currentUser: { id: 1923 },
        payment,
        body: {
          amount: 30,
        },
        params: {
          id: payment.id,
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      controller.updateOne(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('getMany', () => {
    it('should return the `payment` array', done => {
      const request = {
        currentUser: { id: 1923 },
      }
      const req = mockReq(request)
      const res = mockRes()
      controller.getMany(req, res).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.OK)
        done()
      })
    })
  })

  describe('getPaymentStatus', () => {
    it('should return a payment status', async () => {
      const request = {
        body: {
          Body: {
            stkCallback: {
              MerchantRequestID: '21605-295434-4',
              CheckoutRequestID: 'ws_CO_04112017184930742',
              ResultCode: 0,
              ResultDesc: 'The service request is processed successfully.',
            },
          },
        },
      }
      const req = mockReq(request)
      const res = mockRes({
        code: 1,
        description: '[MpesaCB - ]The balance is insufficient for the transaction.',
      })
      await controller.getPaymentStatus(req, res).then(() => {
        expect(res.code).to.equal(1)
      })
    })
  })

  describe('updatePaymentStatus', () => {
    it('should return payment not found', async () => {
      const paymentId = 'ed18dabe-3fc2-4fcc-bfb8-944a4d6c396e'
      const paymentStatus = 'Success'
      const result = await controller.updatePaymentStatus(paymentId, paymentStatus)
      const { message } = result
      expect(message).to.equal('Payment not found')
    })
    it('should return payment updated', async () => {
      const paymentStatus = 'Success'
      const result = await controller.updatePaymentStatus(paymentId, paymentStatus)
      const { message } = result
      expect(message).to.equal('Payment updated')
    })
  })
})
