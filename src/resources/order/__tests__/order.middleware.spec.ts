import { validateOrderAmountAndQuantity } from '../middlewares/order.middleware'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as statusCodes from '../../../constants/statusCodes'
import { OrderAttributes } from '../order.model'

chai.use(chaiHttp)

const prefix = '/api'
let destroyOrder: OrderAttributes

describe('order.validator', () => {
  describe('validateOrderAmountAndQuantity', () => {
    it('validate all incoming orders and check if the sum of all order items equal the actual total amount listed on the request payload and failing', async () => {
      const request = {
        body: {
          quantity: 51,
          amount: 20,
          comments:
            'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
          orderItems: [
            {
              amount: 10,
              quantity: 5,
              productId: '351043bb-3460-4937-902c-e450ab2afc46',
            },
            {
              amount: 10,
              quantity: 46,
              productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
            },
          ],
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      validateOrderAmountAndQuantity(req, res, () => true).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.BAD_REQUEST)
      })
    })
    it('validate all incoming orders and check if the sum of all order items equal the actual total amount listed on the request payload and failing', async () => {
      const request = {
        body: {
          quantity: 5,
          amount: 30,
          comments:
            'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
          orderItems: [
            {
              amount: 10,
              quantity: 5,
              productId: '351043bb-3460-4937-902c-e450ab2afc46',
            },
            {
              amount: 10,
              quantity: 51,
              productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
            },
          ],
        },
      }
      const req = mockReq(request)
      const res = mockRes()
      validateOrderAmountAndQuantity(req, res, () => true).then(() => {
        expect(res.status).to.have.been.calledWith(statusCodes.BAD_REQUEST)
      })
    })
  })
})
