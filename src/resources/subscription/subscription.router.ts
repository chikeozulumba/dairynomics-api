import { Router } from 'express'
import { celebrate } from 'celebrate'
import SubscriptionController from './subscription.controller'
import { validateRequest } from './subscription.validator'
import asyncHandler from '../../middlewares/asyncHandler'
import checkAuth from '../../middlewares/checkAuth'

const subscriptionRouter = Router()

subscriptionRouter
  .route('/')
  .all(asyncHandler(checkAuth))
  .get(asyncHandler(SubscriptionController.getMany))
  .post(asyncHandler(SubscriptionController.createSubscription))

subscriptionRouter
  .route('/user')
  .all(asyncHandler(checkAuth), SubscriptionController.checkSubscription)
  .get(asyncHandler(SubscriptionController.getUserSubscription))
  .delete(asyncHandler(SubscriptionController.unsubscribe))
  .put(celebrate({ body: validateRequest }), asyncHandler(SubscriptionController.updateSubscription))

export default subscriptionRouter
