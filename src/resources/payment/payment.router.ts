import { Router as ExpressRouter } from 'express'
import { celebrate, Joi, errors } from 'celebrate'
import controller from './payment.controller'
import * as validator from './payment.validator'
import checkAuth from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'
import { initiatePaymentValidator } from './payment.validator'

const router = ExpressRouter()

router
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(celebrate({ body: validator.createOne }), asyncHandler(controller.createOne))
  .get(asyncHandler(controller.getMany))

router
  .route('/:id')
  .all(asyncHandler(checkAuth), asyncHandler(controller.checkRecord), controller.checkOwnership)
  .get(asyncHandler(controller.getOne))
  .put(celebrate({ body: validator.updateOne }), asyncHandler(controller.updateOne))

// mpesa callback hook
router.route('/mpesa/callback').post(asyncHandler(controller.getPaymentStatus))

router.route('/mpesa/initiate').post(initiatePaymentValidator, asyncHandler(controller.initializePayment))

export default router
