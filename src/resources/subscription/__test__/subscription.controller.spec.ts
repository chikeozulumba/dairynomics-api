import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import SubscriptionController from '../subscription.controller'
import db from '../../../database/models'
import * as statusCodes from '../../../constants/statusCodes'
import { userId, dueDate } from './mockData'
import { SubscriptionAttributes } from '../subscription.model'

chai.use(sinonChai)

let subscription: SubscriptionAttributes
let subscriptionId: string

before(async () => {
  subscription = await db.Subscription.create({
    userId,
    dueDate,
  })
  subscriptionId = subscription.id as string
})

after(async () => {
  const subscription = await db.Subscription.findByPk(subscriptionId)
  if (subscription) {
    subscription.destroy()
  }
})

describe('Subscription controller', () => {
  describe('checkSubscription', () => {
    it('should trigger the `check subscription` method', async () => {
      const request = {
        currentUser: { id: userId },
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = sinon.spy()

      await SubscriptionController.checkSubscription(req, res, next)
      expect(next.called).to.be.true
    })
  })

  describe('getMany', () => {
    it('should trigger the `get all subscriptions` method', async () => {
      const request = {
        currentUser: { id: userId },
      }
      const req = mockReq(request)
      const res = mockRes()

      const response = await SubscriptionController.getMany(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('createSubscription', () => {
    it('should trigger the `create subscription` method', async () => {
      const request = {
        currentUser: { id: userId },
        dueDate,
      }
      const req = mockReq(request)
      const res = mockRes()
      const response = await SubscriptionController.createSubscription(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.OK)
    })
  })

  describe('getUserSubscription', () => {
    it('should trigger the `update user subscription` method', async () => {
      const request = {
        currentUser: { id: userId },
        plan: 'silver',
      }
      const req = mockReq(request)
      const res = mockRes()

      const response = await SubscriptionController.updateSubscription(req, res)
      expect(response['status']).to.have.been.calledWith(statusCodes.OK)
    })
  })
})
